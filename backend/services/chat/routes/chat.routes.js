import express from "express"
import { createConversation, getConversations, getMessages, saveMessage, updateConversation } from "../Controllers/chat.controllers.js"

const router = express.Router()

router.get("/create-conversation", createConversation)
router.get("/get-conversation", getConversations)
router.post("/update-convrsation", updateConversation)
router.post("/save-message", saveMessage)
router.get("/get-message/:conversationId", getMessages)

export default router