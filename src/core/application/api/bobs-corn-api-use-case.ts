import type { BobsCornApiRepository } from "@/core/domain/api/bobs-corn-api-repository";
import { validateClientId, validateLimit } from "../bobs-corn-validation";
import { RateLimitError } from "../bobs-corn-errors";
import {
  getRemainingSeconds,
  hasOneMinutePassed,
} from "@/shared/helpers/time-helpers";
import { ONE_MINUTE_MS } from "../bobs-corn-constants";

export const canClientBuyUseCase = async (
  repository: BobsCornApiRepository,
  clientId: string,
): Promise<{ canBuy: boolean; remainingSeconds: number }> => {
  const lastPurchase = await repository.findLastPurchase(clientId);
  if (!lastPurchase) return { canBuy: true, remainingSeconds: 0 };

  if (hasOneMinutePassed(lastPurchase.createdAt, ONE_MINUTE_MS)) {
    return { canBuy: true, remainingSeconds: 0 };
  }

  const remainingSeconds = getRemainingSeconds(
    lastPurchase.createdAt,
    ONE_MINUTE_MS,
  );

  return { canBuy: false, remainingSeconds };
};

export const bobsCornBuyApiUseCase = async (
  repository: BobsCornApiRepository,
  clientId: unknown,
): Promise<void> => {
  const clientIdParsed = validateClientId(clientId);

  const { canBuy, remainingSeconds } = await canClientBuyUseCase(
    repository,
    clientIdParsed,
  );
  if (!canBuy)
    throw new RateLimitError(
      `Demasiadas peticiones, espere ${remainingSeconds} segundos por favor`,
    );

  await repository.buy(clientIdParsed);
};

export const bobsCornGetLastPurchasesApiUseCase = async (
  repository: BobsCornApiRepository,
  clientId: unknown,
  limit: unknown,
): Promise<Array<{ clientId: string; createdAt: Date }>> => {
  const clientIdParsed = validateClientId(clientId);
  const limitParsed = validateLimit(limit);

  return await repository.getLastPurchases(clientIdParsed, limitParsed);
};

export const bobsCornPurchaseCountApiUseCase = async (
  repository: BobsCornApiRepository,
  clientId: unknown,
): Promise<number> => {
  const clientIdParsed = validateClientId(clientId);
  return await repository.getPurchaseCount(clientIdParsed);
};
