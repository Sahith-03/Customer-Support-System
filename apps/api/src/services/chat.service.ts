import { db } from "@repo/db"
import { conversations } from "@repo/db/schema/conversations"
import { messages } from "@repo/db/schema/messages"
import { eq } from "drizzle-orm"
import { routerAgent } from "../agents/router.agent.js"
import { orderAgent } from "../agents/order.agent.js"
import { billingAgent } from "../agents/billing.agent.js"
import { supportAgent } from "../agents/support.agent.js"


export const chatService = {
  async getOrCreateConversation(conversationId?: string) {
    if (conversationId) {
      return { id: conversationId }
    }

    const [conversation] = await db
      .insert(conversations)
      .values({ userId: "demo-user" })
      .returning()

    return conversation
  },

  async saveMessage({
    conversationId,
    role,
    content,
    agentType,
  }: {
    conversationId: string
    role: "user" | "agent"
    content: string
    agentType?: string
  }) {
    await db.insert(messages).values({
      conversationId,
      role,
      content,
      agentType,
    })
  },

  async getConversationHistory(conversationId: string) {
    return db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt)
  },

  async listConversations() {
    return db.select().from(conversations)
  },

  async deleteConversation(conversationId: string) {
    await db
      .delete(messages)
      .where(eq(messages.conversationId, conversationId))

    await db
      .delete(conversations)
      .where(eq(conversations.id, conversationId))
  },

  // async handleUserMessage({ conversationId, message, }: { conversationId: string, message: string }) {
  //   const routeResult = routerAgent.route(message)

  //   await this.saveMessage({
  //     conversationId,
  //     role: "user",
  //     content: message,
  //   })

  //   let agentResponse = ""

  //   if (routeResult.agent === "order") {
  //     agentResponse = await orderAgent.handle({
  //       userId: "demo-user",
  //       userMessage: message,
  //     })
  //   }

  //   if (routeResult.agent === "billing") {
  //     agentResponse = await billingAgent.handle({
  //       userId: "demo-user",
  //       userMessage: message,
  //     })
  //   }

  //   if (routeResult.agent === "support") {
  //     agentResponse = await supportAgent.handle({
  //       conversationId,
  //       userMessage: message,
  //     })
  //   }
    
  //   await this.saveMessage({
  //     conversationId,
  //     role: "agent",
  //     agentType: routeResult.agent,
  //     content: agentResponse,
  //   })

  //   return {
  //     ...routeResult,
  //     response: agentResponse,
  //   }
  // },

  async streamUserMessage({
  conversationId,
  message,
  stream,
}: {
  conversationId: string
  message: string
  stream: any
}) {
  const routeResult = routerAgent.route(message)

  await this.saveMessage({
    conversationId,
    role: "user",
    content: message,
  })

  await stream.writeSSE({
    data: JSON.stringify({
      type: "status",
      value: `${routeResult.agent} agent is typing...`,
    }),
  })

  let fullResponse = ""

  const onToken = async (token: string) => {
    fullResponse += token
    await stream.writeSSE({
      data: JSON.stringify({
        type: "token",
        value: token,
      }),
    })
  }

  if (routeResult.agent === "order") {
    await orderAgent.stream({
      userId: "demo-user",
      userMessage: message,
      onToken,
    })
  }

  if (routeResult.agent === "billing") {
    await billingAgent.stream({
      userId: "demo-user",
      userMessage: message,
      onToken,
    })
  }

  if (routeResult.agent === "support") {
    await supportAgent.stream({
      conversationId,
      userMessage: message,
      onToken,
    })
  }

  await this.saveMessage({
    conversationId,
    role: "agent",
    agentType: routeResult.agent,
    content: fullResponse,
  })

  await stream.writeSSE({
    data: JSON.stringify({ type: "done" }),
  })
}


}
