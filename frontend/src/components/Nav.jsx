import React from 'react'
import { useSelector } from "react-redux"
import { MessageSquare } from 'lucide-react'

function Nav() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  
  return (
    <div className='h-14 flex items-center px-5 border-b border-white/[0.06] bg-[#0d0f14] gap-3 text-slate-200'>
      <div className='text-indigo-400'>
        <MessageSquare size={18} className="stroke-[2]" />
      </div>
      <div className='font-medium text-sm'>
        {selectedConversation?.title || "New Chat"}
      </div>
    </div>
  )
}

export default Nav
