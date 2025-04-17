function extractPropertyCriteria(message) {
  const lowerMessage = message.toLowerCase()
  
  return {
    tipo: lowerMessage.includes("apartamento") ? "APARTAMENTO" : 
          lowerMessage.includes("casa") ? "CASA" : null,
    interesse: lowerMessage.includes("aluguel") ? "ALUGUEL" : 
               lowerMessage.includes("venda") ? "VENDA" : null,
    bairro: extractNeighborhood(message),
    quartos: extractNumber(message, "quartos") || extractNumber(message, "quarto"),
    valorMaximo: extractBudget(message),
  }
}

function extractNeighborhood(message) {
  const neighborhoods = ["atalaia", "coroa do meio", "grageru", "siqueira campos", "centro", "jardins", "inacio barbosa"]
  const found = neighborhoods.find(n => message.toLowerCase().includes(n.toLowerCase()))
  return found || null
}

function extractNumber(message, keyword) {
  const regex = new RegExp(`${keyword}[\\s:]*([0-9]+)`, "i")
  const match = message.match(regex)
  return match ? parseInt(match[1]) : null
}

function extractBudget(message) {
  const regex = /(R\$\s*)?([0-9.,]+)\s*(mil|k|milh[aã]o)?/i
  const match = message.match(regex)
  if (!match) return null
  
  let value = parseFloat(match[2].replace(".", "").replace(",", "."))
  
  if (match[3]) {
    if (match[3].toLowerCase() === "mil" || match[3] === "k") {
      value *= 1000
    } else if (match[3].toLowerCase().includes("milhao")) {
      value *= 1000000
    }
  }
  
  return value
}

module.exports = {
  extractPropertyCriteria,
}