// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
// const twilio = require('twilio'); // Uncomment if you plan to use Twilio later
const { getContext, updateContext } = require('./contextManager');
const { processWithAI } = require('./aiProcessor');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// --- Telegram Bot Setup ---
const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
telegramBot.setWebHook(`${process.env.PUBLIC_URL}/telegram-webhook`);

// --- AI Processing with Context ---
async function processIncomingMessage(channel, sender, message) {
  const previousContext = getContext(sender);
  console.log(`Context for ${sender}:`, previousContext);
  console.log(`Received new message on ${channel}: ${message}`);

  // Build prompt by concatenating previous context with the new message
  const prompt = previousContext.concat([`User: ${message}`]).join('\n');

  // Use aiProcessor to get an AI-generated response
  const aiResponse = await processWithAI(prompt);

  // Update context with the new interaction
  updateContext(sender, `User: ${message}`);
  updateContext(sender, `Agent: ${aiResponse}`);

  return aiResponse;
}

// --- Telegram Webhook Endpoint ---
app.post('/telegram-webhook', async (req, res) => {
  console.log("Received Telegram webhook request:", req.body);
  const update = req.body;
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;
    const reply = await processIncomingMessage('Telegram', chatId, text);
    telegramBot.sendMessage(chatId, reply);
  }
  res.sendStatus(200);
});

// --- Optional GET Endpoints for Debugging ---
app.get('/telegram-webhook', (req, res) => {
  res.send("Telegram webhook endpoint is live.");
});
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`MCP Agent with context management listening on port ${port}`);
});
