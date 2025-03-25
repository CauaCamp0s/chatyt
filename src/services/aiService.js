const { genAI, CHAT_MODEL_CONFIG } = require("../config/ai")
const { getChatHistory, addMessageToHistory } = require("./chatMemoryService")
const { getClientData } = require("./clientDataService")
const { formatNeighborhoodData } = require("../utils/dataFormatter")

/**
 * Create a prompt for the AI model
 * @param {string} phoneNumber - Client phone number
 * @param {string} question - Client question
 * @param {Array} history - Chat history
 * @returns {string} Formatted prompt
 */
async function createPrompt(phoneNumber, question, history = []) {
  const neighborhoodsFormatted = formatNeighborhoodData()

  // Add conversation history to the prompt
  let historyFormatted = ""
  if (history.length > 0) {
    historyFormatted = "HISTÓRICO DE CONVERSA:\n\n"
    history.forEach((item) => {
      historyFormatted += `${item.role === "user" ? "CLIENTE" : "ASSISTENTE"}: ${item.content}\n\n`
    })
    historyFormatted += "Continue a conversa considerando esse histórico.\n\n"
  }

  // Get client data from database
  const clientData = await getClientData(phoneNumber)
  let clientDataFormatted = ""

  if (clientData) {
    clientDataFormatted = "DADOS DO CLIENTE:\n\n"
    clientDataFormatted += `Nome: ${clientData.name || "Não informado"}\n`

    if (clientData.interests && clientData.interests.length > 0) {
      const interest = clientData.interests[0]
      if (interest.neighborhood) clientDataFormatted += `Bairro de interesse: ${interest.neighborhood}\n`
      if (interest.budget) clientDataFormatted += `Orçamento: ${interest.budget}\n`
      if (interest.availability) clientDataFormatted += `Disponibilidade: ${interest.availability}\n`
      if (interest.propertyType) clientDataFormatted += `Tipo de imóvel: ${interest.propertyType}\n`
    }

    clientDataFormatted += "\nUse essas informações para personalizar sua resposta.\n\n"
  }

  return `Você é o ImobAI, um assistente virtual especializado em corretagem de imóveis em Sergipe. Siga RIGOROSAMENTE estas diretrizes:
  
  ${clientDataFormatted}
  ${historyFormatted}
  
  1. ESCOPO DE ATUAÇÃO:
  
  - Compra, venda, aluguel e administração de imóveis
  - Procedimentos de corretagem (documentação, etapas de negociação, papel do corretor)
  - Financiamento imobiliário (tipos de crédito, taxas, requisitos)
  - Avaliação de imóveis (métodos, fatores que influenciam o valor)
  - Tendências do mercado imobiliário
  
  2. FOCO EM SERGIPE (DADOS ATUALIZADOS):
  
  ${neighborhoodsFormatted}
  
  3. COMPORTAMENTO REQUERIDO:
  
  - Sempre que mencionarem um bairro, forneça os dados específicos que possuo
  - Tom PROFISSIONAL e EMPÁTICO
  - Respostas CLARAS e PRECISAS com dados concretos
  - Proativo em sugerir próximos passos
  - Oferecer contato com corretores quando apropriado
  
  4. FORMATO DE RESPOSTA:
  
  - Organize em tópicos quando relevante
  - Destaque valores e dados importantes
  - Seja conciso mas completo
  - Relacione com dados específicos de bairros sempre que possível
  
  5. FORA DO ESCOPO:
  
  - Se a pergunta não for sobre imóveis em Sergipe, responda:
  "Desculpe, meu expertise é limitado ao mercado imobiliário de Sergipe. Posso te ajudar com dúvidas sobre financiamento, avaliação de imóveis ou encontrar o bairro ideal para seu perfil?"
  
  PERGUNTA DO CLIENTE: ${question}
  
  SUA RESPOSTA (siga ESTRITAMENTE as diretrizes acima):`
}

/**
 * Generate AI response for a client message
 * @param {string} userId - Client phone number
 * @param {string} message - Client message
 * @returns {string|null} AI response
 */
async function generateResponse(userId, message) {
  try {
    // Get chat history from Redis
    const history = await getChatHistory(userId)

    const model = genAI.getGenerativeModel(CHAT_MODEL_CONFIG)
    const prompt = await createPrompt(userId, message, history)
    const result = await model.generateContent(prompt)
    const response = await result.response
    const responseText = response.text()

    // Update chat history with the new interaction
    await addMessageToHistory(userId, "user", message)
    await addMessageToHistory(userId, "assistant", responseText)

    return responseText
  } catch (error) {
    console.error("Error generating AI response:", error)
    return null
  }
}

module.exports = {
  createPrompt,
  generateResponse,
}

