// contextManager.js
const contexts = {}; // In-memory storage; key: sender ID, value: array of messages

/**
 * Retrieve context history for a sender.
 * @param {string|number} sender - Unique sender identifier.
 * @returns {Array} - Array of previous messages.
 */
function getContext(sender) {
  return contexts[sender] || [];
}

/**
 * Update context history with a new message.
 * @param {string|number} sender - Unique sender identifier.
 * @param {string} message - New message text.
 */
function updateContext(sender, message) {
  if (!contexts[sender]) {
    contexts[sender] = [];
  }
  contexts[sender].push(message);
  // Optionally, limit context length (here we keep the last 20 messages)
  if (contexts[sender].length > 20) {
    contexts[sender].shift();
  }
}

module.exports = { getContext, updateContext };
