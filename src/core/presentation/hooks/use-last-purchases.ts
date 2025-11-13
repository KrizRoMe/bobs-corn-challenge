"use client";

import { bobsCornGetLastPurchasesUseCase } from "@/core/application/ui/bobs-corn-use-case";
import type { BobsCornRepository } from "@/core/domain/ui/bobs-corn-repository";
import { useCallback, useEffect, useState } from "react";
import { useLastPurchaseStore } from "../store/use-last-purchases-store";

interface UseLastPurchasesProps {
  repository: BobsCornRepository;
  clientId: string | null;
  limit: number;
}

export function useLastPurchases({
  repository,
  clientId,
  limit,
}: UseLastPurchasesProps) {
  const { lastPurchases, setLastPurchases } = useLastPurchaseStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!clientId) return;

    setIsLoading(true);
    setError(null);

    try {
      const purchases = await bobsCornGetLastPurchasesUseCase(
        repository,
        clientId,
        limit,
      );
      setLastPurchases(purchases.payload);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [repository, clientId, limit, setLastPurchases]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { lastPurchases, isLoading, error, refetch: fetchData };
}
