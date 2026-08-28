"use strict";

/**
 * Locators da Shiver.
 * Confirmados em 28/08/2026 por inspectShiverPage + dump de /pt/register.
 */
const SHIVER_SELECTORS = {
  urls: {
    login: "https://trade.shiverbroker.com/pt/login",
    register: "https://trade.shiverbroker.com/pt/register",
    changePassword: "https://trade.shiverbroker.com/pt/change-password",
  },

  cookieAcceptNames: [/entendi/i, /aceitar/i, /accept/i, /got it/i],

  /** Link confirmado: texto "Inscrever-se", href="/register". */
  openRegisterLink: /inscrever-se/i,

  /**
   * Botão "Registrar-se" existe no login, mas no inspetor não mudou a URL.
   * Usado só como fallback depois do link e da navegação direta.
   */
  openRegisterFallbackNames: [/registrar-se/i, /criar conta/i, /cadastre-se/i, /sign up/i, /register/i],

  fieldStrategies: {
    firstName: {
      names: ["first_name"],
      placeholders: [/^Nome$/],
      labels: [/primeiro nome/i, /^nome$/i],
    },
    lastName: {
      names: ["last_name"],
      placeholders: [/^Sobrenome$/i],
      labels: [/sobrenome/i, /last name/i],
    },
    email: {
      names: ["identifier"],
      placeholders: [/^E-mail$/i],
      labels: [/e-?mail/i],
    },
    phone: {
      names: [],
      placeholders: [/número de telefone/i],
      types: ["tel"],
      labels: [/telefone/i, /celular/i],
    },
    password: {
      names: ["password"],
      placeholders: [/^Senha$/],
      types: ["password"],
      labels: [/^senha$/i, /password/i],
    },
  },

  /** Confirmado no login: type=submit, texto "Entrar". */
  loginSubmitNames: [/^entrar$/i, /^login$/i, /sign in/i],

  /** Recuperação de senha — confirmar após inspect se necessário. */
  forgotPasswordLink: /esqueceu a senha/i,
  forgotPasswordSubmitNames: [
    /enviar/i,
    /recuperar/i,
    /redefinir/i,
    /continuar/i,
    /reset/i,
    /submit/i,
  ],
  forgotPasswordSuccessPattern:
    /e-?mail enviado|link enviado|verifique seu e-?mail|instruções enviadas|confira sua caixa|check your e-?mail|reset link/i,
  forgotPasswordNotFoundPattern:
    /não encontramos|não existe|not found|usuário não encontrado|conta não encontrada|e-?mail não cadastrado/i,

  /** Confirmado no cadastro: type=submit, texto "Abrir uma conta gratis". */
  submitNames: [
    /abrir uma conta/i,
    /criar conta/i,
    /cadastrar/i,
    /registrar-se/i,
    /sign up/i,
    /register/i,
  ],

  alreadyExistsPattern:
    /e-?mail já (cadastrado|existe|registrado)|usuário já existe|conta já existe|already (exists|registered)|account already exists|email already (exists|in use)|já possui uma conta/i,

  invalidCredentialsPattern:
    /senha (incorreta|inválida)|e-?mail ou senha|credenciais? (inválid|incorret)|invalid (password|credentials)|wrong password|incorrect password|usuário não encontrado|não encontramos/i,

  validationPattern:
    /campo obrigatório|preencha|inválid|invalid|required|senha (fraca|curta)|mínimo de|formato/i,

  successPattern:
    /conta criada|cadastro (realizado|concluído)|registro (realizado|concluído)|bem-vindo|welcome|verifique seu e-?mail|registration successful/i,

  successUrlPattern: /traderoom|dashboard|welcome|verify|success|account\/created|register\/success/i,
};

module.exports = { SHIVER_SELECTORS };
