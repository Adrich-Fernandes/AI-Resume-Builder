const Resume = require('../models/resume');
const Analysis = require('../models/analysis');
const { analyzeResume } = require('../services/gemini');

// POST /api/analysis/run
exports.run = async (req, res, next) => {
  try {
    const { resume_id, raw_text, job_description } = req.body;

    if (!job_description || job_description.trim().length < 30)
      return res.status(422).json({ message: 'Job description is too short. Please paste the full JD.' });

    let resumeText = raw_text;

    // If resume_id is provided and user is authenticated, fetch from DB
    if (resume_id && req.user) {
      const resume = await Resume.findById(resume_id);
      if (!resume) return res.status(404).json({ message: 'Resume not found.' });
      if (resume.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden.' });
      resumeText = resume.raw_text;
    }

    if (!resumeText || resumeText.trim().length < 50)
      return res.status(422).json({ message: 'Resume text is missing or too short.' });

    const result = await analyzeResume(resumeText, job_description);

    // Save to DB only when authenticated
    if (req.user && resume_id) {
      const analysis = await Analysis.create({
        resume_id,
        user_id: req.user.id,
        job_description: job_description.trim(),
        ...result,
      });
      return res.status(201).json({ message: 'Analysis complete.', analysis_id: analysis.id, ...result });
    }

    // Unauthenticated — return result directly without saving
    res.status(200).json({ message: 'Analysis complete.', ...result });
  } catch (err) {
    if (err instanceof SyntaxError)
      return res.status(502).json({ message: 'AI returned an unexpected response. Please try again.' });
    next(err);
  }
};

// GET /api/analysis/history
exports.history = async (req, res, next) => {
  try {
    const analyses = await Analysis.findByUser(req.user.id);
    res.json({ analyses });
  } catch (err) {
    next(err);
  }
};

// GET /api/analysis/:id
exports.getOne = async (req, res, next) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    if (!analysis) return res.status(404).json({ message: 'Analysis not found.' });
    if (analysis.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden.' });
    res.json({ analysis });
  } catch (err) {
    next(err);
  }
};

// GET /api/analysis/resume/:resume_id
exports.byResume = async (req, res, next) => {
  try {
    const analyses = await Analysis.findByResume(req.params.resume_id, req.user.id);
    res.json({ analyses });
  } catch (err) {
    next(err);
  }
};