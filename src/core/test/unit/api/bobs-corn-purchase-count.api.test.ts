import { bobsCornPurchaseCountApiHandler } from "@/core/application/api/handlers/bobs-corn-purchase-count-api-handler";
import { bobsCornPurchaseCountApiUseCase } from "@/core/application/api/bobs-corn-api-use-case";
import { bobsCornApiRepositoryMock } from "./mocks/bobs-corn-api-repository-mock";

jest.mock("@/core/infrastructure/api/bobs-corn-api-repository-impl", () => ({
  bobsCornApiRepositoryImpl: {},
}));

jest.mock("@/core/application/api/bobs-corn-api-use-case", () => ({
  bobsCornPurchaseCountApiUseCase: jest.fn(),
}));

describe("bobsCornPurchaseCountApiHandler", () => {
  const clientId = "test-client-id";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return success with the purchase count", async () => {
    const mockRepository = bobsCornApiRepositoryMock;
    const purchaseCountMock = await mockRepository.getPurchaseCount(clientId);

    const mockUseCase = bobsCornPurchaseCountApiUseCase as jest.Mock;

    mockUseCase.mockResolvedValue(purchaseCountMock);

    const result = await bobsCornPurchaseCountApiHandler(clientId);

    expect(result.status).toBe(200);
    expect(result.payload.data).toBe(7);
    expect(result.payload.message).toBe("");
  });

  it("should return 500 if the use case throws an error", async () => {
    const mockUseCase = bobsCornPurchaseCountApiUseCase as jest.Mock;
    mockUseCase.mockRejectedValue(new Error("Unexpected error"));

    const result = await bobsCornPurchaseCountApiHandler(clientId);

    expect(result.status).toBe(500);
    expect(result.payload.errorMessage).toBe("Error interno del servidor");
  });
});
