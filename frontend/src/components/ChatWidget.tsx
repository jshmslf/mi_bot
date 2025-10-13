"use client"

import { Message } from '@/types/message';
import React, { useEffect, useState } from 'react'
import { MessageCircle, X } from "lucide-react";
import ChatBox from './ChatBox';
import MessageInput from './MessageInput';

const ChatWidget: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);

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
        "Can you tell me more?",
        "I see what you mean.",
        "Let me think about that...",
        "Good question!",
        "I’m here to help you with that.",
        ];

        if (input.toLowerCase().includes("hello"))
        return "Hello there! How can I assist you today?";
        if (input.toLowerCase().includes("how are you"))
        return "I’m doing great! Thanks for asking 😊";

        return responses[Math.floor(Math.random() * responses.length)];
    };
    return (
        <>
            {/* floating action btn */}
            <button onClick={() => setOpen(!open)} className='fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all'>
                {open ? <X size={24} /> : <MessageCircle size={24}/>}
            </button>

            {/* chat */}
            {open && (
                <div className='fixed bottom-25 right-6 w-80 bg-white rounded-2xl shadow-2xl flex flex-col p-3'>
                    <h2 className='text-lg font-semibold text-center mb-2'>Joshua&apos;s AI Bot</h2>
                    <ChatBox messages={messages} isTyping={isTyping} />
                    <MessageInput onSend={handleSend}/>
                </div>
            )}
        </>
    )
}

export default ChatWidget
