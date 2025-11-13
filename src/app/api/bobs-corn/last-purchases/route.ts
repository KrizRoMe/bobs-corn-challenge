import { bobsCornGetLastPurchasesApiHandler } from "@/core/application/api/handlers/bobs-corn-get-last-purchases-api-handler";
import {
  errorResponse,
  successResponse,
} from "@/shared/helpers/response-helpers";

const DEFAULT_LIMIT = 5;

export async function GET(request: Request) {
  const clientId = request.headers.get("x-client-id");

  const url = new URL(request.url);
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : DEFAULT_LIMIT;

  const { status, payload } = await bobsCornGetLastPurchasesApiHandler(
    clientId,
    limit,
  );

  if (payload.errorMessage) {
    return errorResponse(payload.errorMessage, status);
  }

  return successResponse(payload.data, payload.message, status);
}
