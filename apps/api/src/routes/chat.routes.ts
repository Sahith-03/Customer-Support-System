import { Hono } from "hono"
import {
  sendMessageController,
  streamMessageController,
  getConversationController,
  listConversationsController,
  deleteConversationController,
} from "../controllers/chat.controller.js"

const chatRoutes = new Hono()

chatRoutes.post("/messages", sendMessageController)
chatRoutes.post("/stream", streamMessageController)

chatRoutes.get("/conversations", listConversationsController)
chatRoutes.get("/conversations/:id", getConversationController)
chatRoutes.delete("/conversations/:id", deleteConversationController)

export default chatRoutes
