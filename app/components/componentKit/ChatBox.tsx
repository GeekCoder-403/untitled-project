import { Box, Typography } from "@mui/material";
import { ArrowUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
    const [messages, setMessages] = useState<
        { sender: "user" | "bot"; text: string }[]
    >([]);
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    const hasStartedChat = messages.length > 0 || input.length > 0;

    // Scroll to bottom on new message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        // Push user message
        setMessages((prev) => [...prev, { sender: "user", text: input }]);
        const userMessage = input;
        setInput("");

        // Mock response JSON logic
        setTimeout(() => {
            const response = generateResponse(userMessage);
            setMessages((prev) => [...prev, { sender: "bot", text: response.text }]);
        }, 1000);
    };

    const generateResponse = (msg: string): { text: string } => {
        return {
            text: `You said: "${msg}". Here's a mocked reply!`,
        };
    };

    return (
        <Box className="flex flex-col items-center justify-center h-[100%] pt-1">
            <Box className="w-full max-w-2xl h-full  flex flex-col overflow-hidden">
                {hasStartedChat ? (
                    <>
                        <Box className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar ">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === "user"
                                            ? "bg-primary text-white"
                                            : "bg-gray-200 text-gray-800"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </Box>

                        <Box className="border-t p-4 flex gap-2 items-center">
                            <input
                                type="text"
                                className="flex-1 border text-secondary rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <Typography
                                onClick={handleSend}
                                className="flex items-center justify-center bg-primary rounded-full w-10 h-10 cursor-pointer"
                            >
                                <ArrowUp className="text-white w-5 h-5" />
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <Box className="flex-1 flex items-center justify-center flex-col text-center px-6">
                        <Typography variant="h5" className="text-gray-700 font-semibold mb-4">
                            Welcome to Smart Data Quality Engine
                        </Typography>
                        <input
                            type="text"
                            autoFocus
                            className="mt-6 border text-secondary rounded-xl px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
}
