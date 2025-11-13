import type { BobsCornApiRepository } from "@/core/domain/api/bobs-corn-api-repository";
import { bobsCornGetPurcharseCountApiImpl } from "./bobs-corn-get-purchase-count-api-impl";
import { bobsCornBuyApiImpl } from "./bobs-corn-buy-api-impl";
import { bobsCornFindLastPurchaseApiImpl } from "./bobs-corn-find-last-purchase-api-impl";
import { bobsCornGetLastPurchasesApiImpl } from "./bobs-corn-get-last-purchases-api-impl";

export const bobsCornApiRepositoryImpl: BobsCornApiRepository = {
  buy: bobsCornBuyApiImpl,
  findLastPurchase: bobsCornFindLastPurchaseApiImpl,
  getLastPurchases: bobsCornGetLastPurchasesApiImpl,
  getPurchaseCount: bobsCornGetPurcharseCountApiImpl,
};
