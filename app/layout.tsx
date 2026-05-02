import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LawGX.ai - AI Agents for Corporate Operations",
  description:
    "LawGX.ai builds AI agents that handle the operational workflows mid-market corporates spend the most hours on - across HR, sales, compliance, support, and procurement. Discovery sprint to deployed agent in weeks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
