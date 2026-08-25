"use client";

import { useState } from "react";
import { INITIAL_CHAT_MESSAGES, type ChatStatus } from "@/lib/sala";

export function useSalaChat() {
  const [messages] = useState(INITIAL_CHAT_MESSAGES);
  const [status] = useState<ChatStatus>("preview");

  return { messages, status };
}
