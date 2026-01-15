import { useState } from "react"
import { ChatMessage } from "../types/chat"

export function useChatStream() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)

  async function sendMessage(message: string) {
    setMessages((prev) => [...prev, { role: "user", content: message }])
    setIsTyping(true)

    const response = await fetch("http://localhost:3000/api/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
    console.log(message,response)

    if (!response.body) return

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    let buffer = ""
    let agentMessage = ""

    // placeholder agent message
    setMessages((prev) => [...prev, { role: "agent", content: "" }])

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      // SSE messages end with double newline
      const parts = buffer.split("\n\n")
      buffer = parts.pop() || ""

      for (const part of parts) {
        if (!part.startsWith("data:")) continue

        const json = part.replace("data:", "").trim()
        const payload = JSON.parse(json)

        if (payload.type === "status") {
          setIsTyping(true)
        }

        if (payload.type === "token") {
          agentMessage += payload.value

          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              role: "agent",
              content: agentMessage,
            }
            return updated
          })
        }

        if (payload.type === "done") {
          setIsTyping(false)
        }
      }
    }
  }

  return { messages, isTyping, sendMessage }
}
