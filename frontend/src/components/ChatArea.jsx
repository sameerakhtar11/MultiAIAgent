import React, { useEffect } from "react";
import { FiSend } from "react-icons/fi";
import Nav from "./Nav"
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
function ChatArea() {
  const { selectedConversation } = useSelector((state) => state.conversation)

  const dispatch = useDispatch()

  useEffect(() => {
    const getMess = async () => {
      if (selectedConversation) {
        const data = await getMessages(selectedConversation?._id)
        dispatch(setMessages(data))
      }
    }
    getMess()
  }, [selectedConversation])
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
      <Nav />
      <MessageList />
      <ChatInput />
    </div>
  )
}

export default ChatArea;