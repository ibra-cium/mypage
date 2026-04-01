import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSystemPrompt } from "@/lib/ai-context";

export const runtime = "edge";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Basic in-memory rate limiting (Note: resets on server restart/cold start)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const MAX_MESSAGES_PER_24H = 20;
const RESET_DURATION = 24 * 60 * 60 * 1000;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 });
        }

        // Rate limiting logic
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "anonymous";
        const now = Date.now();
        const userLimit = rateLimitMap.get(ip);

        if (userLimit) {
            if (now - userLimit.lastReset > RESET_DURATION) {
                // Reset limit after 24h
                rateLimitMap.set(ip, { count: 1, lastReset: now });
            } else if (userLimit.count >= MAX_MESSAGES_PER_24H) {
                return new Response(JSON.stringify({ error: "RATE_LIMIT_EXCEEDED", message: "You've reached your daily AI limit. Try again tomorrow, boss!" }), {
                    status: 429,
                    headers: { "Content-Type": "application/json" }
                });
            } else {
                userLimit.count += 1;
            }
        } else {
            rateLimitMap.set(ip, { count: 1, lastReset: now });
        }

        const systemPrompt = getSystemPrompt();

        // Get last 6 messages to stay within context/token limits efficiently
        // Get last messages but ensure we start with a 'user' role for Gemini SDK compliance
        let startIndex = Math.max(0, messages.length - 6);
        while (startIndex < messages.length && messages[startIndex].role !== "user") {
            startIndex++;
        }

        const recentMessages = messages.slice(startIndex).map((m: { role: string; content: string }) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
        }));

        // Primary model: gemini-3.1-flash-lite (Future-proofing for the boss)
        // Fallback model: gemini-3-flash
        const models = ["gemini-3.1-flash-lite-preview", "gemini-3-flash-preview", "gemini-2.5-flash", "gemini-2.0-flash"];

        let stream;
        let successfulModel = "";

        for (const modelName of models) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName, systemInstruction: systemPrompt });

                const chat = model.startChat({
                    history: recentMessages.slice(0, -1),
                    generationConfig: {
                        maxOutputTokens: 500,
                    },
                });

                const lastMessage = recentMessages[recentMessages.length - 1].parts[0].text;
                const result = await chat.sendMessageStream(lastMessage);

                stream = result.stream;
                successfulModel = modelName;
                break; // Success!
            } catch (err) {
                console.error(`Error with model ${modelName}:`, err);
                continue; // Try next model
            }
        }

        if (!stream) {
            return new Response(JSON.stringify({ error: "All models failed" }), { status: 500 });
        }

        // Create a ReadableStream to pipe the Gemini stream to the client
        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        const chunkText = chunk.text();
                        controller.enqueue(encoder.encode(chunkText));
                    }
                    controller.close();
                } catch (e) {
                    controller.error(e);
                }
            },
        });

        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "X-Model-Used": successfulModel,
            },
        });

    } catch (error: unknown) {
        console.error("Chat API Error:", error);
        return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
