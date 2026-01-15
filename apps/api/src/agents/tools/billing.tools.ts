import { db } from "@repo/db"
import { payments } from "@repo/db/schema/payments"
import { orders } from "@repo/db/schema/orders"
import { eq } from "drizzle-orm"

export const billingTools = {
  async getLatestPaymentForUser(userId: string) {
    const result = await db
      .select({
        amount: payments.amount,
        status: payments.status,
        invoiceUrl: payments.invoiceUrl,
        refundStatus: payments.refundStatus,
      })
      .from(payments)
      .innerJoin(orders, eq(payments.orderId, orders.id))
      .where(eq(orders.userId, userId))
      .limit(1)

    return result[0] ?? null
  },
}
