import React, { useEffect } from "react";
import { FiSend } from "react-icons/fi";
import Nav from "./Nav";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import getMessages from "../features/getMessages";
import { setMessages } from "../redux/messageSlice";

function ChatArea() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMess = async () => {
      if (selectedConversation?._id) {
        const data = await getMessages(selectedConversation._id);
        dispatch(setMessages(data));
      }
    };
    getMess();
  }, [selectedConversation?._id, dispatch]);

  return (
    <div className="flex-1 flex flex-col">
      <Nav />
      <MessageList />
      <ChatInput />
    </div>
  );
}

export default ChatArea;