"use client";

import { bobsCornGetPurchaseCountUseCase } from "@/core/application/ui/bobs-corn-use-case";
import type { BobsCornRepository } from "@/core/domain/ui/bobs-corn-repository";
import { useCallback, useEffect, useState } from "react";
import { usePurchaseStore } from "../store/use-pucharse-store";

interface UsePurchaseCountProps {
  repository: BobsCornRepository;
  clientId: string | null;
}

export function usePurchaseCount({
  repository,
  clientId,
}: UsePurchaseCountProps) {
  const { purchaseCount, setPurchaseCount } = usePurchaseStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!clientId) return;

    setIsLoading(true);
    setError(null);

    try {
      const purchaseCount = await bobsCornGetPurchaseCountUseCase(
        repository,
        clientId,
      );
      setPurchaseCount(purchaseCount.payload);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [repository, clientId, setPurchaseCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { purchaseCount, isLoading, error, refetch: fetchData };
}
