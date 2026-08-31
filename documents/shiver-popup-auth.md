# Autenticação Shiver via popup (Site A)

## Objetivo

Permitir login na Shiver Broker (incluindo Google OAuth) sem sair do Site A e sem usar iframe para o login. O Google bloqueia OAuth dentro de iframes; a sessão é criada pela Shiver em `trade.shiverbroker.com` e reutilizada pelo iframe da sala.

## Fluxo via backend (`/login`)

1. Usuário abre `http://localhost:3001/login` e vê **Conectar sua conta**.
2. Clica **Abrir login da corretora** → popup em `https://trade.shiverbroker.com/pt/login`.
3. Faz login na Shiver (e-mail, senha ou Google).
4. O sistema detecta a sessão, **fecha o popup**, valida no backend (`POST /api/auth/complete`) e redireciona para a sala com iframe + menu liberado.

O botão **Já fiz login** permanece como fallback manual.

Configure `SHIVER_LOGIN_URL`, `SHIVER_TRADEROOM_URL`, `SALA_URL` e `LANDING_URL` no `.env` do backend.

## Fluxo via popup (sala)

1. Usuário clica **Conectar conta** na sala.
2. `window.open()` abre popup real com `https://trade.shiverbroker.com/{locale}/login`.
3. Usuário faz login (email/senha ou Google) no domínio oficial da Shiver.
4. Usuário fecha o popup (ou clica **Já fiz login**).
5. Site A detecta fechamento via `popup.closed` (polling a cada 500 ms).
6. Iframe recarrega (`iframeKey++`).
7. Se cookies third-party forem permitidos, o iframe reconhece a sessão (`ssid` em `.shiverbroker.com`).

A página principal **nunca** navega para a Shiver.

## Arquivos

| Arquivo | Função |
|---------|--------|
| `landing-page/config/shiver.ts` | URLs e constantes do popup |
| `landing-page/lib/shiver/popup.ts` | `openCenteredPopup()`, `isPopupOpen()` |
| `landing-page/lib/shiver/useShiverPopupAuth.ts` | Hook com estados e detecção de fechamento |
| `landing-page/components/ShiverPlatform.tsx` | Iframe + UI de autenticação |
| `landing-page/components/sala/SalaModal.tsx` | Integração na sala |

## Estados da UI

`idle` → `opening` → `waiting_for_login` → `checking` → `ready`  
Ou `popup_blocked` se o navegador bloquear pop-ups.

## Teste manual

1. Abrir `/sala` sem sessão Shiver.
2. Clicar **Conectar conta** — popup centralizado deve abrir.
3. Login com Google no popup (deve funcionar).
4. Fechar popup — iframe recarrega, mensagem "Verificando sua sessão…".
5. Se autenticado: menu lateral desbloqueia; barra de auth some.
6. Cenários extras: popup bloqueado, fechar sem login, **Já fiz login**, segundo clique em Conectar (focus no popup existente).

## Limitações

- **Cookies third-party:** Site A e Shiver estão em domínios diferentes. Se o navegador bloquear cookies de terceiros, o iframe pode continuar deslogado mesmo após login válido no popup. Nesse caso aparece aviso discreto + **Tentar novamente** (apenas recarrega o iframe).
- **Sem confirmação de login:** O Site A não acessa cookies, DOM ou tokens cross-origin. Não afirmamos "login realizado com sucesso" — apenas "Plataforma atualizada."
- **Detecção heurística:** `useBrokerSession` infere autenticação pelo padrão de recargas do iframe, não por leitura de sessão Shiver.

## Segurança (não implementado / proibido)

- Não capturar, copiar ou injetar cookie `ssid`.
- Não acessar conteúdo cross-origin do popup ou iframe.
- Não proxy ou bypass de OAuth Google.
