export const bobsCornUiRepositoryMock = {
  buy: jest
    .fn()
    .mockResolvedValue({ success: true, message: "Compra exitosa" }),
  getLastPurchases: jest.fn().mockResolvedValue({
    lastPurchases: [
      { id: "1", createdAt: "2025-11-12T10:00:00Z" },
      { id: "2", createdAt: "2025-11-12T11:00:00Z" },
      { id: "3", createdAt: "2025-11-12T12:00:00Z" },
      { id: "4", createdAt: "2025-11-12T13:00:00Z" },
      { id: "5", createdAt: "2025-11-12T14:00:00Z" },
    ],
    isLoading: false,
    error: null,
  }),
  getPurchaseCount: jest.fn().mockResolvedValue({
    purchaseCount: 42,
    isLoading: false,
    error: null,
  }),
};
