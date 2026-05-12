const multer = require('multer');
const mammoth = require('mammoth');
const Resume = require('../models/resume');

// Multer config for file upload
const storage = multer.memoryStorage();
const upload = multer({ 
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
      // Extract text from buffer
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      const rawText = result.value;

      if (!rawText || rawText.trim().length < 50) {
        return res.status(422).json({ message: 'Could not extract sufficient text from the document. Please ensure it is a valid resume.' });
      }

      // Save to DB
      const userId = req.user ? req.user.id : 1;
      const resume = await Resume.create({
        user_id: userId,
        filename: req.file.originalname,
        raw_text: rawText
      });

      res.status(201).json({ 
        message: 'Resume uploaded and processed successfully.', 
        resume_id: resume.id,
        filename: resume.filename
      });
    } catch (error) {
      console.error('Extraction Error:', error);
      res.status(500).json({ message: 'Failed to process resume file.' });
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
