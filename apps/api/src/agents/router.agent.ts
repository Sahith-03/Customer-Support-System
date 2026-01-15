import { RouterResult } from "./types.js"

export const routerAgent = {
  route(message: string): RouterResult {
    const text = message.toLowerCase()

    if (
      text.includes("order") ||
      text.includes("delivery") ||
      text.includes("tracking")
    ) {
      return {
        agent: "order",
        reason: "Order related keywords detected",
      }
    }

    if (
      text.includes("payment") ||
      text.includes("refund") ||
      text.includes("invoice") ||
      text.includes("billing")
    ) {
      return {
        agent: "billing",
        reason: "Billing related keywords detected",
      }
    }

    return {
      agent: "support",
      reason: "Defaulting to general support",
    }
  },
}
