import 'dotenv/config';
import express from 'express';
import { handleWebhook } from './webhooks/webhook.handler';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Recebe eventos de sistemas externos
app.post('/webhooks/:source', async (req, res) => {
  try {
    await handleWebhook(req.params.source, req.body);
    res.status(202).json({ received: true });
  } catch (err) {
    console.error('Erro ao processar webhook', err);
    res.status(500).json({ error: 'internal_error' });
  }
});

const port = Number(process.env.PORT ?? 3333);
app.listen(port, () => {
  console.log(`integracoes-service ouvindo na porta ${port}`);
});
