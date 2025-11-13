import { db } from "@prisma/lib/db";

export async function bobsCornGetPurcharseCountApiImpl(
  clientId: string,
): Promise<number> {
  const totalPurchased = await db.purchase.count({
    where: {
      clientId,
    },
  });

  return totalPurchased;
}
