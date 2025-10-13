import { Message } from "@/types/message";
import Image from "next/image";
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
    <div className="flex flex-col space-y-3 p-1 h-[400px] overflow-y-auto p-3">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex items-end gap-1 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
          {msg.sender === "bot" && (
            <Image src={'/bot_avatar.jpg'} alt="grimore" height={25} width={25} className="rounded-full"/>
          )}
          <div className={`p-2 pb-1 rounded-xl break-words whitespace-pre-wrap ${msg.sender === "user" ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-black rounded-bl-none"} max-w-[80%]`}>
            <p className="text-sm">{msg.text}</p>
            <span className="block text-xs text-gray-400 mt-1 text-right">
            </span>
          </div>
        </div>
      ))}
      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-end gap-1">
          <Image src={'/bot_avatar.jpg'} alt="grimore" height={25} width={25} className="rounded-full"/>
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
