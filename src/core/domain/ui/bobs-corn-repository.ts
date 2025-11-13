import type {
  BobsCornBuyResponseDto,
  BobsCornGetLastPurchasesResponseDto,
  BobsCornGetPurchaseCountResponseDto,
} from "@/core/application/bobs-corn-dto";

export type BobsCornRepository = {
  getLastPurchases: (
    clientId: string,
    limit: number,
  ) => Promise<BobsCornGetLastPurchasesResponseDto>;
  getPurchaseCount: (
    clientId: string,
  ) => Promise<BobsCornGetPurchaseCountResponseDto>;
  buy: (clientId: string) => Promise<BobsCornBuyResponseDto>;
};
