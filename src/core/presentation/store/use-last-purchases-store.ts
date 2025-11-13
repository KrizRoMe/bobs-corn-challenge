import type { TBobsCornPurchase } from "@/core/domain/bobs-corn-types";
import { create } from "zustand";

interface LastPurchaseStore {
  lastPurchases: TBobsCornPurchase[];
  setLastPurchases: (purchases: TBobsCornPurchase[]) => void;
}

export const useLastPurchaseStore = create<LastPurchaseStore>((set) => ({
  lastPurchases: [],
  setLastPurchases: (purchases) => set({ lastPurchases: purchases }),
}));
