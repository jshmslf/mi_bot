"use client"

import { Message } from '@/types/message';
import React, { useEffect, useState } from 'react'
import { ChevronDown, MessageCircle, X, XIcon } from "lucide-react";
import ChatBox from './ChatBox';
import MessageInput from './MessageInput';

const ChatWidget: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open && messages.length === 0) {
            const greet: Message = {
                id: Date.now(),
                sender: "bot",
                text: "Hi! This bot is made for Joshua. Ask anything about Joshua!",
            };
            setMessages([greet]);
        }
    });

    useEffect(() => {
        if (open) {
            setTimeout(() => setVisible(true), 10)
        } else {
            setVisible(false)
        }
    })

    const handleSend = (text: string) => {
        const userMessage: Message = {
        id: Date.now(),
        sender: "user",
        text,
        }
        
        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        setTimeout(() => {
        const botMessage: Message = {
            id: Date.now() + 1,
            sender: "bot",
            text: generateBotReply(text),
        }
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
        }, 1500)
    }

    // Temporary bot logic
    const generateBotReply = (input: string): string => {
        const responses = [
        "That’s interesting!",
        "Can you tell me more",
        "I see what you mean.",
        "Let me think about that...",
        "Good question!",
        "I’m here to help you with that.",
        ];

        if (input.toLowerCase().includes("hello"))
        return "Hello there! How can I assist you today?";
        if (input.toLowerCase().includes("how are you"))
            return "I’m doing great! Thanks for asking 😊";
        if (input.toLowerCase().includes("sino lalabs ko?"))
        return "Syempre si Justine Louise Pespes Mapagmahal";

        return responses[Math.floor(Math.random() * responses.length)];
    };
    return (
        <>
            {/* floating action btn */}
            <button onClick={() => setOpen(!open)} className='fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all cursor-pointer'>
                { !open ? <MessageCircle size={24}/> : <ChevronDown size={24}/>}
            </button>

            {/* chat */}
            {open && (
                <div className={`fixed bottom-23 right-6 w-85 bg-white rounded-2xl shadow-2xl flex flex-col transform overflow-hidden transition-all duration-300 ease-out
                    ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`
                }>
                    <div className='flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-lg mb-3'>
                        <h2 className='text-lg font-semibold text-center'>Grimore Bot</h2>
                        <button onClick={() => setOpen(false)} className='text-white hover:text-gray-200 transition' aria-label='"Close chat'>
                            <XIcon size={18} className='cursor-pointer'/>
                        </button>
                    </div>
                    {/* chat content */}
                    <div className='pt-1 flex flex-col flex-1'>
                        <ChatBox messages={messages} isTyping={isTyping} />
                        <MessageInput onSend={handleSend}/>
                        <p className='flex items-center justify-center mb-2 text-xs text-gray-700 gap-1'>Powered by<span className='font-semibold'>jshmslf</span></p>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChatWidget
