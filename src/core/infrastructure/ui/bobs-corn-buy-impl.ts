import type { BobsCornBuyResponseDto } from "@/core/application/bobs-corn-dto";
import { api } from "@/shared/api/client";

export async function bobsCornBuyImpl(clientId: string) {
  const { data, isDone, errorMessage } = await api.post<BobsCornBuyResponseDto>(
    `api/bobs-corn/buy`,
    null,
    clientId,
  );
  if (!data || !isDone) throw new Error(errorMessage);

  return data;
}
