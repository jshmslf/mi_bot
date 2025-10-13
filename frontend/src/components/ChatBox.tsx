import { Message } from "@/types/message";
import React, { useEffect, useRef } from "react";

interface ChatBoxProps {
  messages: Message[];
  isTyping?: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, isTyping }) => {
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages, isTyping])

  return (
    <div className="flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg h-[400px] overflow-y-auto">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`p-3 rounded-xl max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-black rounded-bl-none"}`}>
            <p>{msg.text}</p>
            <span className="block text-xs text-gray-400 mt-1 text-right">
            </span>
          </div>
        </div>
      ))}
      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-gray-200 text-black p-3 rounded-xl rounded-bl-none flex items-center space-x-1">
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
          </div>
        </div>
      )}

      {/* Invisible spacer to keep scroll position at the bottom */}
      <div ref={chatEndRef} />
    </div>
  )
}

export default ChatBox
