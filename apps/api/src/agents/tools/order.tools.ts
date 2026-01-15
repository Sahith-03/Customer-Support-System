import { db } from "@repo/db"
import { orders } from "@repo/db/schema/orders"
import { eq } from "drizzle-orm"

export const orderTools = {
  async getLatestOrderForUser(userId: string) {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .limit(1)

    return result[0] ?? null
  },
}
