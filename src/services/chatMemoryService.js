const { redis } = require("../config/redis")

/**
 * Get chat history for a user from Redis
 * @param {string} userId - User identifier
 * @returns {Array} Chat history
 */

async function getChatHistory(userId) {
  try {
    const history = await redis.get(`chat:${userId}`)
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error("Error retrieving chat history from Redis:", error)
    return []
  }
}

/**
 * Save chat history for a user to Redis with 24-hour expiration
 * @param {string} userId - User identifier
 * @param {Array} messages - Chat messages
 */
async function saveChatHistory(userId, messages) {
  try {
    await redis.set(`chat:${userId}`, JSON.stringify(messages))
    // Set 24-hour expiration (86400 seconds)
    await redis.expire(`chat:${userId}`, 86400)
  } catch (error) {
    console.error("Error saving chat history to Redis:", error)
  }
}

/**
 * Add a message to chat history and save
 * @param {string} userId - User identifier
 * @param {string} role - Message role ('user' or 'assistant')
 * @param {string} content - Message content
 */
async function addMessageToHistory(userId, role, content) {
  try {
    const history = await getChatHistory(userId)
    history.push({ role, content })

    // Limit history to last 10 messages to prevent token overflow
    const limitedHistory = history.slice(-10)

    await saveChatHistory(userId, limitedHistory)
  } catch (error) {
    console.error("Error adding message to history:", error)
  }
}

/**
 * Clear chat history for a user
 * @param {string} userId - User identifier
 */
async function clearChatHistory(userId) {
  try {
    await redis.del(`chat:${userId}`)
  } catch (error) {
    console.error("Error clearing chat history:", error)
  }
}

module.exports = {
  getChatHistory,
  saveChatHistory,
  addMessageToHistory,
  clearChatHistory,
}

