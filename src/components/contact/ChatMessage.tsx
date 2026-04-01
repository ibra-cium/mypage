import React from "react";

interface ChatMessageProps {
    role: "user" | "ai";
    content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
    const isAI = role === "ai";

    return (
        <div
            className={`flex w-full mb-4 ${isAI ? "justify-start" : "justify-end"}`}
        >
            <div className={`flex max-w-[85%] ${isAI ? "flex-row" : "flex-row-reverse"}`}>
                {isAI && (
                    <div className="mr-2 flex-shrink-0 w-8 h-8 rounded-full bg-surface-2 border border-neon-green flex items-center justify-center text-xl shadow-[0_0_10px_rgba(57,255,20,0.3)]">
                        👾
                    </div>
                )}

                <div
                    className={`px-4 py-2 text-sm ${isAI
                            ? "bg-surface-2 border-l-2 border-neon-green rounded-tr-xl rounded-br-xl rounded-bl-sm font-mono text-neon-green/90"
                            : "bg-surface text-cyber-cyan border border-cyber-cyan/30 rounded-tl-xl rounded-bl-xl rounded-tr-sm"
                        } shadow-sm backdrop-blur-sm`}
                >
                    <div className="whitespace-pre-wrap break-words leading-relaxed">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};
