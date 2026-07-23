import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MessageBubble({ role, content }) {
    const isUser = role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`w-fit max-w-[92vw] md:max-w-[72%]
  px-4 py-2.5 rounded-2xl
  break-words overflow-hidden
  leading-relaxed text-[14px]
        ${isUser
                        ? "bg-gradient-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm"
                        : "bg-white/[0.05] border border-white/[0.08] text-slate-200 rounded-tl-sm"
                    }`}>
                {isUser ? (
                    <div className="whitespace-pre-wrap">{content}</div>
                ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content || ""}
                    </ReactMarkdown>
                )}
            </div>
        </div>
    )
}

export default MessageBubble;
