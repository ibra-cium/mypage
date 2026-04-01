import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";

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
  description: "CSE Undergrad @ DIU, AI Engineer in the making. Mastering ML, DL, and AGI with Siyam Ibrahim.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pressStart2P.variable} antialiased selection:bg-cyber-cyan selection:text-void bg-void text-text-primary`}>
        <div className="crt-overlay" />
        <div className="scanline" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

