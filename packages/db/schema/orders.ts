import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  status: text("status").notNull(),
  trackingNumber: text("tracking_number"),
  deliveryDate: timestamp("delivery_date"),
})
