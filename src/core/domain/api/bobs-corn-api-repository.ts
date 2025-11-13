import type { BobsCornPurchaseDto } from "@/core/application/bobs-corn-dto";
import type { Purchase } from "@prisma/client";

export type BobsCornApiRepository = {
  buy: (clientId: string) => Promise<void>;
  findLastPurchase: (clientId: string) => Promise<Purchase | null>;
  getLastPurchases: (
    clientId: string,
    limit: number,
  ) => Promise<BobsCornPurchaseDto[]>;
  getPurchaseCount: (clientId: string) => Promise<number>;
};
