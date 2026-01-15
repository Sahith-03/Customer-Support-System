import { config } from "dotenv"
import { resolve } from "path"
import chatRoutes from "./routes/chat.routes.js"

// Load .env from root directory
config({ path: resolve(process.cwd(), "../../.env") })

import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"

const app = new Hono()

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
)

app.get("/api/health", (c) => {
  return c.json({ status: "ok" })
})

app.route("/api/chat", chatRoutes)

const port = Number(process.env.PORT) || 3000

console.log(`Server is running on http://localhost:${port}`)
console.log(`DATABASE_URL loaded: ${process.env.DATABASE_URL ? "Yes" : "No"}`)

serve({
  fetch: app.fetch,
  port,
})
