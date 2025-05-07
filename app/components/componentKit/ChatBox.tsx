import { Box, Typography } from "@mui/material";
import { ArrowUp, CirclePlus, X } from "lucide-react";
import { useSnackbar } from "notistack";
import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
    const { enqueueSnackbar } = useSnackbar();
    const [messages, setMessages] = useState<
        { sender: "user" | "bot"; text: string }[]
    >([]);
    const [input, setInput] = useState("");
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);

    const hasStartedChat = messages.length > 0 || input.length > 0;

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim() && attachedFiles.length === 0) return;

        const imageHtml = attachedFiles
            .map(
                (file) =>
                    `<img src="${URL.createObjectURL(
                        file
                    )}" alt="Attached" class="w-32 h-full mt-2 rounded-lg" />`
            )
            .join("");

        const combinedMessage = input + (imageHtml ? " (attached image)" : "");

        setMessages((prev) => [
            ...prev,
            { sender: "user" as "user", text: combinedMessage },
            ...(imageHtml ? [{ sender: "user" as "user", text: imageHtml }] : []),
        ]);

        const userMessage = input;
        setInput("");
        setAttachedFiles([]);

        setTimeout(() => {
            const response = generateResponse(userMessage);
            setMessages((prev) => [...prev, { sender: "bot", text: response.text }]);
        }, 1000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter(
            (file) => file.type === "image/png" || file.type === "image/jpeg"
        );

        if (validFiles.length !== files.length) {
            enqueueSnackbar("Only PNG and JPG images are supported.", { variant: "error" });
        }

        setAttachedFiles((prev) => [...prev, ...validFiles]);
    };

    const generateResponse = (msg: string): { text: string } => {
        return {
            text: `You said: "${msg}". Here's a mocked reply!`,
        };
    };

    return (
        <Box className="flex flex-col items-center justify-center h-[100vh] pt-1">
            <Box className="w-full max-w-2xl h-full flex flex-col overflow-hidden">
                {hasStartedChat ? (
                    <>
                        <Box className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-lg max-w-xs break-words ${msg.sender === "user"
                                            ? "bg-primary text-white"
                                            : "bg-gray-200 text-gray-800"
                                            }`}
                                    >
                                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                    </div>
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </Box>

                        <Box className="border-t p-4 flex flex-col gap-2">
                            {attachedFiles.length > 0 && (
                                <Box className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-lg">
                                    {attachedFiles.map((file, index) => (
                                        <Box key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`preview-${index}`}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <button
                                                onClick={() =>
                                                    setAttachedFiles((prev) =>
                                                        prev.filter((_, i) => i !== index)
                                                    )
                                                }
                                                className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full p-1 flex items-center justify-center"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Box>
                                    ))}
                                </Box>
                            )}

                            <Box className="flex gap-2 items-center">
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer text-2xl text-gray-500"
                                >
                                    <CirclePlus />
                                </label>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                />

                                <input
                                    type="text"
                                    autoFocus
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
