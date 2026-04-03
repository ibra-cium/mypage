import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { RetroProvider } from "@/components/providers/RetroProvider";
import { AchievementProvider } from "@/components/providers/AchievementProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700", "900"],
});

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Siyam Ibrahim | Student & Hobbyist",
  description: "CSE Undergrad @ DIU",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${pressStart2P.variable} antialiased selection:bg-secondary selection:text-void text-text-primary`}
        style={{ background: "#07080D" }}
      >
        <RetroProvider>
          <AchievementProvider>
            {/* Animated background — z:0, always behind content */}
            <AnimatedBackground />

            <div className="relative">
              {children}
            </div>
          </AchievementProvider>
        </RetroProvider>
      </body>
    </html>
  );
}
