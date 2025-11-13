"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bobsCornRepositoryImpl } from "@/core/infrastructure/ui/bobs-corn-repository-impl";
import { usePurchaseCount } from "../hooks/use-purchase-count";
import { useClientId } from "@/shared/hooks/use-client-id";

export function TotalCorn() {
  const repository = bobsCornRepositoryImpl;

  const clientId = useClientId();
  const { purchaseCount, isLoading, error } = usePurchaseCount({
    repository,
    clientId,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground font-medium">
        Cargando...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-32 bg-destructive text-destructive-foreground font-medium rounded-md p-4">
        Ocurrió un error al cargar tus compras.
      </div>
    );

  return (
    <section aria-labelledby="total-corn" className="my-4">
      <Card>
        <CardHeader>
          <CardTitle
            id="total-corn"
            className="text-xs uppercase tracking-widest text-muted-foreground font-medium text-center"
          >
            Total de corn comprado
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-2">
          <div className="flex items-baseline justify-center gap-2">
            <p className="text-4xl sm:text-5xl font-light text-primary">
              {purchaseCount}
            </p>
            <span className="text-2xl">🌽</span>
          </div>
          <p className="text-xs text-muted-foreground">
            granos de corn premium
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
