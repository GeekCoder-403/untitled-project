import { Box, Typography, IconButton } from "@mui/material";
import { CirclePlus, PanelRightClose, PanelRightOpen } from "lucide-react";
import Button from "~/components/elements/Button";
import { useEffect, useState } from "react";

interface ChatSidebarProps {
    sessions: { id: string; title: string }[];
    currentSessionId: string;
    onNewChat: () => void;
    onSelectChat: (id: string) => void;
}

export default function ChatSidebar({
    sessions,
    currentSessionId,
    onNewChat,
    onSelectChat,
}: ChatSidebarProps) {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(true);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSelectChat = (id: string) => {
        onSelectChat(id);
        if (window.innerWidth < 768) setIsOpen(false);
    };

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-30 "
                    onClick={() => setIsOpen(false)}
                />
            )}

            <Box
                className={`
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                    transition-transform duration-300 ease-in-out
                    bg-gray-100 p-4 flex flex-col
                    w-64 h-full
                    absolute md:static z-40
                    top-0 left-0 rounded-md
                `}
            >
                <Box className="flex items-center justify-between mb-4 gap-4">
                    <Button variant="contained" color="primary" onClick={onNewChat} className="w-full">
                        + New Chat
                    </Button>
                    <IconButton onClick={() => setIsOpen(false)} className="md:hidden" size="small">
                        <PanelRightOpen className="w-6 h-6 text-secondary" />
                    </IconButton>
                </Box>

                <Box className="flex-1 overflow-y-auto space-y-2">
                    {sessions.map((session) => (
                        <Box
                            key={session.id}
                            onClick={() => handleSelectChat(session.id)}
                            className={`p-2 rounded-lg cursor-pointer ${currentSessionId === session.id
                                ? "bg-primary text-white"
                                : "hover:bg-tertiary bg-gray-400"
                                }`}
                        >
                            <Typography className="truncate">
                                {session.title || "Untitled Chat"}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {!isOpen && (
                <Box className="absolute top-4 left-2 md:hidden">
                    <IconButton onClick={() => setIsOpen(true)}>
                        <PanelRightClose className="w-6 h-6 text-secondary" />
                    </IconButton>
                </Box>
            )}
        </>
    );
}
