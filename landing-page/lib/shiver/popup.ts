export type OpenCenteredPopupOptions = {
  url: string;
  name: string;
  width?: number;
  height?: number;
};

/**
 * Abre uma janela popup real centralizada na tela.
 * Deve ser chamada diretamente a partir de um gesto do usuário (click).
 */
export function openCenteredPopup({
  url,
  name,
  width = 520,
  height = 720,
}: OpenCenteredPopupOptions): Window | null {
  if (typeof window === "undefined") {
    return null;
  }

  const margin = 12;
  const maxWidth = Math.max(320, window.outerWidth - margin * 2);
  const maxHeight = Math.max(420, window.outerHeight - margin * 2);
  const popupWidth = Math.min(width, maxWidth);
  const popupHeight = Math.min(height, maxHeight);
  const left = Math.round(window.screenX + (window.outerWidth - popupWidth) / 2);
  const top = Math.round(window.screenY + (window.outerHeight - popupHeight) / 2);

  const features = [
    `width=${popupWidth}`,
    `height=${popupHeight}`,
    `left=${left}`,
    `top=${top}`,
    "resizable=yes",
    "scrollbars=yes",
  ].join(",");

  return window.open(url, name, features);
}

export function isPopupOpen(popup: Window | null | undefined): popup is Window {
  return Boolean(popup && !popup.closed);
}
