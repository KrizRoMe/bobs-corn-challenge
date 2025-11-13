import { db } from "@prisma/lib/db";

export async function bobsCornBuyApiImpl(clientId: string): Promise<void> {
  await db.purchase.create({
    data: {
      clientId,
    },
  });
}
