import { bobsCornGetLastPurchasesApiUseCase } from "@/core/application/api/bobs-corn-api-use-case";
import { bobsCornGetLastPurchasesApiHandler } from "@/core/application/api/handlers/bobs-corn-get-last-purchases-api-handler";
import { bobsCornApiRepositoryMock } from "./mocks/bobs-corn-api-repository-mock";

jest.mock("@/core/infrastructure/api/bobs-corn-api-repository-impl", () => ({
  bobsCornApiRepositoryImpl: {},
}));

jest.mock("@/core/application/api/bobs-corn-api-use-case", () => ({
  bobsCornGetLastPurchasesApiUseCase: jest.fn(),
}));

describe("bobsCornGetLastPurchasesApiHandler", () => {
  const clientId = "test-client-id";
  const limit = 5;

  it("should return a success response with purchases", async () => {
    const mockRepository = bobsCornApiRepositoryMock;
    const getLastPurchasesMock = await mockRepository.getLastPurchases(
      clientId,
      limit,
    );

    const mockUseCase = bobsCornGetLastPurchasesApiUseCase as jest.Mock;
    mockUseCase.mockResolvedValue(getLastPurchasesMock);

    const result = await bobsCornGetLastPurchasesApiHandler(clientId, limit);

    expect(result.status).toBe(200);
    expect(result.payload.data).toHaveLength(5);
    expect(result.payload.message).toBeDefined();
  });

  it("should return error if use case throws an error", async () => {
    const mockUseCase = bobsCornGetLastPurchasesApiUseCase as jest.Mock;

    mockUseCase.mockRejectedValue(new Error("Repository failed"));

    const result = await bobsCornGetLastPurchasesApiHandler(clientId, limit);

    expect(result.status).toBe(500);
    expect(result.payload.errorMessage).toBeDefined();
  });
});
