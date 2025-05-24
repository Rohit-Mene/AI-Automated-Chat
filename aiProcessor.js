const axios = require('axios');

// Updated function using ChatCompletion endpoint for GPT-3.5-turbo
async function processWithAI(message, context = {}) {
  try {
    // Build the messages array for the chat API.
    // You can incorporate more context here if needed.
    const messages = [
      { role: 'system', content: 'You are a helpful AI assistant.' },
      { role: 'user', content: `User: ${message}\nAgent:` }
    ];
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo", // or "gpt-4" if available and desired
        messages: messages,
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('AI API error:', error.response ? error.response.data : error);
    return "I'm sorry, I couldn't process that.";
  }
}

module.exports = { processWithAI };
