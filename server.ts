import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { getSystemPrompt, getLocalFallbackAnswer } from './src/services/aiKnowledge.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const args = process.argv.slice(2);
let portArg = 3000;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--port' && args[i + 1]) {
    portArg = parseInt(args[i + 1], 10);
  }
}
const PORT = Number(process.env.PORT) || portArg || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// API health endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Ashwin Kurekar Portfolio API' });
});

// Direct route for original profile photo
app.get(['/profile%20pic.jpeg', '/profile pic.jpeg', '/images/profile%20pic.jpeg', '/images/profile pic.jpeg'], async (_req, res, next) => {
  const candidatePaths = [
    path.join(__dirname, 'public', 'profile pic.jpeg'),
    path.join(__dirname, 'public', 'images', 'profile pic.jpeg'),
    path.join(__dirname, 'public', 'profile.jpeg'),
    path.join(__dirname, 'public', 'profile.jpg'),
    path.join(__dirname, 'profile pic.jpeg'),
    path.join(__dirname, '.aistudio', 'artifacts', 'brain', '650cf65b-92de-4d8e-93d6-9d91086dc42b', 'profile pic.jpeg'),
  ];

  try {
    const { existsSync } = await import('node:fs');
    for (const p of candidatePaths) {
      if (existsSync(p)) {
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.sendFile(path.resolve(p));
      }
    }
  } catch {
    // Continue
  }
  next();
});

// Endpoint to upload original profile picture directly if needed
app.post('/api/upload-profile-pic', express.json({ limit: '20mb' }), async (req, res) => {
  try {
    const { base64Data, filename = 'profile pic.jpeg' } = req.body;
    if (!base64Data) {
      return res.status(400).json({ error: 'base64Data is required' });
    }

    const { promises: fs } = await import('node:fs');
    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');

    const destDirs = [
      path.join(__dirname, 'public'),
      path.join(__dirname, 'public', 'images'),
      path.join(__dirname, 'dist'),
      path.join(__dirname, 'dist', 'images'),
    ];

    for (const dir of destDirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(path.join(dir, filename), buffer);
        await fs.writeFile(path.join(dir, 'profile.jpeg'), buffer);
      } catch (err) {
        console.warn('Could not write to dir:', dir, err);
      }
    }

    return res.json({ success: true, path: `/profile%20pic.jpeg` });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});


// API route for Ashwin AI assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message string is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const fallbackReply = getLocalFallbackAnswer(message);
      return res.json({ reply: fallbackReply, fallback: true });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = getSystemPrompt();

    // Prepare contents with conversation history
    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const turn of history) {
        if (turn && turn.text && (turn.role === 'user' || turn.role === 'model')) {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text }],
          });
        }
      }
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // 4-second timeout race to guarantee responsive feedback and fallback
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI request timeout')), 4000)
    );

    const callPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
      },
    });

    const response = (await Promise.race([callPromise, timeoutPromise])) as any;

    const reply = response?.text || getLocalFallbackAnswer(message);
    return res.json({ reply, fallback: false });
  } catch (err: any) {
    // Graceful fallback on API error or rate limit or timeout
    const query = req.body?.message || '';
    const fallbackReply = getLocalFallbackAnswer(query);
    return res.json({ reply: fallbackReply, fallback: true });
  }
});

// Mount Vite or static dist files
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
        hmr: process.env.DISABLE_HMR === 'true' ? false : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${PORT} is in use; process will defer to active listener.`);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer();
