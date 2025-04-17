const prisma = require("../config/database")

async function searchProperties(criteria) {
  try {
    const { tipo, interesse, bairro, quartos, valorMaximo } = criteria

    const whereClause = {
      where: {
        AND: [
          tipo ? { tipo } : {},
          interesse ? { interesse } : {},
          bairro ? { bairro: { contains: bairro, mode: "insensitive" } } : {},
          quartos ? { quartos: { gte: quartos } } : {},
          valorMaximo ? { valor: { lte: valorMaximo } } : {},
        ].filter(condition => Object.keys(condition).length > 0),
      },
      include: {
        caracteristicas: true,
      },
    }

    return await prisma.imovel.findMany(whereClause)
  } catch (error) {
    console.error("Error searching properties:", error)
    throw error
  }
}

function formatPropertyList(properties) {
  if (!properties || properties.length === 0) return ""

  return properties
    .map(prop => 
      `- ${prop.tipo} para ${prop.interesse.toLowerCase()} em ${prop.bairro}\n` +
      `  Área: ${prop.area_construida}m² | Quartos: ${prop.quartos} | Banheiros: ${prop.banheiros}\n` +
      `  Vagas: ${prop.vagas_garagem} | Valor: R$ ${prop.valor.toFixed(2)}\n` +
      `  Condomínio: ${prop.condominio || "Não informado"} (R$ ${prop.valor_cond?.toFixed(2) || "0,00"})`
    ).join("\n\n")
}

module.exports = {
  searchProperties,
  formatPropertyList,
}