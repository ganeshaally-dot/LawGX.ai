import Link from "next/link";
import { LawGXWorkspace } from "@/components/lawgx-workspace";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
  { label: "WhatsApp", href: "https://wa.me/971553716225" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,154,28,0.1),transparent_24%),radial-gradient(circle_at_right,rgba(21,53,101,0.18),transparent_24%)]" />

      <section className="relative px-2 pb-4 pt-2 sm:px-4 sm:pb-5 sm:pt-4 lg:px-6">
        <div className="mx-auto max-w-[1600px]">
          <LawGXWorkspace />
        </div>
      </section>

      <footer className="relative border-t border-white/8 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>Use of this site does not create a lawyer-client or consultant-client relationship unless formally agreed.</p>
          <div className="flex flex-wrap items-center gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
