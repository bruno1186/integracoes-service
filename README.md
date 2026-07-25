# integracoes-service

Servico de integracoes entre sistemas em Node.js + TypeScript. Recebe eventos via webhook, aplica transformacoes e regras de negocio e encaminha os resultados para APIs de destino ou filas de saida. O MVP roda como um servico HTTP (Express); a mensageria e os conectores adicionais sao pontos de extensao documentados abaixo.

## Stack

- Node.js 20 LTS, TypeScript
- Express (recepcao de webhooks)
- Axios (consumo de APIs externas)
- dotenv (configuracao)
- Docker e docker-compose

## Estrutura

```
src/
  index.ts                    # bootstrap HTTP e rotas
  webhooks/
    webhook.handler.ts        # roteamento e tratamento de eventos
  connectors/
    http.connector.ts         # cliente HTTP para APIs externas
  consumers/
    example.consumer.ts       # exemplo de consumidor de eventos
docker-compose.yml
```

## Como rodar

```
npm install
npm run start:dev
```

O servico sobe em `http://localhost:3333`.

## Endpoints

- `GET /health`
- `POST /webhooks/:source` - recebe um evento de um sistema externo

Exemplo:

```
curl -X POST http://localhost:3333/webhooks/erp \
  -H "Content-Type: application/json" \
  -d '{"event":"invoice.created","id":123}'
```

## Extensoes (event-driven)

O desenho e orientado a eventos e preve mensageria assincrona (RabbitMQ/Kafka), Redis para filas/cache e processamento de jobs com retry, dead-letter queue e idempotencia. Esses componentes sao adicionados via `docker-compose` e implementados em novos consumidores em `src/consumers/`.

## Scripts

- `npm run start:dev` - desenvolvimento
- `npm run build` - build de producao
- `npm run test` - testes

## Licenca

MIT
