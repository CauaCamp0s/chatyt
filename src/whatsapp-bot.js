// require("dotenv").config()
// const { searchProperties, formatPropertyList } = require("./services/propertyService");
// const { extractPropertyCriteria } = require("./utils/propertyUtils");
// const qrcode = require("qrcode-terminal")
// const { Client } = require("whatsapp-web.js")

// // Import services
// const { testRedisConnection } = require("./config/redis")
// const prisma = require("./config/database")
// const { extractClientData, saveClientData } = require("./services/clientDataService")
// const { generateResponse } = require("./services/aiService")
// const { clearChatHistory } = require("./services/chatMemoryService")
// const { getNeighborhoodInfo } = require("./utils/dataFormatter")

// // WhatsApp client configuration
// const client = new Client({
//   puppeteer: {
//     headless: true,
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   },
// })

// // WhatsApp events
// client.on("qr", (qr) => {
//   qrcode.generate(qr, { small: true })
//   console.log("QR Code ready for scanning")
// })

// client.on("ready", () => {
//   console.log("WhatsApp bot connected and ready")
// })

// client.on("disconnected", () => {
//   console.log("WhatsApp bot disconnected, reconnecting...")
//   client.initialize()
// })

// // Message handling
// client.on("message", async (msg) => {
//   if (!msg.from.endsWith("@c.us")) return

//   const userId = msg.from // Use WhatsApp number as user ID
//   const chat = await msg.getChat()

//   try {
//     await chat.sendStateTyping()

//     // Welcome message
//     if (/^(oi|olá|ola|menu|inicio|start)/i.test(msg.body)) {
//       const contact = await msg.getContact()

//       // Try to get contact name
//       const clientName = contact.pushname || "Cliente"

//       // Save client name if available
//       if (contact.pushname) {
//         await saveClientData(userId, { nome: contact.pushname })
//       }

//       await msg.reply(
//         `*Olá ${clientName}!* Sou o ImobAI, especialista em imóveis de Aracaju.\n\n` +
//           `Posso te ajudar com:\n- Valores por bairro\n- Documentação\n- Processos imobiliários\n\n` +
//           `Ex: "Valor no Atalaia" ou "Como financiar?"\n\n` +
//           `Para me ajudar a encontrar o imóvel ideal, pode me informar:\n` +
//           `- Bairro de interesse\n` +
//           `- Seu orçamento\n` +
//           `- Tipo de imóvel desejado\n` +
//           `- Sua disponibilidade para visitas`,
//       )

//       // Clear previous chat history when user starts a new conversation
//       await clearChatHistory(userId)
//       return
//     }

//     // Extract client data from message
//     const extractedData = await extractClientData(msg.body)

//     // Save extracted data to database
//     await saveClientData(userId, extractedData)

//     // Generate AI response
//     const response = await generateResponse(userId, msg.body)

//     if (response) {
//       await msg.reply(response.slice(0, 1500)) // Limit response size
//     } else {
//       // Fallback: Check if message mentions a neighborhood
//       const mentionedNeighborhood = Object.keys(
//         require("./utils/dataFormatter").aracajuData["Bairros de Aracaju"],
//       ).find((b) => msg.body.toLowerCase().includes(b.toLowerCase()))

//       if (mentionedNeighborhood) {
//         const info = getNeighborhoodInfo(mentionedNeighborhood)

//         // Save neighborhood interest
//         await saveClientData(userId, {
//           ...extractedData,
//           bairro: mentionedNeighborhood,
//         })

//         await msg.reply(
//           `*${info.name}*\n` +
//             `Valor: ${info["Valor médio"]}\n` +
//             `Perfil: ${info["Perfil"]}\n\n` +
//             `Contato: (79) 99999-9999`,
//         )
//       } else {
//         await msg.reply(
//           `Posso te ajudar com:\n` +
//             `- Valores em bairros específicos\n` +
//             `- Processos de compra/venda\n` +
//             `- Orientação sobre documentação\n\n` +
//             `Ex: "Valores no Centro" ou "Documentos para alugar"`,
//         )
//       }
//     }
//   } catch (error) {
//     console.error("Error:", error)
//     await msg.reply("Serviço indisponível no momento. Contate: (79) 99999-9999")
//   }
// })

// // Initialize and test connections
// async function initialize() {
//   try {
//     // Test Redis connection
//     await testRedisConnection()

//     // Test database connection
//     await prisma.$queryRaw`SELECT 1`
//     console.log("Database connection: OK")

//     // Initialize WhatsApp client
//     await client.initialize()
//   } catch (error) {
//     console.error("Initialization error:", error)
//     process.exit(1)
//   }
// }

// // Start the bot
// initialize()






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
const { searchProperties, formatPropertyList } = require("./services/propertyService")
const { extractPropertyCriteria } = require("./utils/propertyUtils")

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

// Handle property queries
async function handlePropertyQuery(msg) {
  const propertyKeywords = ["apartamento", "casa", "imóvel", "imovel", "aluguel", "venda", "quero morar", "procurando casa"]
  const isPropertyQuery = propertyKeywords.some(keyword => 
    msg.body.toLowerCase().includes(keyword.toLowerCase())
  )

  if (!isPropertyQuery) return false

  try {
    const criteria = extractPropertyCriteria(msg.body)
    const properties = await searchProperties(criteria)
    
    if (properties.length === 0) {
      await msg.reply("Não encontrei imóveis com esses critérios. Poderia refinar sua busca?")
      return true
    }
    
    const response = await generateResponse(msg.from, msg.body, { properties })
    await msg.reply(response.slice(0, 1500))
    return true
  } catch (error) {
    console.error("Error handling property query:", error)
    await msg.reply("Ocorreu um erro ao buscar os imóveis. Por favor, tente novamente.")
    return true
  }
}

// Message handling
client.on("message", async (msg) => {
  if (!msg.from.endsWith("@c.us")) return

  const userId = msg.from
  const chat = await msg.getChat()

  try {
    await chat.sendStateTyping()

    // Welcome message
    if (/^(oi|olá|ola|menu|inicio|start)/i.test(msg.body)) {
      const contact = await msg.getContact()
      const clientName = contact.pushname || "Cliente"

      if (contact.pushname) {
        await saveClientData(userId, { nome: contact.pushname })
      }

      await msg.reply(
        `*Olá ${clientName}!* Sou o ImobAI, especialista em imóveis de Aracaju.\n\n` +
          `Posso te ajudar com:\n- Busca de imóveis disponíveis\n- Valores por bairro\n- Documentação\n- Processos imobiliários\n\n` +
          `Ex: "Apartamentos para alugar no Atalaia" ou "Casas para venda até 500k"\n\n` +
          `Para me ajudar a encontrar o imóvel ideal, pode me informar:\n` +
          `- Bairro de interesse\n` +
          `- Seu orçamento\n` +
          `- Tipo de imóvel desejado\n` +
          `- Sua disponibilidade para visitas`,
      )

      await clearChatHistory(userId)
      return
    }

    // First check if it's a property query
    const isPropertyHandled = await handlePropertyQuery(msg)
    if (isPropertyHandled) return

    // Extract and save client data
    const extractedData = await extractClientData(msg.body)
    await saveClientData(userId, extractedData)

    // Generate AI response
    const response = await generateResponse(userId, msg.body)

    if (response) {
      await msg.reply(response.slice(0, 1500))
    } else {
      // Fallback for neighborhood queries
      const mentionedNeighborhood = Object.keys(
        require("./utils/dataFormatter").aracajuData["Bairros de Aracaju"],
      ).find((b) => msg.body.toLowerCase().includes(b.toLowerCase()))

      if (mentionedNeighborhood) {
        const info = getNeighborhoodInfo(mentionedNeighborhood)
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
            `- Busca de imóveis específicos\n` +
            `- Valores em bairros\n` +
            `- Processos de compra/venda\n\n` +
            `Ex: "Apartamentos com 3 quartos no Jardins" ou "Casas para alugar até R$ 2000"`,
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
    await testRedisConnection()
    await prisma.$queryRaw`SELECT 1`
    console.log("Database connection: OK")
    await client.initialize()
  } catch (error) {
    console.error("Initialization error:", error)
    process.exit(1)
  }
}

// Start the bot
initialize()