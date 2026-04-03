"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Terminal as TerminalIcon, X } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { useAchievements } from "@/components/providers/AchievementProvider";

interface Message {
    role: "user" | "ai";
    content: string;
}

const SUGGESTED_QUESTIONS = [
    "Who is Ibrahim?",
    "What are his top skills?",
    "Is he available for hire?",
    "Tell me a joke about AI.",
];

const MAX_MESSAGES = 20;

export const AIChatBox: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const { unlock } = useAchievements();
    const [sessionId, setSessionId] = useState("");

    // Initialize with boot lines
    useEffect(() => {
        setSessionId(Math.random().toString(36).substr(2, 9).toUpperCase());
        const timer = setTimeout(() => {
            setMessages([
                { role: "ai", content: "> ibrahim_ai v1.0 initialized...\n> system_status: OPERATIONAL\n> context_loaded: SUCCESS\n\nHow can I help you today, boss?" }
            ]);
        }, 500);

        // Load message count from session storage
        const savedCount = sessionStorage.getItem("ibrahim_ai_count");
        if (savedCount) setMessageCount(parseInt(savedCount));

        return () => clearTimeout(timer);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isStreaming]);

    const handleSend = async (text: string = input) => {
        if (!text.trim() || isLoading || messageCount >= MAX_MESSAGES) return;

        const userMessage: Message = { role: "user", content: text };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);
        setHasStarted(true);

        const newCount = messageCount + 1;
        setMessageCount(newCount);
        sessionStorage.setItem("ibrahim_ai_count", newCount.toString());

        if (newCount >= 5) {
            unlock('VOICE_OF_REASON');
        }

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!response.ok) throw new Error("Connection lost");

            const reader = response.body?.getReader();
            if (!reader) throw new Error("No reader");

            setIsLoading(false);
            setIsStreaming(true);

            let aiResponse = "";
            setMessages((prev) => [...prev, { role: "ai", content: "" }]);

            const decoder = new TextDecoder();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                aiResponse += chunk;

                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1].content = aiResponse;
                    return updated;
                });
            }
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: "> ERROR: connection_lost. Try again. [Status: --color-magenta]" }
            ]);
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    return (
        <div className="w-full max-w-[1000px] mx-auto bg-surface border border-border shadow-2xl rounded-lg overflow-hidden flex flex-col h-[500px] md:h-[650px] relative">
            {/* Win95 style Titlebar */}
            <div className="bg-surface-2 border-b border-border p-2 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-magenta animate-pulse shadow-[0_0_8px_var(--color-magenta)]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted flex items-center gap-1">
                        <TerminalIcon className="w-3 h-3" /> ibra_bot v2.0-beta
                    </span>
                </div>
                <div className="flex items-center gap-1 md:gap-3">
                    <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-void/50 rounded border border-neon-green/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                        <span className="text-[9px] font-bold text-neon-green">GEMINI-3.1 · ONLINE</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 border border-border flex items-center justify-center hover:bg-surface-2 cursor-pointer transition-colors">
                            <div className="w-1.5 h-[1px] bg-text-muted" />
                        </div>
                        <div className="w-3 h-3 border border-border flex items-center justify-center hover:bg-surface-2 cursor-pointer transition-colors">
                            <div className="w-1.5 h-1.5 border border-text-muted" />
                        </div>
                        <div className="w-3 h-3 border border-border flex items-center justify-center hover:bg-magenta hover:border-magenta cursor-pointer group transition-colors">
                            <X className="w-2 h-2 text-text-muted group-hover:text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Profile Header */}
            <div className="bg-void/40 p-4 border-b border-border flex items-center gap-4">
                <div className="w-12 h-12 rounded bg-surface-2 border-2 border-primary flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(245,166,35,0.2)] animate-pulse">
                    👾
                </div>
                <div>
                    <h3 className="text-primary font-press-start-2p text-[10px]">IBRA-BOT</h3>
                    <p className="text-text-muted text-[8px] mt-1 uppercase tracking-tighter">AI Assistant · Sarcasm Modules: ACTIVE</p>
                </div>
            </div>

            {/* Message Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent custom-scrollbar"
            >
                {messages.map((ms, idx) => (
                    <ChatMessage key={idx} role={ms.role} content={ms.content} />
                ))}

                {isLoading && (
                    <div className="flex justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-surface-2 border border-neon-green/30 flex items-center justify-center text-xs opacity-50">
                            👾
                        </div>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-neon-green rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-1 h-1 bg-neon-green rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-1 h-1 bg-neon-green rounded-full animate-bounce" />
                        </div>
                    </div>
                )}
            </div>

            {/* Suggested Questions (Hide after first message) */}
            {!hasStarted && !isLoading && (
                <div className="px-4 py-2 flex flex-wrap gap-2 animate-fade-in">
                    {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                            key={q}
                            onClick={() => handleSend(q)}
                            className="text-xs px-4 py-2 rounded-full border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 transition-all active:scale-95 bg-void/30 backdrop-blur-sm shadow-[0_0_10px_rgba(0,255,255,0.05)]"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            )}

            {/* Message Counter */}
            <div className="px-4 py-1 text-[9px] font-mono text-text-muted flex justify-between items-center opacity-60">
                <span>SESSION_ID: {sessionId || "INITIALIZING..."}</span>
                <span className={messageCount >= MAX_MESSAGES ? "text-magenta font-bold" : ""}>
                    {MAX_MESSAGES - messageCount} / {MAX_MESSAGES} MESSAGES REMAINING
                </span>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-void/50 border-t border-border flex gap-3 items-center">
                <span className="text-neon-green font-mono text-sm">{">"}</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={messageCount >= MAX_MESSAGES ? "RATE LIMIT REACHED" : "Ask something..."}
                    disabled={isLoading || isStreaming || messageCount >= MAX_MESSAGES}
                    className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-text-primary placeholder:text-text-muted disabled:opacity-50"
                />
                <button
                    onClick={() => handleSend()}
                    disabled={isLoading || isStreaming || !input.trim() || messageCount >= MAX_MESSAGES}
                    className="p-2 rounded bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-all active:scale-90 disabled:opacity-20 disabled:grayscale"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>

            {/* Scanline Effect Overlay for terminal look */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
        </div>
    );
};
