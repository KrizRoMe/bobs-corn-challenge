"use client";

import { bobsCornRepositoryImpl } from "@/core/infrastructure/ui/bobs-corn-repository-impl";
import { useLastPurchases } from "../hooks/use-last-purchases";
import { Check } from "lucide-react";
import { formatTime } from "@/shared/helpers/date-helpers";
import { useClientId } from "@/shared/hooks/use-client-id";

export function RecentPurchases() {
  const repository = bobsCornRepositoryImpl;

  const clientId = useClientId();
  const { lastPurchases, isLoading, error } = useLastPurchases({
    repository,
    clientId,
    limit: 5,
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

  if (!lastPurchases || lastPurchases.length === 0)
    return (
      <div className="flex items-center justify-center h-32 bg-muted text-muted-foreground font-medium rounded-md p-4">
        Aún no has comprado nada.
      </div>
    );

  return (
    <section aria-labelledby="recent-purchases" className="pt-4 space-y-3">
      <h4
        id="recent-purchases"
        className="text-xs uppercase tracking-widest text-muted-foreground font-medium"
      >
        Últimas compras
      </h4>
      <ul className="space-y-2 text-sm sm:text-base">
        {lastPurchases.map((purchase) => (
          <li
            key={purchase.id}
            className="flex items-center justify-between p-2 rounded bg-muted/40 text-xs"
          >
            <span className="text-muted-foreground">
              {formatTime(purchase.createdAt)}
            </span>
            <Check className="w-3 h-3 text-primary" />
          </li>
        ))}
      </ul>
    </section>
  );
}
