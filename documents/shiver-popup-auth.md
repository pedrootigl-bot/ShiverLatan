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
2. Popup abre o login oficial da Shiver.
3. Usuário faz login e **fecha o popup**.
4. Validação:
   - se o traderoom detectar sessão → libera na hora;
   - se o iframe não enxergar cookies (3P), **Já fiz login** libera só com popup fechado e ≥ ~15s no fluxo (abrir o card e clicar na hora **não** libera).
5. Iframe recarrega e o menu da sala é liberado.

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

- **Cookies third-party:** Site A (`localhost` / domínio próprio) e Shiver estão em origens diferentes. O login no **popup** grava cookies em `trade.shiverbroker.com` (first-party). O **iframe** na sala é third-party e o navegador pode bloquear esses cookies — o iframe continua deslogado mesmo após login válido.
- **Detecção automática:** o Site A não lê URL/DOM/cookies cross-origin do popup. Por isso o fechamento automático só ocorre quando o probe do traderoom consegue ver sessão, ou quando o usuário clica **Já fiz login** (após abrir o popup oficial).
- **Já fiz login:** exige ter aberto o login oficial **e** sessão detectada no traderoom. Só abrir o popup/card sem entrar na conta **não** libera o acesso.

## Segurança (não implementado / proibido)

- Não capturar, copiar ou injetar cookie `ssid`.
- Não acessar conteúdo cross-origin do popup ou iframe.
- Não proxy ou bypass de OAuth Google.
