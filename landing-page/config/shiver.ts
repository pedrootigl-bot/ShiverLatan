import type { Locale } from "@/lib/i18n/locale";

export const SHIVER_ORIGIN = "https://trade.shiverbroker.com";

/** Popup oficial de login (e-mail, senha e Google). */
export const SHIVER_LOGIN_URL = `${SHIVER_ORIGIN}/pt/login`;

export const SHIVER_POPUP_NAME = "shiver-auth";

export const SHIVER_POPUP_DEFAULT_WIDTH = 520;
export const SHIVER_POPUP_DEFAULT_HEIGHT = 720;

export function shiverLoginUrl(locale: Locale): string {
  return `${SHIVER_ORIGIN}/${locale}/login`;
}
