import { pgTable, uuid, text, numeric } from "drizzle-orm/pg-core"
import { orders } from "./orders"

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .references(() => orders.id)
    .notNull(),
  amount: numeric("amount").notNull(),
  status: text("status").notNull(),
  invoiceUrl: text("invoice_url"),
  refundStatus: text("refund_status"),
})
