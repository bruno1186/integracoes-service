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
# integracoes-service

Servico responsavel por integracoes entre sistemas, construido com Node.js + TypeScript. Trabalha com mensageria assincrona, webhooks e conectores para APIs externas (ERPs, gateways de pagamento, CRMs, etc.).

## Tecnologias

- Node.js 20 LTS
- - TypeScript
  - - RabbitMQ e Apache Kafka (mensageria)
    - - Redis (cache e filas)
      - - Express / Fastify para receber webhooks
        - - BullMQ para processamento de jobs
          - - Axios para consumo de APIs externas
            - - Docker e docker-compose
              - - Jest para testes
               
                - ## Arquitetura
               
                - O servico segue um modelo orientado a eventos: recebe eventos via webhook ou fila, aplica transformacoes e regras de negocio, e publica os resultados em filas de saida ou chama APIs de destino. Inclui retry, dead-letter queue e idempotencia.
               
                - ## Estrutura de pastas
               
                - ```
                  integracoes-service/
                    src/
                      connectors/     # conectores para sistemas externos
                      consumers/      # consumidores de filas/eventos
                      webhooks/       # handlers de webhooks
                      jobs/           # processamento assincrono
                      domain/         # regras de negocio e transformacoes
                      config/         # configuracoes
                    test/
                    docker-compose.yml
                    package.json
                  ```

                  ## Como rodar localmente

                  ```bash
                  # instalar dependencias
                  npm install

                  # subir dependencias (RabbitMQ, Kafka, Redis)
                  docker-compose up -d

                  # iniciar em modo desenvolvimento
                  npm run start:dev
                  ```

                  ## Scripts principais

                  - `npm run start:dev` - modo desenvolvimento
                  - - `npm run build` - build de producao
                    - - `npm run test` - testes
                      - - `npm run lint` - analise estatica
                       
                        - ## Licenca
                       
                        - MIT
                        - 
