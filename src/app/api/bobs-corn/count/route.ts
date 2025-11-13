import { bobsCornPurchaseCountApiHandler } from "@/core/application/api/handlers/bobs-corn-purchase-count-api-handler";
import {
  errorResponse,
  successResponse,
} from "@/shared/helpers/response-helpers";

export async function GET(request: Request) {
  const clientId = request.headers.get("x-client-id");

  const { status, payload } = await bobsCornPurchaseCountApiHandler(clientId);

  if (payload.errorMessage) {
    return errorResponse(payload.errorMessage, status);
  }

  return successResponse(payload.data, payload.message, status);
}
