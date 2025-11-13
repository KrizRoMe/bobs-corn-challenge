export type BobsCornPurchaseDto = {
  id: string;
  clientId: string;
  createdAt: Date;
};

export type BobsCornGetLastPurchasesResponseDto = {
  payload: BobsCornPurchaseDto[];
  message: string;
  success: boolean;
};

export type BobsCornGetPurchaseCountResponseDto = {
  payload: number;
  message: string;
  success: boolean;
};

export type BobsCornBuyResponseDto = {
  payload: null;
  message: string;
  success: boolean;
};

export type BobsCornBuyPayloadDto = {
  purchases: {
    clientId: string;
    createdAt: Date;
  }[];
  totalPurchased: number;
};

export type BobsCornLastPurcharsesResponseDto = {
  payload: Array<{ clientId: string; createdAt: Date }>;
  message: string;
  success: boolean;
};
