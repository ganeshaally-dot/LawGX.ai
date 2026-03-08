import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LawGX AI | Preliminary Legal Guidance & Matter Assessment",
  description:
    "LawGX AI provides preliminary legal guidance, structured matter assessment, and consultation-first advisory review for UAE and cross-border business matters.",
  metadataBase: new URL("https://www.lawgx.ai"),
  openGraph: {
    title: "LawGX AI | Preliminary Legal Guidance & Matter Assessment",
    description:
      "Structured matter assessment and consultation-first advisory review for UAE and cross-border business matters.",
    url: "https://www.lawgx.ai",
    siteName: "LawGX AI",
    type: "website",
    images: [
      {
        url: "/lawgx-logo.svg",
        width: 760,
        height: 200,
        alt: "LawGX logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LawGX AI | Preliminary Legal Guidance & Matter Assessment",
    description:
      "Structured matter assessment and consultation-first advisory review for UAE and cross-border business matters.",
    images: ["/lawgx-logo.svg"],
  },
  icons: {
    icon: "/lawgx-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[var(--bg)] text-[var(--text-primary)] antialiased">{children}</body>
    </html>
  );
}
