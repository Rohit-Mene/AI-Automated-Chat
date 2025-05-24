const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
const MCP_URL = process.env.MCP_URL || 'http://localhost:3000/mcp';  // Use your public URL in production

// Set webhook (if using webhooks; adjust if you use polling in development)
telegramBot.setWebHook(`${process.env.PUBLIC_URL}/webhook/telegram`);

async function handleWebhook(update) {
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    // Forward to MCP endpoint for processing
    try {
      const { data } = await axios.post(MCP_URL, {
        channel: 'Telegram',
        sender: chatId,
        message: text,
        context: {}  // Add any session/context info if available
      });
      telegramBot.sendMessage(chatId, data.reply);
    } catch (error) {
      console.error('Error handling Telegram message:', error);
      telegramBot.sendMessage(chatId, "There was an error processing your message.");
    }
  }
}

module.exports = { handleWebhook };
