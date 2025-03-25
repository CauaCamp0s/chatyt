const prisma = require("../config/database")
const { genAI, EXTRACTION_MODEL_CONFIG } = require("../config/ai")

/**
 * Extract client data from a message using AI
 * @param {string} message - User message
 * @returns {Object} Extracted client data
 */

async function extractClientData(message) {
  try {
    const model = genAI.getGenerativeModel(EXTRACTION_MODEL_CONFIG)

    const prompt = `
      Extraia APENAS as seguintes informações do texto, se presentes:
      - Nome do cliente
      - Bairro de interesse
      - Orçamento/valor que pode pagar
      - Disponibilidade para visitas
      - Tipo de imóvel desejado (casa, apartamento, etc.)
      
      Retorne APENAS um objeto JSON com esses campos, deixando em branco os que não forem mencionados.
      Exemplo: {"nome": "João Silva", "bairro": "Atalaia", "orcamento": "até R$ 300 mil", "disponibilidade": "finais de semana", "tipoImovel": "apartamento"}
      
      Texto: "${message}"
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Try to extract JSON from the response
    try {
      // Find the first JSON object in the response
      const match = text.match(/\{.*\}/s)
      if (match) {
        return JSON.parse(match[0])
      }
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError)
    }

    return {}
  } catch (error) {
    console.error("Error extracting client data:", error)
    return {}
  }
}

/**
 * Save client data to database
 * @param {string} phoneNumber - Client phone number
 * @param {Object} data - Client data to save
 */

async function saveClientData(phoneNumber, data) {
  try {
    // Check if there's relevant data to save
    if (!Object.values(data).some((v) => v)) {
      return
    }

    // Find or create client
    const client = await prisma.client.upsert({
      where: { phoneNumber },
      update: {
        name: data.nome || undefined,
      },
      create: {
        phoneNumber,
        name: data.nome || "Cliente",
      },
    })

    // Check if there's interest data to save
    const hasInterestData = data.bairro || data.orcamento || data.disponibilidade || data.tipoImovel

    if (hasInterestData) {
      // Create a new interest record
      await prisma.interest.create({
        data: {
          clientId: client.id,
          neighborhood: data.bairro || undefined,
          budget: data.orcamento || undefined,
          availability: data.disponibilidade || undefined,
          propertyType: data.tipoImovel || undefined,
        },
      })

      console.log(`Interest data saved for client ${phoneNumber}`)
    }
  } catch (error) {
    console.error("Error saving client data:", error)
  }
}

/**
 * Get client data from database
 * @param {string} phoneNumber - Client phone number
 * @returns {Object|null} Client data with latest interest
 */

async function getClientData(phoneNumber) {
  try {
    const client = await prisma.client.findUnique({
      where: { phoneNumber },
      include: {
        interests: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    })

    return client
  } catch (error) {
    console.error("Error getting client data:", error)
    return null
  }
}

module.exports = {
  extractClientData,
  saveClientData,
  getClientData,
}

