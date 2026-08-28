# Backend — cadastro automático na Shiver (Fase 1)

Data: 28 de agosto de 2026

## Objetivo

O backend recebe nome, e-mail, senha e telefone e usa Playwright para abrir a Shiver e criar a conta. Não há API da corretora. Não há banco nesta fase.

## Telas de autenticação (Site A)

| Rota | Função |
|------|--------|
| `GET /login` | Entrar (e-mail + senha) → `POST /api/login` |
| `GET /cadastro` | Abrir conta → `POST /api/register` |
| `GET /esqueci-senha` | Recuperar senha → `POST /api/forgot-password` |

Arquivos: `backend/public/auth.html`, `auth.css`, `auth.js`. `/cadastro.html` redireciona para `/cadastro`.

Com “Simular” marcado, usa `dryRun: true` e não envia à Shiver. O cadastro pede os mesmos campos da Shiver: nome, sobrenome, e-mail, senha e telefone.

## Fluxo

1. `POST /api/register` valida o JSON.
2. `shiverRegistrationService` chama `registerShiverUser()`.
3. Playwright abre Chromium (context novo por cadastro).
4. Vai para `/pt/login`, aceita cookies se aparecerem, abre o cadastro.
5. Preenche os campos com locators por papel/label/placeholder.
6. Com `dryRun: true`, para antes do submit e retorna `SIMULATED`.
7. Sem dry-run, envia o formulário e classifica: `CREATED`, `ALREADY_EXISTS`, `VALIDATION_ERROR`, `TIMEOUT`, `AUTOMATION_ERROR`.

Recuperação de senha (`POST /api/forgot-password`): abre `/pt/change-password`, preenche e-mail, retorna `RESET_EMAIL_SENT`, `NOT_FOUND`, `SIMULATED`, etc.

## URLs e campos confirmados (28/08/2026)

- Login: `https://trade.shiverbroker.com/pt/login`
- Cadastro: `https://trade.shiverbroker.com/pt/register`
- Sem iframe interno
- Login: `identifier` (placeholder E-mail), `password` (placeholder Senha), link **Inscrever-se** (`/register`), botão **Registrar-se**
- Cadastro:
  - `first_name` / placeholder **Nome**
  - `last_name` / placeholder **Sobrenome**
  - `identifier` / placeholder **E-mail**
  - `password` / placeholder **Senha**
  - `tel` / placeholder **Número de telefone**
  - submit **Abrir uma conta gratis**
- Também existem buscas de país/DDI. País padrão não foi forçado nesta fase.

## Ainda observar

- O botão **Registrar-se** no login não mudou a URL no inspetor; o fluxo usa o link **Inscrever-se** e, se preciso, vai direto a `/pt/register`.
- Mensagens de e-mail duplicado dependem do texto real da Shiver após o submit.
- Não há checkbox de termos visível no DOM inspecionado.

## Segurança

A senha não é logada, não vai para screenshot e não é gravada em arquivo. Se no futuro o Site A precisar guardar senha, usar Argon2 ou bcrypt — nunca texto puro.

## Fora desta fase

Iframe da sala, login automático, cookies do usuário, Google Login, banco, fila, Redis.
