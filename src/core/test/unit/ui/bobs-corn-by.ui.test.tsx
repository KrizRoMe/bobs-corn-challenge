import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Purchase } from "@/core/presentation/components/purchase";
import { useBuy } from "@/core/presentation/hooks/use-buy";
import { useClientId } from "@/shared/hooks/use-client-id";
import { useLastPurchases } from "@/core/presentation/hooks/use-last-purchases";
import { usePurchaseCount } from "@/core/presentation/hooks/use-purchase-count";
import { toast } from "sonner";

// 🔧 Mocks
jest.mock("@/core/presentation/hooks/use-buy", () => ({
  useBuy: jest.fn(),
}));

jest.mock("@/core/presentation/hooks/use-last-purchases", () => ({
  useLastPurchases: jest.fn(),
}));

jest.mock("@/core/presentation/hooks/use-purchase-count", () => ({
  usePurchaseCount: jest.fn(),
}));

jest.mock("@/shared/hooks/use-client-id", () => ({
  useClientId: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Purchase UI", () => {
  const mockBuy = jest.fn();
  const mockRefetchLastPurchases = jest.fn();
  const mockRefetchPurchaseCount = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useClientId as jest.Mock).mockReturnValue("mock-client-id");
    (useBuy as jest.Mock).mockReturnValue({
      buy: mockBuy,
      isLoading: false,
    });
    (useLastPurchases as jest.Mock).mockReturnValue({
      refetch: mockRefetchLastPurchases,
    });
    (usePurchaseCount as jest.Mock).mockReturnValue({
      refetch: mockRefetchPurchaseCount,
    });
  });

  it("renders the purchase button", () => {
    render(<Purchase />);
    expect(
      screen.getByRole("button", { name: /comprar corn/i }),
    ).toBeInTheDocument();
  });

  it("shows 'Comprando...' when loading", () => {
    (useBuy as jest.Mock).mockReturnValue({
      buy: mockBuy,
      isLoading: true,
    });

    render(<Purchase />);
    expect(screen.getByText(/comprando.../i)).toBeInTheDocument();
  });

  it("calls buy() and shows success toast", async () => {
    mockBuy.mockResolvedValueOnce({ success: true, message: "Compra exitosa" });

    render(<Purchase />);
    const button = screen.getByRole("button", { name: /comprar corn/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockBuy).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Compra exitosa");
      expect(mockRefetchLastPurchases).toHaveBeenCalled();
      expect(mockRefetchPurchaseCount).toHaveBeenCalled();
    });
  });

  it("shows error toast if buy fails due to rate limit (429)", async () => {
    const remainingSeconds = 60;
    mockBuy.mockResolvedValueOnce({
      success: false,
      message: `Demasiadas peticiones, espere ${remainingSeconds} segundos por favor`,
    });

    render(<Purchase />);
    const button = screen.getByRole("button", { name: /comprar corn/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockBuy).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        `Demasiadas peticiones, espere ${remainingSeconds} segundos por favor`,
      );
    });
  });
});
