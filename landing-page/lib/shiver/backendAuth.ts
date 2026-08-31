import { REGISTER_URL } from "@/lib/config";

const backendOrigin = new URL(REGISTER_URL).origin;

type AuthStartResponse = {
  success?: boolean;
  authId?: string;
};

type AuthCompleteResponse = {
  success?: boolean;
  status?: string;
  salaUrl?: string;
};

export function shiverPopupLauncherUrl(loginUrl: string): string {
  // Abre o login oficial direto — o launcher intermediário não ajuda cross-origin.
  return loginUrl;
}

export async function startBackendAuthSession(): Promise<string | null> {
  try {
    const response = await fetch(`${backendOrigin}/api/auth/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      return null;
    }
    const json = (await response.json()) as AuthStartResponse;
    return typeof json.authId === "string" ? json.authId : null;
  } catch {
    return null;
  }
}

export async function completeBackendAuthSession(authId: string | null): Promise<boolean> {
  if (!authId) {
    return false;
  }

  try {
    const response = await fetch(`${backendOrigin}/api/auth/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authId }),
    });
    if (!response.ok) {
      return false;
    }
    const json = (await response.json()) as AuthCompleteResponse;
    return json.success === true && json.status === "VALIDATED";
  } catch {
    return false;
  }
}
