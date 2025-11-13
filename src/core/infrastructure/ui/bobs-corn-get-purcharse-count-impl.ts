import type { BobsCornGetPurchaseCountResponseDto } from "@/core/application/bobs-corn-dto";
import { api } from "@/shared/api/client";

export async function bobsCornGetPurchaseCountImpl(clientId: string) {
  const { data, isDone, errorMessage } =
    await api.get<BobsCornGetPurchaseCountResponseDto>(
      `api/bobs-corn/count`,
      clientId,
    );
  if (!data || !isDone) throw new Error(errorMessage);

  return data;
}
