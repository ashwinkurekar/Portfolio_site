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

// Direct route for original profile photo from Google Drive file 18OAyrwdU89yQxOsXWYeoP1ll_TtddF5-
app.get(['/images/profile-photo.jpg', '/profile-photo.jpg', '/profile.jpg', '/images/profile.jpg', '/profile%20pic.jpeg', '/profile pic.jpeg', '/images/profile%20pic.jpeg', '/images/profile pic.jpeg'], async (_req, res, next) => {
  const candidatePaths = [
    path.join(__dirname, 'public', 'images', 'profile-photo.jpg'),
    path.join(__dirname, 'public', 'profile-photo.jpg'),
    path.join(__dirname, 'public', 'profile pic.jpeg'),
    path.join(__dirname, 'public', 'images', 'profile pic.jpeg'),
    path.join(__dirname, 'public', 'profile.jpeg'),
    path.join(__dirname, 'public', 'profile.jpg'),
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

// API route for Contact Form EmailJS transmission (ensures delivery even if browser ad-blockers block api.emailjs.com)
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, message, time } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const rawServiceId = process.env.VITE_EMAILJS_SERVICE_ID;
    const serviceId =
      rawServiceId && rawServiceId !== 'service_8t6znsm' && rawServiceId !== 'YOUR_SERVICE_ID'
        ? rawServiceId
        : 'service_fkck4ra';
    const templateId =
      process.env.VITE_EMAILJS_TEMPLATE_ID && process.env.VITE_EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID'
        ? process.env.VITE_EMAILJS_TEMPLATE_ID
        : 'template_k614f9w';
    const publicKey =
      process.env.VITE_EMAILJS_PUBLIC_KEY && process.env.VITE_EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
        ? process.env.VITE_EMAILJS_PUBLIC_KEY
        : '70nk0hkqyVp60zqj4';

    const originHeader = req.headers.origin || req.headers.referer || 'http://localhost:3000';
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': String(originHeader),
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: String(name).trim(),
          email: String(email).trim(),
          message: String(message).trim(),
          time: String(time || new Date().toLocaleString()),
        },
      }),
    });

    if (response.ok) {
      return res.json({ status: 'ok', success: true });
    }

    const errText = await response.text();
    return res.status(response.status).json({ error: errText });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server email proxy failed';
    return res.status(500).json({ error: msg });
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
