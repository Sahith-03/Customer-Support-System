import { billingTools } from "./tools/billing.tools.js"
import { groq } from "../ai/model.js"
import { streamText } from "ai"

export const billingAgent = {
  async stream({
    userId,
    userMessage,
    onToken,
  }: {
    userId: string
    userMessage: string
    onToken: (token: string) => Promise<void>
  }) {
    const payment = await billingTools.getLatestPaymentForUser(userId)

    const prompt = `
You are a billing support agent.

Payment status: ${payment?.status}
Amount: ${payment?.amount}
Refund status: ${payment?.refundStatus}

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