"use client";

import { useState, useEffect } from "react";

export function useClientId() {
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    let id = getCookie("clientId");
    if (!id) {
      id = crypto.randomUUID();
      document.cookie = `clientId=${id}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }
    setClientId(id);
  }, []);

  return clientId;
}

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}
