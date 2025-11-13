import { bobsCornBuyApiUseCase } from "../bobs-corn-api-use-case";
import { RateLimitError } from "../../bobs-corn-errors";
import { bobsCornApiRepositoryImpl } from "@/core/infrastructure/api/bobs-corn-api-repository-impl";

export async function bobsCornBuyApiHandler(clientId: unknown) {
  try {
    await bobsCornBuyApiUseCase(bobsCornApiRepositoryImpl, clientId);

    return {
      status: 200,
      payload: { data: null, message: "🌽 Compra exitosa" },
    };
  } catch (error) {
    if (error instanceof RateLimitError) {
      return {
        status: error.statusCode,
        payload: {
          errorMessage: error.message,
        },
      };
    }

    return {
      status: 500,
      payload: {
        errorMessage: "Error interno del servidor",
      },
    };
  }
}
