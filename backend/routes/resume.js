const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const resumeController = require('../controllers/resumeController');

// router.use(protect);

router.post('/upload', resumeController.uploadResume);
router.get('/history', resumeController.getHistory);

module.exports = router;
