import { Router } from 'express';
import fetch from 'node-fetch';

export const recommendationsRouter = Router();

// Proxy to AI service
recommendationsRouter.post('/suggest', async (req, res) => {
  try {
    const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    const r = await fetch(`${aiUrl}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body || {})
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: 'AI service unavailable' });
  }
});

recommendationsRouter.post('/size', async (req, res) => {
  try {
    const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    const r = await fetch(`${aiUrl}/size`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body || {})
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: 'AI service unavailable' });
  }
});


