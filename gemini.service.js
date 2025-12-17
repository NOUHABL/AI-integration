const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * @param {string} text 
 * @returns {Promise<string>} 
 */
const summarizeText = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Please provide a concise and clear summary of the following text:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return summary;
  } catch (error) {
    console.error('Gemini API error in summarizeText:', error);
    throw new Error(`Failed to summarize text: ${error.message}`);
  }
};

/**
 * @param {string} prompt 
 * @returns {Promise<string>} 
 */
const askQuestion = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    return answer;
  } catch (error) {
    console.error('Gemini API error in askQuestion:', error);
    throw new Error(`Failed to get answer: ${error.message}`);
  }
};

/**
 * @param {number} id 
 * @returns {Promise<Object>}
 */
const analyzeItem = async (id) => {
  try {
    const fs = require('fs').promises;
    const path = require('path');
    
    const dbPath = path.join(__dirname, '../data/items.json');
    const data = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(data);
    
    const item = db.items?.find(i => i.id === parseInt(id));
    
    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const prompt = `Analyze the following item and provide an improved, more descriptive version. 
Keep the same structure but enhance the description, add relevant details, and make it more engaging:

${JSON.stringify(item, null, 2)}

Please respond with a JSON object containing the improved item.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const improvedDescription = response.text();
    
    return {
      original: item,
      improved: improvedDescription,
      itemId: id
    };
  } catch (error) {
    console.error('Gemini API error in analyzeItem:', error);
    throw new Error(`Failed to analyze item: ${error.message}`);
  }
};

module.exports = {
  summarizeText,
  askQuestion,
  analyzeItem
};