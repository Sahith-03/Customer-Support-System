import { db } from "@repo/db"
import { messages } from "@repo/db/schema/messages"
import { eq } from "drizzle-orm"

export const conversationTools = {
  async getRecentMessages(conversationId: string, limit = 5) {
    return db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt)
      .limit(limit)
  },
}
