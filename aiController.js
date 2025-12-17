const geminiService = require('../services/gemini.service');

const summarize = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ 
        error: 'Text is required' 
      });
    }

    const summary = await geminiService.summarizeText(text);
    
    res.json({
      summary,
      originalLength: text.length,
      summaryLength: summary.length
    });
  } catch (error) {
    console.error('Summarize error:', error);
    res.status(500).json({ 
      error: 'Failed to summarize text',
      message: error.message 
    });
  }
};

const ask = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ 
        error: 'Question is required' 
      });
    }

    const answer = await geminiService.askQuestion(question);
    
    res.json({
      question,
      answer
    });
  } catch (error) {
    console.error('Ask error:', error);
    res.status(500).json({ 
      error: 'Failed to get answer',
      message: error.message 
    });
  }
};

const analyzeItem = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ 
        error: 'Item id is required' 
      });
    }

    const result = await geminiService.analyzeItem(id);
    
    res.json(result);
  } catch (error) {
    console.error('Analyze item error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze item',
      message: error.message 
    });
  }
};

module.exports = {
  summarize,
  ask,
  analyzeItem
};