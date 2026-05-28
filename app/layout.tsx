import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Horizon — Learning Dashboard",
  description: "Your next-generation personalized learning platform",
  keywords: ["learning", "education", "dashboard", "courses"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg-primary font-body antialiased">
        {/* Grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        {/* Ambient background blobs */}
        <div
          className="pointer-events-none fixed inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-accent-violet/6 blur-[120px] animate-glow-pulse" />
          <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-accent-blue/5 blur-[140px] animate-glow-pulse [animation-delay:1.5s]" />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-accent-cyan/4 blur-[120px] animate-glow-pulse [animation-delay:3s]" />
        </div>
        {children}
      </body>
    </html>
  );
}
