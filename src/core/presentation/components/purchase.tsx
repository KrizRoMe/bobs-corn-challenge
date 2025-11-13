"use client";

import { Button } from "@/components/ui/button";
import { bobsCornRepositoryImpl } from "@/core/infrastructure/ui/bobs-corn-repository-impl";
import { useClientId } from "@/shared/hooks/use-client-id";
import { useBuy } from "../hooks/use-buy";
import { toast } from "sonner";
import { useLastPurchases } from "../hooks/use-last-purchases";
import { usePurchaseCount } from "../hooks/use-purchase-count";

export function Purchase() {
  const repository = bobsCornRepositoryImpl;

  const clientId = useClientId();
  const { buy, isLoading } = useBuy({
    repository,
    clientId,
  });
  const { refetch: refetchLastPurchases } = useLastPurchases({
    repository,
    clientId,
    limit: 5,
  });
  const { refetch: refetchPurchaseCount } = usePurchaseCount({
    repository,
    clientId,
  });

  const handleClick = async () => {
    const result = await buy();

    if (!result?.success) {
      toast.error(result?.message);

      return;
    }

    toast.success(result?.message);

    refetchLastPurchases();
    refetchPurchaseCount();
  };

  return (
    <section aria-labelledby="purchase-section">
      <Button
        onClick={handleClick}
        variant="default"
        className="w-full h-12 text-base font-medium"
        disabled={isLoading}
      >
        {isLoading ? "Comprando..." : "Comprar Corn"}
      </Button>
    </section>
  );
}
