import type { Metadata } from "next";
import { ThemeProvider } from "./context/ThemeContext";
import "./globals.css";
import { Orbitron, Play, Chakra_Petch } from "next/font/google";

// Primary font for headings
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

// Secondary font for body text
const play = Play({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-play",
});

// Alternative font for special elements
const chakraPetch = Chakra_Petch({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-chakra",
});

export const metadata: Metadata = {
  title: "1egit Gaming 5v5 Match Making App",
  description: "Team generator for 5v5 matches",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${orbitron.variable} ${play.variable} ${chakraPetch.variable} font-sans`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}