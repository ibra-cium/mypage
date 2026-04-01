import React from "react";
import { AIChatBox } from "./AIChatBox";
import { ContactLinks } from "./ContactLinks";

export const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-void">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-12 gap-8">
                    {/* Header */}
                    <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-glow-green">
                            Get In <span className="text-neon-green">Touch</span>
                        </h2>
                        <p className="text-text-muted max-w-2xl mx-auto font-mono text-sm uppercase tracking-widest leading-relaxed">
                            Have a project in mind? Or just want to talk about AGI over some virtual coffee?
                            Click a suggested question or type your own.
                        </p>
                    </div>

                    {/* Chat Terminal */}
                    <div className="col-span-12 flex justify-center mb-16">
                        <AIChatBox />
                    </div>

                    {/* Contact Links */}
                    <div className="col-span-12 lg:col-span-8 lg:col-start-3">
                        <div className="flex flex-col items-center gap-8">
                            <div className="flex items-center gap-4 w-full">
                                <div className="h-px flex-1 bg-border" />
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Direct Channels</span>
                                <div className="h-px flex-1 bg-border" />
                            </div>
                            <ContactLinks />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to top hint or footer element can go here */}
            <div className="mt-24 text-center space-y-4">
                <p className="text-[9px] font-mono text-text-muted/40 uppercase tracking-[0.5em]">
                    Built with ⚛️ Next.js + 🤖 Gemini AI | Ibrahim portfolio v1.0
                </p>
                <p className="text-[8px] font-mono text-text-muted/20 uppercase tracking-[0.3em]">
                    © 2026 IBRAHIM_PORTFOLIO // ALL_RIGHTS_RESERVED
                </p>
            </div>
        </section>
    );
};
