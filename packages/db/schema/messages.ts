import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { conversations } from "./conversations"

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .references(() => conversations.id)
    .notNull(),
  role: text("role").notNull(),       // user | agent
  agentType: text("agent_type"),      // router | support | order | billing
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})
