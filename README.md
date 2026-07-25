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
