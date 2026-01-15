import { streamSSE } from "hono/streaming"
import { chatService } from "../services/chat.service.js"
import { Context } from "hono"

export const sendMessageController = async (c: Context) => {
  return c.json(
    {
      error:
        "This endpoint is deprecated. Use /api/chat/stream for streaming responses.",
    },
    400
  )
}

export const streamMessageController = async (c: Context) => {
  const { conversationId, message } = await c.req.json()

  if (!message) {
    return c.json({ error: "Message is required" }, 400)
  }

  const conversation =
    await chatService.getOrCreateConversation(conversationId)

  return streamSSE(c, async (stream) => {
    await chatService.streamUserMessage({
      conversationId: conversation.id,
      message,
      stream,
    })
  })
}

export const getConversationController = async (c: Context) => {
  const conversationId = c.req.param("id")
  const messages =
    await chatService.getConversationHistory(conversationId)

  return c.json(messages)
}

export const listConversationsController = async () => {
  const conversations = await chatService.listConversations()
  return Response.json(conversations)
}

export const deleteConversationController = async (c: Context) => {
  const conversationId = c.req.param("id")
  await chatService.deleteConversation(conversationId)

  return c.json({ status: "deleted" })
}
