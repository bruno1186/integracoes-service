import amqp from 'amqplib';

const QUEUE = 'integracoes.eventos';

/**
 * Consumidor de exemplo para RabbitMQ. Escuta uma fila e processa
 * cada mensagem, com ack manual para garantir entrega.
 */
export async function startConsumer(): Promise<void> {
  const url = process.env.RABBITMQ_URL ?? 'amqp://localhost';
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, { durable: true });
  channel.prefetch(10);

  console.log(`Consumindo mensagens da fila ${QUEUE}`);

  await channel.consume(QUEUE, async (msg) => {
    if (!msg) return;
    try {
      const event = JSON.parse(msg.content.toString());
      console.log('Processando evento', event);
      // ... regras de negocio / transformacao
      channel.ack(msg);
    } catch (err) {
      console.error('Falha ao processar, enviando para DLQ', err);
      channel.nack(msg, false, false);
    }
  });
}

if (require.main === module) {
  startConsumer().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
