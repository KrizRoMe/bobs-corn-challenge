import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useClientId } from "@/shared/hooks/use-client-id";
import { useLastPurchases } from "@/core/presentation/hooks/use-last-purchases";
import { RecentPurchases } from "@/core/presentation/components/recent-purchases";
import { bobsCornUiRepositoryMock } from "./mocks/bobs-corn-ui-repository-mock";

jest.mock("@/core/presentation/hooks/use-last-purchases", () => ({
  useLastPurchases: jest.fn(),
}));

jest.mock("@/shared/hooks/use-client-id", () => ({
  useClientId: jest.fn(),
}));

describe("RecentPurchases UI", () => {
  const limit = 5;
  const clientId = "mock-client-id";

  beforeEach(() => {
    (useClientId as jest.Mock).mockReturnValue("mock-client-id");
    jest.clearAllMocks();
  });

  it("should show loading message", () => {
    (useLastPurchases as jest.Mock).mockReturnValue({
      lastPurchases: [],
      isLoading: true,
      error: null,
    });

    render(<RecentPurchases />);
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  it("should show error message", () => {
    (useLastPurchases as jest.Mock).mockReturnValue({
      lastPurchases: [],
      isLoading: false,
      error: new Error("Error"),
    });

    render(<RecentPurchases />);
    expect(
      screen.getByText(/Ocurrió un error al cargar tus compras/i),
    ).toBeInTheDocument();
  });

  it("should render the list of purchases", async () => {
    const mockRepository = bobsCornUiRepositoryMock;
    const getLastPurchasesMock = await mockRepository.getLastPurchases(
      clientId,
      limit,
    );

    (useLastPurchases as jest.Mock).mockReturnValue(getLastPurchasesMock);

    render(<RecentPurchases />);
    expect(screen.getByText(/Últimas compras/i)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });
});
