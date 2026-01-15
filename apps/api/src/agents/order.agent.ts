import { orderTools } from "./tools/order.tools.js"
import { groq } from "../ai/model.js"
import { streamText } from "ai"

export const orderAgent = {
  async stream({
    userId,
    userMessage,
    onToken,
  }: {
    userId: string
    userMessage: string
    onToken: (token: string) => Promise<void>
  }) {
    const order = await orderTools.getLatestOrderForUser(userId)

    const prompt = `
You are a customer support agent.

Order status: ${order?.status}
Tracking number: ${order?.trackingNumber}

User query: "${userMessage}"
`

    const result = await streamText({
      model: groq("llama-3.1-8b-instant"),
      prompt,
    })

    for await (const delta of result.textStream) {
      await onToken(delta)
    }
  },
}
