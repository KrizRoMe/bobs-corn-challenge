import { bobsCornBuyApiHandler } from "@/core/application/api/handlers/bobs-corn-buy-api-handler";
import {
  errorResponse,
  successResponse,
} from "@/shared/helpers/response-helpers";

export async function POST(request: Request) {
  const clientId = request.headers.get("x-client-id");

  const { status, payload } = await bobsCornBuyApiHandler(clientId);

  if (payload.errorMessage) {
    return errorResponse(payload.errorMessage, status);
  }

  return successResponse(payload.data, payload.message, status);
}
