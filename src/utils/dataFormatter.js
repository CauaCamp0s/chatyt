// Real estate data for Aracaju
const aracajuData = {
    "Bairros de Aracaju": {
      "Centro": {
        "Valor médio": "R$ 4.200/m²",
        "Perfil": "Área central com comércio intenso e opções residenciais."
      },
      "Getúlio Vargas": {
          "Valor médio": "R$ 3.500/m²",
          "Perfil": "Bairro residencial com boa infraestrutura e serviços."
      },
      "Cirurgia": {
          "Valor médio": "R$ 3.600/m²",
          "Perfil": "Área com hospitais e serviços de saúde, além de residências."
      },
      "Pereira Lobo": {
          "Valor médio": "R$ 3.800/m²",
          "Perfil": "Bairro tranquilo com perfil residencial e comércio local."
      },
      "Suíssa": {
          "Valor médio": "R$ 3.700/m²",
          "Perfil": "Área residencial próxima ao centro, com boa infraestrutura."
      },
      "Salgado Filho": {
          "Valor médio": "R$ 3.900/m²",
          "Perfil": "Bairro com perfil misto, oferecendo opções comerciais e residenciais."
      },
      "Treze de Julho": {
          "Valor médio": "R$ 3.466,43/m²",
          "Perfil": "Bairro misto com opções comerciais e residenciais."
      },
      "Dezoito do Forte": {
          "Valor médio": "R$ 3.400/m²",
          "Perfil": "Área residencial com comércio local e serviços."
      },
      "Palestina": {
          "Valor médio": "R$ 3.200/m²",
          "Perfil": "Bairro em desenvolvimento com potencial de valorização."
      },
      "Santo Antônio": {
          "Valor médio": "R$ 3.300/m²",
          "Perfil": "Área histórica com residências e comércio tradicional."
      },
      "Industrial": {
          "Valor médio": "R$ 3.100/m²",
          "Perfil": "Bairro com perfil industrial e algumas áreas residenciais."
      },
      "Santos Dumont": {
          "Valor médio": "R$ 3.000/m²",
          "Perfil": "Área residencial com comércio local e serviços."
      },
      "José Conrado de Araújo": {
          "Valor médio": "R$ 3.150/m²",
          "Perfil": "Bairro residencial com infraestrutura básica e comércio."
      },
      "Novo Paraíso": {
          "Valor médio": "R$ 3.050/m²",
          "Perfil": "Área em crescimento com potencial de valorização imobiliária."
      },
      "América": {
          "Valor médio": "R$ 3.100/m²",
          "Perfil": "Bairro residencial com comércio local e serviços."
      },
      "Siqueira Campos": {
          "Valor médio": "R$ 3.200/m²",
          "Perfil": "Área tradicional com comércio intenso e residências."
      },
      "Soledade": {
          "Valor médio": "R$ 2.900/m²",
          "Perfil": "Bairro em desenvolvimento com potencial de crescimento."
      },
      "Lamarão": {
          "Valor médio": "R$ 2.850/m²",
          "Perfil": "Área residencial com infraestrutura básica e comércio local."
      },
      "Cidade Nova": {
          "Valor médio": "R$ 2.950/m²",
          "Perfil": "Bairro em crescimento com potencial de valorização."
      },
      "Japãozinho": {
          "Valor médio": "R$ 2.800/m²",
          "Perfil": "Área residencial com infraestrutura básica e comércio local."
      },
      "Porto Dantas": {
          "Valor médio": "R$ 2.750/m²",
          "Perfil": "Bairro em desenvolvimento com potencial de crescimento."
      },
      "Bugio": {
          "Valor médio": "R$ 2.700/m²",
          "Perfil": "Área residencial com infraestrutura básica e comércio local."
      },
      "Jardim Centenário": {
          "Valor médio": "R$ 2.850/m²",
          "Perfil": "Bairro em crescimento com potencial de valorização imobiliária."
      },
      "Olaria": {
          "Valor médio": "R$ 2.800/m²",
          "Perfil": "Área residencial com infraestrutura básica e comércio local."
      },
      "Capucho": {
          "Valor médio": "R$ 2.900/m²",
          "Perfil": "Bairro em desenvolvimento com potencial de crescimento."
      },
      "Jabotiana": {
          "Valor médio": "R$ 3.000/m²",
          "Perfil": "Área residencial com boa infraestrutura e serviços."
      },
      "Ponto Novo": {
          "Valor médio": "R$ 3.350/m²",
          "Perfil": "Bairro misto com opções comerciais e residenciais."
      },
      "Luzia": {
          "Valor médio": "R$ 4.422,24/m²",
          "Perfil": "Área residencial em crescimento, com comércio local diversificado."
      },
      "Grageru": {
          "Valor médio": "R$ 4.742,99/m²",
          "Perfil": "Bairro residencial com boa infraestrutura e serviços."
      },
      "Jardins": {
          "Valor médio": "R$ 6.541,71/m²",
          "Perfil": "Área nobre com infraestrutura completa e alta valorização imobiliária."
      },
      "Inácio Barbosa": {
          "Valor médio": "R$ 3.950/m²",
          "Perfil": "Área residencial com infraestrutura completa e comércio diversificado."
      },
      "São Conrado": {
          "Valor médio": "R$ 3.100/m²",
          "Perfil": "Bairro residencial com infraestrutura básica e comércio local."
      },
      "Farolândia": {
          "Valor médio": "R$ 3.724,41/m²",
          "Perfil": "Região com universidades e opções de moradia estudantil."
      },
      "Coroa do Meio": {
          "Valor médio": "R$ 5.138,65/m²",
          "Perfil": "Bairro próximo à praia, com potencial turístico e residencial."
      },
      "Aeroporto": {
          "Valor médio": "R$ 3.500/m²",
          "Perfil": "Área próxima ao aeroporto, com infraestrutura e opções residenciais."
      },
      "Atalaia": {
          "Valor médio": "R$ 4.663,10/m²",
          "Perfil": "Região turística próxima à orla, com diversas opções de lazer."
      },
      "Santa Maria": {
          "Valor médio": "R$ 2.600/m²",
          "Perfil": "Bairro em expansão, com investimentos em infraestrutura e habitação popular."
      }
    },
    "Taxas e Informações Gerais": {
      "Comissão de corretagem": "5-6% do valor do imóvel",
      "Taxa de administração de aluguel": "8-10% do valor mensal",
      "IPTU médio": "0,5-1,5% do valor venal",
      "Documentação básica para compra": [
        "CPF e RG",
        "Comprovante de renda",
        "Comprovante de residência",
        "Certidões negativas",
      ],
    },
  }
  
  /**
   * Format neighborhood data for AI prompt
   * @returns {string} Formatted neighborhood data
   */
  function formatNeighborhoodData() {
    let formatted = ""
    for (const [bairro, info] of Object.entries(aracajuData["Bairros de Aracaju"])) {
      formatted += `*${bairro}*: ${info["Valor médio"]} | ${info["Perfil"]}\n\n`
    }
    return formatted
  }
  
  /**
   * Get information about a specific neighborhood
   * @param {string} neighborhood - Neighborhood name
   * @returns {Object|null} Neighborhood information
   */
  function getNeighborhoodInfo(neighborhood) {
    // Case insensitive search
    const normalizedNeighborhood = neighborhood.toLowerCase()
  
    const foundNeighborhood = Object.keys(aracajuData["Bairros de Aracaju"]).find(
      (b) => b.toLowerCase() === normalizedNeighborhood,
    )
  
    if (foundNeighborhood) {
      return {
        name: foundNeighborhood,
        ...aracajuData["Bairros de Aracaju"][foundNeighborhood],
      }
    }
  
    return null
  }
  
  module.exports = {
    aracajuData,
    formatNeighborhoodData,
    getNeighborhoodInfo,
  }
  
  