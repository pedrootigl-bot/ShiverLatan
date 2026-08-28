"use strict";

require("dotenv").config();

const path = require("node:path");
const express = require("express");
const cors = require("cors");
const { registerRoutes } = require("./routes/registerRoutes");

const app = express();
const port = Number(process.env.PORT) || 3001;
const publicDir = path.join(__dirname, "../public");
const authPage = path.join(publicDir, "auth.html");

app.use(cors());
app.use(express.json({ limit: "32kb" }));
app.use(express.static(publicDir));

app.get("/", (_req, res) => {
  res.json({
    service: "shiver-backend",
    phase: "Fase 1 — cadastro automático na Shiver",
    pages: {
      login: "GET /login",
      cadastro: "GET /cadastro",
      esqueciSenha: "GET /esqueci-senha",
    },
    endpoints: {
      health: "GET /health",
      register: "POST /api/register",
      login: "POST /api/login",
      forgotPassword: "POST /api/forgot-password",
    },
    authBody: {
      email: "pedro@email.com",
      password: "(obrigatório — não logado)",
      dryRun: "true para simular sem enviar à Shiver",
    },
    docs: "Veja backend/README.md",
  });
});

const authPaths = ["/login", "/cadastro", "/register", "/esqueci-senha", "/recuperar-senha"];
for (const routePath of authPaths) {
  app.get(routePath, (_req, res) => {
    res.sendFile(authPage);
  });
}

app.get("/cadastro.html", (_req, res) => {
  res.redirect(302, "/login");
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "shiver-backend" });
});

app.use("/api", registerRoutes);

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      status: "VALIDATION_ERROR",
      message: "JSON inválido.",
    });
  }

  console.error("[SERVER]", err.message);
  res.status(500).json({
    success: false,
    status: "AUTOMATION_ERROR",
    message: "Falha interna no backend.",
  });
});

app.listen(port, () => {
  console.log(`[SERVER] Backend na porta ${port}`);
  console.log(`[SERVER] Login: http://localhost:${port}/login`);
  console.log(`[SERVER] Cadastro: http://localhost:${port}/cadastro`);
  console.log(`[SERVER] Esqueci senha: http://localhost:${port}/esqueci-senha`);
  console.log(`[SERVER] POST /api/register`);
  console.log(`[SERVER] POST /api/login`);
  console.log(`[SERVER] POST /api/forgot-password`);
  console.log(`[SERVER] HEADLESS=${process.env.HEADLESS === "true"}`);
});
