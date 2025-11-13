import type { BobsCornApiRepository } from "@/core/domain/api/bobs-corn-api-repository";

export const bobsCornApiRepositoryMock: BobsCornApiRepository = {
  buy: jest.fn().mockResolvedValue(undefined),
  findLastPurchase: jest.fn().mockResolvedValue(null),
  getLastPurchases: jest.fn().mockResolvedValue([
    { id: "1", clientId: "test-client-id", createdAt: new Date() },
    { id: "2", clientId: "test-client-id", createdAt: new Date() },
    { id: "3", clientId: "test-client-id", createdAt: new Date() },
    { id: "4", clientId: "test-client-id", createdAt: new Date() },
    { id: "5", clientId: "test-client-id", createdAt: new Date() },
  ]),
  getPurchaseCount: jest.fn().mockResolvedValue(7),
};
