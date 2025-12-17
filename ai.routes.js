const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/summarize', aiController.summarize);

router.post('/ask', aiController.ask);

router.post('/analyze-item', aiController.analyzeItem);


module.exports = router;