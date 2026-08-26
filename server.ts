import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check API
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', name: 'Souza & Souza Imóveis API' });
  });

  // AI Real Estate Assistant Endpoint
  app.post('/api/ai-consultant', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY não configurada no servidor.'
        });
      }

      const { prompt, contextProperties } = req.body;

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `Você é o "Consultor Virtual Souza & Souza", especialista imobiliário sênior da Souza & Souza Imóveis (uma imobiliária de confiança com mais de 9 anos de atuação em Colombo, Curitiba e Região Metropolitana).
Sua missão é ajudar os clientes a encontrar o imóvel ideal, tirar dúvidas sobre financiamento imobiliário (Caixa, Itaú, Bradesco, Santander), legislação brasileira de aluguel (Lei do Inquilinato), avaliação de imóveis (PTAM), terrenos, chácaras e áreas.
Seja muito cortês, profissional, empático e objetivo. Use português do Brasil impecável com formatação limpa e markdown elegante.

Dados de contexto dos imóveis no catálogo atual (se aplicável):
${JSON.stringify(contextProperties || [], null, 2)}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nPergunta do Cliente: ${prompt}` }] }
        ]
      });

      const text = response.text || 'Desculpe, não consegui processar sua dúvida no momento. Por favor, tente novamente ou entre em contato com nossos corretores via WhatsApp.';
      return res.json({ reply: text });
    } catch (error: any) {
      console.error('Erro na API AI Consultant:', error);
      return res.status(500).json({
        error: 'Erro ao consultar assistente de IA. Tente novamente mais tarde.'
      });
    }
  });

  // Contact / Lead capture endpoint simulation
  app.post('/api/leads', (req, res) => {
    const lead = req.body;
    console.log('Novo lead recebido:', lead);
    return res.json({
      success: true,
      message: 'Solicitação recebida com sucesso! Um corretor credenciado CRECI entrará em contato em até 15 minutos.'
    });
  });

  // Vite middleware for development vs static production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use('/Souza-Imoveis', express.static(distPath));
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Souza & Souza Imóveis server rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Erro ao iniciar o servidor:', err);
});
