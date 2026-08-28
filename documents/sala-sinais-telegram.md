# Sinais em tempo real na /sala

Data: 25 de agosto de 2026

## Arquitetura

Telegram (futuro) ou `POST /api/signals/test` (hoje) chamam `publishSignal()`. Essa função valida, normaliza e publica. Os clientes da `/sala` recebem o sinal por SSE (`GET /api/signals/stream`). O iframe da corretora continua isolado: o assistente só mostra a leitura; quem opera é o trader.

## Como funciona agora

1. Abrir `/sala`.
2. O `SalaApp` conecta uma única vez em `/api/signals/recent` e `/api/signals/stream`.
3. Depois do login, o ícone da IA abre o assistente.
4. Sem sinais: “Assistente online” e “Aguardando uma nova leitura de mercado...”.
5. Um POST de teste (ou o Telegram, quando ligado) chama `publishSignal()` e o card aparece sem refresh.

## Proteção do endpoint de teste

Em desenvolvimento, `POST /api/signals/test` fica aberto para o simulador. Em produção ele exige `SIGNAL_TEST_SECRET` no header `x-signal-test-secret`. Se o secret não estiver definido em produção, o POST responde 403.

## Como testar

Desenvolvimento, com a sala aberta (assistente da IA visível):

```bash
curl -X POST http://localhost:3000/api/signals/test ^
  -H "Content-Type: application/json" ^
  -d "{\"asset\":\"EUR/USD\",\"direction\":\"BUY\",\"expiration\":\"5M\"}"
```

Venda:

```bash
curl -X POST http://localhost:3000/api/signals/test ^
  -H "Content-Type: application/json" ^
  -d "{\"asset\":\"BTC/USD\",\"direction\":\"SELL\",\"expiration\":\"1M\"}"
```

Painel visual só em dev: `/sala?debugSignals=true`.

## Telegram real (o que falta)

1. Preencher `TELEGRAM_BOT_TOKEN` e `TELEGRAM_WEBHOOK_SECRET` (nunca `NEXT_PUBLIC_`).
2. Configurar o webhook do bot para `POST /api/telegram/webhook` com `X-Telegram-Bot-Api-Secret-Token`.
3. Ajustar `parseTelegramMessage()` ao formato real das mensagens.
4. O frontend da `/sala` não precisa mudar: o parser já chama `publishSignal()`.

## Limitações sem banco

Os últimos 20 sinais ficam só na RAM do processo Node. Reiniciar o servidor apaga o histórico. Não há persistência.

## SSE e deploy

Esta implementação pressupõe uma instância persistente de Node.js (`next start` ou host com processo longo). Em ambiente serverless ou com várias instâncias, cada instância tem a própria memória: clientes SSE e `recentSignals` não se compartilham. Nesse caso será necessário Redis, pub/sub ou outro mecanismo compartilhado — sem alterar a interface da `/sala`.
