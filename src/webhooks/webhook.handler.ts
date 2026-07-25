import { HttpConnector } from '../connectors/http.connector';

const connector = new HttpConnector(
  process.env.TARGET_API_URL ?? 'https://httpbin.org',
);

/**
 * Recebe um evento de webhook, aplica transformacao e encaminha
 * para a API de destino. Aqui entrariam validacao, idempotencia,
 * publicacao em fila (RabbitMQ/Kafka), etc.
 */
export async function handleWebhook(
  source: string,
  payload: unknown,
): Promise<void> {
  console.log(`Recebido evento de ${source}`, payload);

  const transformed = {
    source,
    receivedAt: new Date().toISOString(),
    data: payload,
  };

  await connector.post('/post', transformed);
}
