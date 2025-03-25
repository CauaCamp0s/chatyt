const { GoogleGenerativeAI } = require("@google/generative-ai")

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Model configurations
const CHAT_MODEL_CONFIG = {
  model: "gemini-2.0-flash",
  generationConfig: {
    maxOutputTokens: 1500,
    temperature: 0.3,
  },
}

const EXTRACTION_MODEL_CONFIG = {
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.1,
    maxOutputTokens: 1024,
  },
}

module.exports = {
  genAI,
  CHAT_MODEL_CONFIG,
  EXTRACTION_MODEL_CONFIG,
}

