"use client";

import { bobsCornBuyUseCase } from "@/core/application/ui/bobs-corn-use-case";
import type { BobsCornRepository } from "@/core/domain/ui/bobs-corn-repository";
import { useCallback, useState } from "react";

interface UseBuyProps {
  repository: BobsCornRepository;
  clientId: string | null;
}

export function useBuy({ repository, clientId }: UseBuyProps) {
  const [isLoading, setIsLoading] = useState(false);

  const buy = useCallback(async () => {
    if (!clientId) return;

    setIsLoading(true);

    try {
      const response = await bobsCornBuyUseCase(repository, clientId);
      return { success: true, message: response.message };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
      return { success: false, message: "Ocurrió un error inesperado" };
    } finally {
      setIsLoading(false);
    }
  }, [repository, clientId]);

  return { buy, isLoading };
}
