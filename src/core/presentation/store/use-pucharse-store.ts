import { create } from "zustand";

interface PurchaseStore {
  purchaseCount: number;
  setPurchaseCount: (count: number) => void;
}

export const usePurchaseStore = create<PurchaseStore>((set) => ({
  purchaseCount: 0,
  setPurchaseCount: (count) => set({ purchaseCount: count }),
}));
