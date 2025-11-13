import { bobsCornPurchaseCountApiUseCase } from "../bobs-corn-api-use-case";
import { bobsCornApiRepositoryImpl } from "@/core/infrastructure/api/bobs-corn-api-repository-impl";

export async function bobsCornPurchaseCountApiHandler(clientId: unknown) {
  try {
    const purchaseCount = await bobsCornPurchaseCountApiUseCase(
      bobsCornApiRepositoryImpl,
      clientId,
    );

    return {
      status: 200,
      payload: { data: purchaseCount, message: "" },
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
