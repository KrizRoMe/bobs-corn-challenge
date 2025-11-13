import { bobsCornGetLastPurchasesApiUseCase } from "../bobs-corn-api-use-case";
import { bobsCornApiRepositoryImpl } from "@/core/infrastructure/api/bobs-corn-api-repository-impl";

export async function bobsCornGetLastPurchasesApiHandler(
  clientId: unknown,
  limit: unknown,
) {
  try {
    const lastPurchases = await bobsCornGetLastPurchasesApiUseCase(
      bobsCornApiRepositoryImpl,
      clientId,
      limit,
    );

    return {
      status: 200,
      payload: { data: lastPurchases, message: "" },
    };
  } catch (_error) {
    return {
      status: 500,
      payload: {
        errorMessage: "Error interno del servidor",
      },
    };
  }
}
