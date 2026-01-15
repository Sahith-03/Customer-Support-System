import { db } from "./index"
import { conversations } from "./schema/conversations"
import { orders } from "./schema/orders"
import { payments } from "./schema/payments"
import { Pool } from "pg"

async function seed() {
  try {
    console.log("Starting seed...")

    const [conversation] = await db
      .insert(conversations)
      .values({ userId: "demo-user" })
      .returning()

    console.log("Created conversation:", conversation.id)

    const [order] = await db
      .insert(orders)
      .values({
        userId: "demo-user",
        status: "shipped",
        trackingNumber: "TRK123",
      })
      .returning()

    console.log("Created order:", order.id)

    await db.insert(payments).values({
      orderId: order.id,
      amount: "1999",
      status: "paid",
      invoiceUrl: "/invoice/123",
      refundStatus: "none",
    })

    console.log("Created payment")
    console.log("Seed complete!")
    process.exit(0)
  } catch (error) {
    console.error("Seed failed:", error)
    process.exit(1)
  }
}

seed()
