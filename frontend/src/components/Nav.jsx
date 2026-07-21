import { Share2, MoreHorizontal, Zap, ChartBar, MessageCircle, MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { conversations, selectedConversation } = useSelector(state => state.conversation);
  const { messages } = useSelector(state => state.message);
  return (

    <h1>ChatArea</h1>

  );
}