import { streamText } from "ai"
import { groq } from "../ai/model.js"
import { conversationTools } from "./tools/conversation.tools.js"

export const supportAgent = {
  async stream({
    conversationId,
    userMessage,
    onToken,
  }: {
    conversationId: string
    userMessage: string
    onToken: (token: string) => Promise<void>
  }) {
    const history =
      await conversationTools.getRecentMessages(conversationId)

    const context = history
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n")

    const result = await streamText({
      model: groq("llama-3.1-8b-instant"),
      prompt: `
You are a helpful customer support agent.

Conversation so far:
${context}

User message:
"${userMessage}"
`,
    })

    for await (const delta of result.textStream) {
      await onToken(delta)
    }
  },
}
