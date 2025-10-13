"use client";

import { useState } from "react";

interface MessageInputProps {
    onSend: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({onSend}) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text);
        setText("");
    }

    return (
        <div className="flex mt-4">
            <input type="text" value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-l-lg p-2 outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded-r-lg">
                Send
            </button>
        </div>
    )
}

export default MessageInput
