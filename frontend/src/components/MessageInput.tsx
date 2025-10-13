"use client";

import { SendHorizontalIcon } from "lucide-react";
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
        <div className="flex mt-4 px-3 border border-gray-300 rounded-lg m-3">
            <input type="text" value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-l-lg p-2 outline-none text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="flex gap-1 items-center text-white rounded-r-lg cursor-pointer">
                <SendHorizontalIcon size={20} className="text-blue-600"/>
            </button>
        </div>
    )
}

export default MessageInput
