import type { BobsCornRepository } from "@/core/domain/ui/bobs-corn-repository";
import { bobsCornGetLastPurchasesImpl } from "./bobs-corn-get-last-purchases-impl";
import { bobsCornGetPurchaseCountImpl } from "./bobs-corn-get-purcharse-count-impl";
import { bobsCornBuyImpl } from "./bobs-corn-buy-impl";

export const bobsCornRepositoryImpl: BobsCornRepository = {
  getLastPurchases: bobsCornGetLastPurchasesImpl,
  getPurchaseCount: bobsCornGetPurchaseCountImpl,
  buy: bobsCornBuyImpl,
};
