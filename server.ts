import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  
  // Parse JSON bodies
  app.use(express.json());

  // Initialize Gemini Client safely
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log('Gemini AI client successfully initialized on the server.');
    } catch (error) {
      console.error('Error initializing GoogleGenAI:', error);
    }
  } else {
    console.warn('W-01: GEMINI_API_KEY is not defined or is set to default. Server will operate in fallback mode.');
  }

  // API Route: Healthcheck
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      geminiActive: !!ai,
      message: 'Élégance Africa Core Running Perfectly'
    });
  });

  // API Route: AI Style Assistant Chat
  app.post('/api/gemini/advisor', async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `Tu es "Élégance Africa Assistant", un conseiller styliste virtuel expert et passionné de la haute couture, du prêt-à-porter et des textiles africains authentiques (Wax Hollandais, Kenté du Ghana, Bogolan du Mali, Ndop de l'Ouest Cameroun, Bazin Riche teinté, Dentelle).
Ton rôle est de guider les clients dans le choix de leurs tenues, d'expliquer l'histoire culturelle des tissus et de leur proposer des conseils d'association uniques pour valoriser les créations africaines.
Tu es toujours extrêmement poli, élégant, chaleureux et raffiné. Rédige tes réponses en français élégant, avec une mise en forme Markdown soignée (titres clairs, puces). Assure-toi d'intégrer des termes valorisant l'artisanat.`;

    if (!ai) {
      // Return a refined fashion fallback responses if Gemini is not activated
      return res.json({
        text: `### Bonjour ! Je suis votre conseiller en style d'**Élégance Africa**.\n\n_Note académique : Le serveur fonctionne actuellement en mode simulation car la clé d'API de test n'est pas tout à fait configurée. Voici une réponse préparée par nos équipes de stylisme :_\n\nPour une allure royale et pleine d'élégance, je vous suggère de regarder notre collection de **Wax Royal** ou notre prestigieux **Manteau en Bogolan**. \n\n* **Si c'est pour un mariage ou une grande cérémonie** : Le **Grand Boubou de Bazin Riche** blanc brodé d'or ou une robe ajustée avec revers en tissage **Kenté** traditionnel feront sensation. Associez-les à des accessoires minimalistes dorés.\n* **Pour un style professionnel ou urbain chic** : Une veste cintrée moderne contenant des touches subtiles de tissu **Bogolan** ou une chemise ajustée combinée à un pantalon chic de couleur noire ou écrue.\n\nQuel type de tissu ou quelle occasion spéciale ciblez-vous aujourd'hui ?`
      });
    }

    try {
      // Structure chat messages incorporating context/history
      // Format history into contents
      const formattedContents = [];
      
      // Inject history if exists
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          formattedContents.push({
            role: turn.sender === 'user' ? 'user' : 'model',
            parts: [{ text: turn.text }]
          });
        }
      }
      
      // Add current user message
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      // We call Gemini
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "Désolé, je n'ai pas pu générer de conseil pour le moment.";
      res.json({ text: replyText });

    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({ 
        error: "Erreur lors de la génération par l'IA", 
        details: err.message,
        text: "Désolé, j'ai rencontré un léger contretemps technique en voulant consulter mes carnets de tendance. Puis-je vous aider en vous suggérant de regarder nos fiches produits en Wax ou en Kente ?"
      });
    }
  });

  // Vite Integration in Development / Static Serving in Production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Mounting Vite dev server middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('Production server mode detected: serving dist assets...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Élégance Africa] Server fully running at http://localhost:${PORT}`);
  });
}

startServer();
