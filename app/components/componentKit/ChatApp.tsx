import { Box } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatSidebar from "./chatBox/ChatSidebar";
import ChatWindow from "./chatBox/ChatWindow";

export default function ChatApp() {
    const [sessions, setSessions] = useState<{ [id: string]: { messages: any[]; title: string } }>({});
    const [currentSessionId, setCurrentSessionId] = useState("");

    const handleNewChat = () => {
        const id = uuidv4();
        setSessions((prev) => ({
            ...prev,
            [id]: { messages: [], title: "New Chat" },
        }));
        setCurrentSessionId(id);
    };

    const handleUpdateSession = (id: string, data: Partial<{ messages: any[]; title: string }>) => {
        setSessions((prev) => ({
            ...prev,
            [id]: { ...prev[id], ...data },
        }));
    };

    const sessionList = Object.entries(sessions).map(([id, data]) => ({
        id,
        title: data.title,
    }));

    return (
        <Box className="flex relative h-[86.5vh] overflow-hidden z-0">
            <ChatSidebar
                sessions={sessionList}
                currentSessionId={currentSessionId}
                onNewChat={handleNewChat}
                onSelectChat={setCurrentSessionId}
            />
            {currentSessionId && sessions[currentSessionId] ? (
                <ChatWindow
                    sessionId={currentSessionId}
                    sessionData={sessions[currentSessionId]}
                    updateSession={handleUpdateSession}
                />
            ) : (
                <Box className="flex-1 flex items-center justify-center text-gray-600 text-2xl">Start a new chat</Box>
            )}
        </Box>
    );
}
