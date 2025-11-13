import type { BobsCornPurchaseDto } from "@/core/application/bobs-corn-dto";
import { db } from "@prisma/lib/db";

export async function bobsCornGetLastPurchasesApiImpl(
  clientId: string,
  limit: number,
): Promise<BobsCornPurchaseDto[]> {
  const purchaseList = await db.purchase.findMany({
    where: {
      clientId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  return purchaseList;
}
