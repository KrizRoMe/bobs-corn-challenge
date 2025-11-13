import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TotalCorn } from "@/core/presentation/components/total-corn";
import { usePurchaseCount } from "@/core/presentation/hooks/use-purchase-count";
import { useClientId } from "@/shared/hooks/use-client-id";
import { bobsCornUiRepositoryMock } from "./mocks/bobs-corn-ui-repository-mock";

// 🔧 Mocks
jest.mock("@/core/presentation/hooks/use-purchase-count", () => ({
  usePurchaseCount: jest.fn(),
}));

jest.mock("@/shared/hooks/use-client-id", () => ({
  useClientId: jest.fn(),
}));

describe("TotalCorn UI", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useClientId as jest.Mock).mockReturnValue("mock-client-id");
  });

  it("renders loading state", () => {
    (usePurchaseCount as jest.Mock).mockReturnValue({
      purchaseCount: 0,
      isLoading: true,
      error: null,
    });

    render(<TotalCorn />);
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    (usePurchaseCount as jest.Mock).mockReturnValue({
      purchaseCount: 0,
      isLoading: false,
      error: new Error("Error"),
    });

    render(<TotalCorn />);
    expect(
      screen.getByText(/Ocurrió un error al cargar tus compras/i),
    ).toBeInTheDocument();
  });

  it("renders purchase count successfully", async () => {
    const mockRepository = bobsCornUiRepositoryMock;
    const getPurchaseCountMock =
      await mockRepository.getPurchaseCount("mock-client-id");

    (usePurchaseCount as jest.Mock).mockReturnValue(getPurchaseCountMock);

    render(<TotalCorn />);
    expect(screen.getByText(/Total de corn comprado/i)).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText(/granos de corn premium/i)).toBeInTheDocument();
  });
});
