# Backend Shiver — Fase 1 (cadastro)

Automação Playwright para cadastrar usuários em `https://trade.shiverbroker.com/pt/login`. Sem API da corretora. Sem banco. Sem captura de sessão.

## Como rodar

```bash
cd backend
npm install
npm run dev
```

O Chromium do Playwright é baixado no `postinstall`.

Variáveis em `.env`:

```
PORT=3001
HEADLESS=false
SHIVER_TIMEOUT_MS=45000
```

Em produção, use `HEADLESS=true`.

## Telas de autenticação

Com o backend rodando:

| Tela | URL |
|------|-----|
| Login | http://localhost:3001/login |
| Cadastro | http://localhost:3001/cadastro |
| Esqueci a senha | http://localhost:3001/esqueci-senha |

Na landing, o CTA **Conheça a ferramenta** abre primeiro a tela de **login** (`NEXT_PUBLIC_REGISTER_URL`, padrão `http://localhost:3001/login`). Cadastro em `/cadastro`.

Preencha nome, sobrenome, e-mail, senha e telefone (mesmos campos de `trade.shiverbroker.com/pt/register`). Use **Entrar**, **Abrir uma conta gratis** ou **Esqueci a senha** — cada tela chama a automação correspondente na Shiver.

Nome e telefone não pedimos no Site A no cadastro: a automação preenche valores derivados do e-mail / `SHIVER_DEFAULT_PHONE` só porque a Shiver ainda exige esses campos.

## Inspetor do DOM

Antes de confiar nos campos do formulário:

```bash
npm run inspect:shiver
```

O script abre o login, lista inputs/botões/links/frames, e salva `screenshots/shiver-login.png`.

Para gerar locators reais no navegador:

```bash
npx playwright codegen https://trade.shiverbroker.com/pt/login
```

## Simular sem criar conta

Abre a Shiver, preenche o formulário e **não clica em cadastrar**. Nada vai para o banco deles.

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3001/api/register -ContentType "application/json" -Body '{"firstName":"Pedro","lastName":"Henrique","email":"pedro@email.com","password":"Senha123!","phone":"11999999999","dryRun":true}'
```

Resposta esperada: HTTP `200`, `"status": "SIMULATED"`.

Sem `dryRun` (ou `false`), o cadastro é enviado de verdade.

## Testar login e recuperação de senha

```bash
curl -X POST http://localhost:3001/api/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"pedro@email.com\",\"password\":\"Senha123!\",\"dryRun\":true}"

curl -X POST http://localhost:3001/api/forgot-password ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"pedro@email.com\",\"dryRun\":true}"
```

## Testar o cadastro real

```bash
curl -X POST http://localhost:3001/api/register ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"Pedro\",\"lastName\":\"Henrique\",\"email\":\"pedro@email.com\",\"password\":\"Senha123!\",\"phone\":\"11999999999\"}"
```

A senha existe só durante a requisição. Não vai para log, arquivo, screenshot ou banco.

## Fora desta fase

Não implementado: iframe da sala, login automático, cookies do usuário, Google Login, fila, Redis, banco.

O nome completo do POST é dividido em Nome + Sobrenome. País/DDI da Shiver não é preenchido nesta fase.
