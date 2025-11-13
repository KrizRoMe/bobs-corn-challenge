import type { BobsCornRepository } from "@/core/domain/ui/bobs-corn-repository";
import { validateClientId, validateLimit } from "../bobs-corn-validation";

export const bobsCornGetLastPurchasesUseCase = async (
  repository: BobsCornRepository,
  clientId: unknown,
  limit: unknown,
) => {
  const clientIdParsed = validateClientId(clientId);
  const limitParsed = validateLimit(limit);

  return await repository.getLastPurchases(clientIdParsed, limitParsed);
};

export const bobsCornGetPurchaseCountUseCase = async (
  repository: BobsCornRepository,
  clientId: unknown,
) => {
  const clientIdParsed = validateClientId(clientId);
  return await repository.getPurchaseCount(clientIdParsed);
};

export const bobsCornBuyUseCase = async (
  repository: BobsCornRepository,
  clientId: unknown,
) => {
  const clientIdParsed = validateClientId(clientId);
  return await repository.buy(clientIdParsed);
};
