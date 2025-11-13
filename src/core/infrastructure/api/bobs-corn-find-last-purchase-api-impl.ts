import type { Purchase } from "@prisma/client";
import { db } from "@prisma/lib/db";

export async function bobsCornFindLastPurchaseApiImpl(
  clientId: string,
): Promise<Purchase | null> {
  const lastPurchase = await db.purchase.findFirst({
    where: {
      clientId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return lastPurchase;
}
