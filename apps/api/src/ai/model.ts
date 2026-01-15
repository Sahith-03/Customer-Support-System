import { config } from "dotenv"
import { resolve } from "path"
import { createOpenAI } from "@ai-sdk/openai"

config({ path: resolve(process.cwd(), "../../.env") })

export const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
})
