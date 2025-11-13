import { bobsCornBuyApiHandler } from "@/core/application/api/handlers/bobs-corn-buy-api-handler";
import { RateLimitError } from "@/core/application/bobs-corn-errors";
import { bobsCornBuyApiUseCase } from "@/core/application/api/bobs-corn-api-use-case";
import { bobsCornApiRepositoryMock } from "./mocks/bobs-corn-api-repository-mock";

jest.mock("@/core/infrastructure/api/bobs-corn-api-repository-impl", () => ({
  bobsCornApiRepositoryImpl: {},
}));

jest.mock("@/core/application/api/bobs-corn-api-use-case", () => ({
  bobsCornBuyApiUseCase: jest.fn(),
}));

describe("bobsCornBuyApiHandler", () => {
  const clientId = "test-client-id";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return success when buy is successful", async () => {
    const mockRepository = bobsCornApiRepositoryMock;
    const buyMock = await mockRepository.buy(clientId);

    const mockUseCase = bobsCornBuyApiUseCase as jest.Mock;
    mockUseCase.mockResolvedValue(buyMock);

    const result = await bobsCornBuyApiHandler(clientId);

    expect(result.status).toBe(200);
    expect(result.payload.data).toBeNull();
    expect(result.payload.message).toBe("🌽 Compra exitosa");
  });

  it("should return rate limit error when RateLimitError is thrown", async () => {
    const mockUseCase = bobsCornBuyApiUseCase as jest.Mock;
    mockUseCase.mockRejectedValue(new RateLimitError("Demasiadas peticiones"));

    const result = await bobsCornBuyApiHandler(clientId);

    expect(result.status).toBe(429);
    expect(result.payload.errorMessage).toBe("Demasiadas peticiones");
  });

  it("should return 500 error when unknown error is thrown", async () => {
    const mockUseCase = bobsCornBuyApiUseCase as jest.Mock;
    mockUseCase.mockRejectedValue(new Error("Unexpected"));

    const result = await bobsCornBuyApiHandler(clientId);

    expect(result.status).toBe(500);
    expect(result.payload.errorMessage).toBe("Error interno del servidor");
  });
});
