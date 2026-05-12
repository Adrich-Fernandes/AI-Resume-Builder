const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const { protect } = require('../middleware/auth');

// router.use(protect);

router.post('/run', analysisController.run);
router.get('/history', analysisController.history);
router.get('/:id', analysisController.getOne);
router.get('/resume/:resume_id', analysisController.byResume);

module.exports = router;
