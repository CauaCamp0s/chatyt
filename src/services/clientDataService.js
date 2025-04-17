// const prisma = require("../config/database")
// const { genAI, EXTRACTION_MODEL_CONFIG } = require("../config/ai")

// /**
//  * Extract client data from a message using AI
//  * @param {string} message - User message
//  * @returns {Object} Extracted client data
//  */

// async function extractClientData(message) {
//   try {
//     const model = genAI.getGenerativeModel(EXTRACTION_MODEL_CONFIG)

//     const prompt = `
//       Extraia APENAS as seguintes informações do texto, se presentes:
//       - Nome do cliente
//       - Bairro de interesse
//       - Orçamento/valor que pode pagar
//       - Disponibilidade para visitas
//       - Tipo de imóvel desejado (casa, apartamento, etc.)
      
//       Retorne APENAS um objeto JSON com esses campos, deixando em branco os que não forem mencionados.
//       Exemplo: {"nome": "João Silva", "bairro": "Atalaia", "orcamento": "até R$ 300 mil", "disponibilidade": "finais de semana", "tipoImovel": "apartamento"}
      
//       Texto: "${message}"
//     `

//     const result = await model.generateContent(prompt)
//     const response = await result.response
//     const text = response.text()

//     // Try to extract JSON from the response
//     try {
//       // Find the first JSON object in the response
//       const match = text.match(/\{.*\}/s)
//       if (match) {
//         return JSON.parse(match[0])
//       }
//     } catch (jsonError) {
//       console.error("Error parsing JSON:", jsonError)
//     }

//     return {}
//   } catch (error) {
//     console.error("Error extracting client data:", error)
//     return {}
//   }
// }

// /**
//  * Save client data to database
//  * @param {string} phoneNumber - Client phone number
//  * @param {Object} data - Client data to save
//  */

// async function saveClientData(phoneNumber, data) {
//   try {
//     // Check if there's relevant data to save
//     if (!Object.values(data).some((v) => v)) {
//       return
//     }

//     // Find or create client
//     const client = await prisma.client.upsert({
//       where: { phoneNumber },
//       update: {
//         name: data.nome || undefined,
//       },
//       create: {
//         phoneNumber,
//         name: data.nome || "Cliente",
//       },
//     })

//     // Check if there's interest data to save
//     const hasInterestData = data.bairro || data.orcamento || data.disponibilidade || data.tipoImovel

//     if (hasInterestData) {
//       // Create a new interest record
//       await prisma.interest.create({
//         data: {
//           clientId: client.id,
//           neighborhood: data.bairro || undefined,
//           budget: data.orcamento || undefined,
//           availability: data.disponibilidade || undefined,
//           propertyType: data.tipoImovel || undefined,
//         },
//       })

//       console.log(`Interest data saved for client ${phoneNumber}`)
//     }
//   } catch (error) {
//     console.error("Error saving client data:", error)
//   }
// }

// /**
//  * Get client data from database
//  * @param {string} phoneNumber - Client phone number
//  * @returns {Object|null} Client data with latest interest
//  */

// async function getClientData(phoneNumber) {
//   try {
//     const client = await prisma.client.findUnique({
//       where: { phoneNumber },
//       include: {
//         interests: {
//           orderBy: { createdAt: "desc" },
//           take: 1,
//         },
//       },
//     })

//     return client
//   } catch (error) {
//     console.error("Error getting client data:", error)
//     return null
//   }
// }

// module.exports = {
//   extractClientData,
//   saveClientData,
//   getClientData,
// }



const prisma = require("../config/database");
const { genAI, EXTRACTION_MODEL_CONFIG } = require("../config/ai");

/**
 * Extract client data from a message using AI
 * @param {string} message - User message
 * @returns {Object} Extracted client data
 */
async function extractClientData(message) {
  try {
    const model = genAI.getGenerativeModel(EXTRACTION_MODEL_CONFIG);

    const prompt = `
      Extraia APENAS as seguintes informações do texto, se presentes:
      - Nome do cliente
      - Bairro de interesse
      - Orçamento/valor que pode pagar (converta para número se possível)
      - Disponibilidade para visitas
      - Tipo de imóvel desejado (casa, apartamento, etc.)
      
      Retorne APENAS um objeto JSON com esses campos, deixando em branco os que não forem mencionados.
      Exemplo: {"nome": "João Silva", "bairro": "Atalaia", "orcamento": 300000, "disponibilidade": "finais de semana", "tipoImovel": "apartamento"}
      
      Texto: "${message}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to extract JSON from the response
    try {
      const match = text.match(/\{.*\}/s);
      if (match) {
        const data = JSON.parse(match[0]);
        
        // Convert budget to number if possible
        if (data.orcamento && typeof data.orcamento === 'string') {
          const numericValue = data.orcamento.replace(/[^0-9.,]/g, '')
            .replace('.', '')
            .replace(',', '.');
          data.orcamento = parseFloat(numericValue) || 0;
        }
        
        return data;
      }
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
    }

    return {};
  } catch (error) {
    console.error("Error extracting client data:", error);
    return {};
  }
}

/**
 * Save client data to database
 * @param {string} userId - WhatsApp user ID (phone number with @c.us)
 * @param {Object} data - Client data to save
 */
async function saveClientData(userId, data) {
  try {
    // Remove WhatsApp suffix if present
    const phoneNumber = userId.replace(/@c\.us$/, '');
    
    // Check if there's relevant data to save
    if (!Object.values(data).some(v => v !== undefined && v !== null && v !== '')) {
      return;
    }

    // First, find or create the bairro if provided
    let bairroId = null;
    if (data.bairro) {
      const bairro = await prisma.bairrosinteresse.upsert({
        where: { nome: data.bairro },
        update: {},
        create: { nome: data.bairro }
      });
      bairroId = bairro.id;
    }

    // Find existing client by phone number
    let client = await prisma.comprador.findFirst({
      where: { telefone: phoneNumber }
    });

    // Update or create client
    if (client) {
      client = await prisma.comprador.update({
        where: { id: client.id },
        data: {
          nome: data.nome || undefined,
          valor_disponivel: data.orcamento || undefined
        }
      });
    } else {
      client = await prisma.comprador.create({
        data: {
          telefone: phoneNumber,
          nome: data.nome || "Cliente",
          valor_disponivel: data.orcamento || 0
        }
      });
    }

    // Create relation between comprador and bairro if bairro was provided
    if (bairroId) {
      try {
        // Check if relation already exists
        const existingRelation = await prisma.bairrosinteressetocomprador.findFirst({
          where: {
            A: bairroId,
            B: client.id
          }
        });

        if (!existingRelation) {
          await prisma.bairrosinteressetocomprador.create({
            data: {
              A: bairroId,
              B: client.id
            }
          });
        }
      } catch (relationError) {
        console.error("Error creating bairro relation:", relationError);
      }
    }

    console.log(`Client data saved for ${phoneNumber}`);
    return client;
  } catch (error) {
    console.error("Error saving client data:", error);
    throw error;
  }
}

/**
 * Get client data from database
 * @param {string} userId - WhatsApp user ID (phone number with @c.us)
 * @returns {Object|null} Client data with interests
 */
async function getClientData(userId) {
  try {
    const phoneNumber = userId.replace(/@c\.us$/, '');
    
    // Get basic client data using findFirst instead of findUnique
    const client = await prisma.comprador.findFirst({
      where: { telefone: phoneNumber }
    });

    if (!client) return null;

    // Get related bairrosinteresse
    const bairrosRelations = await prisma.bairrosinteressetocomprador.findMany({
      where: { B: client.id },
      include: {
        bairrosinteresse: true
      }
    });

    // Get interesses imovel
    const interesses = await prisma.interesseimovel.findMany({
      where: { comprador_id: client.id },
      orderBy: {
        data_interesse: 'desc'
      },
      take: 1,
      include: {
        compraapartamento: true,
        vendacasa: true,
        aluguelapartamento: true,
        aluguelcasa: true
      }
    });

    // Format interesses
    const formattedInteresses = interesses.map(interesse => {
      let imovelData = null;
      if (interesse.compraapartamento) {
        imovelData = {
          tipo: 'compraapartamento',
          ...interesse.compraapartamento
        };
      } else if (interesse.vendacasa) {
        imovelData = {
          tipo: 'vendacasa',
          ...interesse.vendacasa
        };
      } else if (interesse.aluguelapartamento) {
        imovelData = {
          tipo: 'aluguelapartamento',
          ...interesse.aluguelapartamento
        };
      } else if (interesse.aluguelcasa) {
        imovelData = {
          tipo: 'aluguelcasa',
          ...interesse.aluguelcasa
        };
      }

      return {
        tipoImovel: interesse.tipo_imovel,
        dataInteresse: interesse.data_interesse,
        imovel: imovelData
      };
    });

    return {
      name: client.nome,
      phoneNumber: client.telefone,
      valorDisponivel: client.valor_disponivel,
      interesses: formattedInteresses,
      bairrosInteresse: bairrosRelations.map(r => r.bairrosinteresse.nome)
    };
  } catch (error) {
    console.error("Error getting client data:", error);
    throw error;
  }
}

module.exports = {
  extractClientData,
  saveClientData,
  getClientData
};