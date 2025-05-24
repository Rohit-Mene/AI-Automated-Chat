# Telegram Chat Automation Agent

An intelligent Telegram bot that automates chat replies by analyzing conversation context and generating relevant responses.

## Features

- Context-aware responses based on conversation history
- Intelligent message processing
- Channel-specific handling
- Automated reply generation

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Telegram Bot Token (obtained from [@BotFather](https://t.me/botfather))

## Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd ai-chat-agent-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Telegram bot token:
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
```

## Project Structure

- `index.js` - Main application entry point
- `aiProcessor.js` - AI processing logic for generating responses
- `contextManager.js` - Manages conversation context and history
- `channels/` - Directory containing channel-specific handlers

## Usage

1. Start the bot:
```bash
node index.js
```

2. The bot will automatically:
   - Monitor incoming messages
   - Process conversation context
   - Generate relevant responses
   - Send automated replies

## Configuration

You can configure the bot's behavior by modifying the following:
- Channel-specific settings in the `channels/` directory
- Context management parameters in `contextManager.js`
- AI processing settings in `aiProcessor.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Telegram Bot API
- Node.js community
- All contributors who help improve this project 