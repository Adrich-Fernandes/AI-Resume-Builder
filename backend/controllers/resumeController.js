const multer = require('multer');
const mammoth = require('mammoth');
const Resume = require('../models/resume');

// Multer config for file upload (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        file.mimetype === 'application/msword') {
      cb(null, true);
    } else {
      cb(new Error('Only .doc and .docx files are allowed'), false);
    }
  }
}).single('resume');

exports.uploadResume = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      // 1. Extract text from .docx buffer using mammoth
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      const rawText = result.value;

      if (!rawText || rawText.trim().length < 50) {
        return res.status(422).json({ message: 'Could not extract sufficient text from the document.' });
      }

      // 2. If authenticated, save to DB; otherwise just return extracted text
      if (req.user) {
        const resume = await Resume.create({
          user_id: req.user.id,
          filename: req.file.originalname,
          raw_text: rawText
        });
        return res.status(201).json({
          message: 'Resume processed and saved successfully.',
          resume_id: resume.id,
          filename: resume.filename,
          raw_text: rawText
        });
      }

      // No auth — return text directly (DB save skipped to avoid FK constraint)
      res.status(200).json({
        message: 'Resume processed successfully.',
        resume_id: null,
        filename: req.file.originalname,
        raw_text: rawText
      });
    } catch (error) {
      console.error('Processing Error:', error);
      res.status(500).json({ message: 'Failed to process and store resume file.' });
    }
  });
};

exports.getHistory = async (req, res) => {
  try {
    const resumes = await Resume.findByUser(req.user.id);
    res.json({ resumes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resume history.' });
  }
};
