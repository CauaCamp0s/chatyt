require('dotenv').config();
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Configuração do Gemini
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyDO0VjJ5WMv0vWvOj_N2opuRVrbFTe1PiQ";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const MODEL_CONFIG = {
    model: "gemini-2.0-flash",
    generationConfig: {
        maxOutputTokens: 1500,
        temperature: 0.3
    }
};

// Dados completos de Aracaju
const dadosAracaju = {
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
            "Certidões negativas"
        ]
    }
};

// Configuração do WhatsApp
const client = new Client({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Função para formatar dados dos bairros (mais enxuta)
function formatarDadosBairros() {
    let formatted = "";
    for (const [bairro, info] of Object.entries(dadosAracaju["Bairros de Aracaju"])) {
        formatted += `*${bairro}*: ${info["Valor médio"]} | ${info["Perfil"]}\n\n`;
    }
    return formatted;
}

// Função para criar prompt (combinando os dois modelos)
function criarPrompt(pergunta) {

    const bairrosFormatados = formatarDadosBairros();



    return `Você é o ImobAI, um assistente virtual especializado em corretagem de imóveis em Sergipe. Siga RIGOROSAMENTE estas diretrizes:
    
    
    
    1. ESCOPO DE ATUAÇÃO:
    
    - Compra, venda, aluguel e administração de imóveis
    
    - Procedimentos de corretagem (documentação, etapas de negociação, papel do corretor)
    
    - Financiamento imobiliário (tipos de crédito, taxas, requisitos)
    
    - Avaliação de imóveis (métodos, fatores que influenciam o valor)
    
    - Tendências do mercado imobiliário
    
    
    
    2. FOCO EM SERGIPE (DADOS ATUALIZADOS):
    
    ${bairrosFormatados}
    
    
    
    Informações adicionais:
    
    - Taxa média de corretagem: ${dadosAracaju['Taxas e Informações Gerais']['Comissão de corretagem']}
    
    - Documentação básica para compra: ${dadosAracaju['Taxas e Informações Gerais']['Documentação básica para compra'].join(', ')}
    
    
    
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
    
    
    
    PERGUNTA DO CLIENTE: ${pergunta}
    
    
    
    SUA RESPOSTA (sigla STRITAMENTE as diretrizes acima):`;

}



// Função para consultar o Gemini
async function consultarGemini(pergunta) {
    try {
        const model = genAI.getGenerativeModel(MODEL_CONFIG);
        const prompt = criarPrompt(pergunta);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Erro no Gemini:', error);
        return null;
    }
}

// Eventos do WhatsApp
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code pronto para escaneamento');
});

client.on('ready', () => {
    console.log('Bot conectado ao WhatsApp');
});

client.on('disconnected', () => {
    console.log('Reconectando...');
    client.initialize();
});

// Fluxo de mensagens otimizado
client.on('message', async msg => {
    if (!msg.from.endsWith('@c.us')) return;

    const chat = await msg.getChat();

    try {
        await chat.sendStateTyping();

        // Mensagem de boas-vindas simplificada
        if (/^(oi|olá|ola|menu|inicio|start)/i.test(msg.body)) {
            const contact = await msg.getContact();
            await msg.reply(
                `*Olá ${contact.pushname || 'Cliente'}!* Sou o ImobAI, especialista em imóveis de Aracaju.\n\n` +
                `Posso te ajudar com:\n- Valores por bairro\n- Documentação\n- Processos imobiliários\n\n` +
                `Ex: "Valor no Atalaia" ou "Como financiar?"`
            );
            return;
        }

        // Consulta ao Gemini
        const resposta = await consultarGemini(msg.body);

        if (resposta) {
            await msg.reply(resposta.slice(0, 1500)); // Limita o tamanho
        } else {
            // Fallback com dados locais
            const bairroPesquisado = Object.keys(dadosAracaju["Bairros de Aracaju"]).find(b =>
                msg.body.toLowerCase().includes(b.toLowerCase())
            );

            if (bairroPesquisado) {
                const info = dadosAracaju["Bairros de Aracaju"][bairroPesquisado];
                await msg.reply(
                    `*${bairroPesquisado}*\n` +
                    `Valor: ${info["Valor médio"]}\n` +
                    `Perfil: ${info["Perfil"]}\n\n` +
                    `Contato: (79) 79988283028`
                );
            } else {
                await msg.reply(
                    `Posso te ajudar com:\n` +
                    `- Valores em bairros específicos\n` +
                    `- Processos de compra/venda\n` +
                    `- Orientação sobre documentação\n\n` +
                    `Ex: "Valores no Centro" ou "Documentos para alugar"`
                );
            }
        }
    } catch (error) {
        console.error('Erro:', error);
        await msg.reply('Serviço indisponível no momento. Contate: (79) 9999-9999');
    }
});

// Inicialização segura
client.initialize().catch(err => {
    console.error('Erro na inicialização:', err);
    process.exit(1);
});