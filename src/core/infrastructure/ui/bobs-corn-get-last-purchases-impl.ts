import type { BobsCornGetLastPurchasesResponseDto } from "@/core/application/bobs-corn-dto";
import { api } from "@/shared/api/client";

export async function bobsCornGetLastPurchasesImpl(
  clientId: string,
  limit: number,
) {
  const { data, isDone, errorMessage } =
    await api.get<BobsCornGetLastPurchasesResponseDto>(
      `api/bobs-corn/last-purchases?limit=${limit}`,
      clientId,
    );
  if (!data || !isDone) throw new Error(errorMessage);

  return data;
}
