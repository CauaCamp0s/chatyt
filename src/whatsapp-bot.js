require("dotenv").config()
const qrcode = require("qrcode-terminal")
const { Client } = require("whatsapp-web.js")

// Import services
const { testRedisConnection } = require("./config/redis")
const prisma = require("./config/database")
const { extractClientData, saveClientData } = require("./services/clientDataService")
const { generateResponse } = require("./services/aiService")
const { clearChatHistory } = require("./services/chatMemoryService")
const { getNeighborhoodInfo } = require("./utils/dataFormatter")

// WhatsApp client configuration
const client = new Client({
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
})

// WhatsApp events
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true })
  console.log("QR Code ready for scanning")
})

client.on("ready", () => {
  console.log("WhatsApp bot connected and ready")
})

client.on("disconnected", () => {
  console.log("WhatsApp bot disconnected, reconnecting...")
  client.initialize()
})

// Message handling
client.on("message", async (msg) => {
  if (!msg.from.endsWith("@c.us")) return

  const userId = msg.from // Use WhatsApp number as user ID
  const chat = await msg.getChat()

  try {
    await chat.sendStateTyping()

    // Welcome message
    if (/^(oi|olá|ola|menu|inicio|start)/i.test(msg.body)) {
      const contact = await msg.getContact()

      // Try to get contact name
      const clientName = contact.pushname || "Cliente"

      // Save client name if available
      if (contact.pushname) {
        await saveClientData(userId, { nome: contact.pushname })
      }

      await msg.reply(
        `*Olá ${clientName}!* Sou o ImobAI, especialista em imóveis de Aracaju.\n\n` +
          `Posso te ajudar com:\n- Valores por bairro\n- Documentação\n- Processos imobiliários\n\n` +
          `Ex: "Valor no Atalaia" ou "Como financiar?"\n\n` +
          `Para me ajudar a encontrar o imóvel ideal, pode me informar:\n` +
          `- Bairro de interesse\n` +
          `- Seu orçamento\n` +
          `- Tipo de imóvel desejado\n` +
          `- Sua disponibilidade para visitas`,
      )

      // Clear previous chat history when user starts a new conversation
      await clearChatHistory(userId)
      return
    }

    // Extract client data from message
    const extractedData = await extractClientData(msg.body)

    // Save extracted data to database
    await saveClientData(userId, extractedData)

    // Generate AI response
    const response = await generateResponse(userId, msg.body)

    if (response) {
      await msg.reply(response.slice(0, 1500)) // Limit response size
    } else {
      // Fallback: Check if message mentions a neighborhood
      const mentionedNeighborhood = Object.keys(
        require("./utils/dataFormatter").aracajuData["Bairros de Aracaju"],
      ).find((b) => msg.body.toLowerCase().includes(b.toLowerCase()))

      if (mentionedNeighborhood) {
        const info = getNeighborhoodInfo(mentionedNeighborhood)

        // Save neighborhood interest
        await saveClientData(userId, {
          ...extractedData,
          bairro: mentionedNeighborhood,
        })

        await msg.reply(
          `*${info.name}*\n` +
            `Valor: ${info["Valor médio"]}\n` +
            `Perfil: ${info["Perfil"]}\n\n` +
            `Contato: (79) 99999-9999`,
        )
      } else {
        await msg.reply(
          `Posso te ajudar com:\n` +
            `- Valores em bairros específicos\n` +
            `- Processos de compra/venda\n` +
            `- Orientação sobre documentação\n\n` +
            `Ex: "Valores no Centro" ou "Documentos para alugar"`,
        )
      }
    }
  } catch (error) {
    console.error("Error:", error)
    await msg.reply("Serviço indisponível no momento. Contate: (79) 99999-9999")
  }
})

// Initialize and test connections
async function initialize() {
  try {
    // Test Redis connection
    await testRedisConnection()

    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    console.log("Database connection: OK")

    // Initialize WhatsApp client
    await client.initialize()
  } catch (error) {
    console.error("Initialization error:", error)
    process.exit(1)
  }
}

// Start the bot
initialize()

