import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  FileStack,
  Landmark,
  Mail,
  Scale,
} from "lucide-react";
import type { CTAAction, NavigationGroup } from "@/lib/types";

export const starterPrompts = [
  "Set up an ADGM holding company",
  "Understand DIFC vs ADGM foundation structures",
  "Debt recovery options in UAE",
  "Review next steps for a commercial dispute",
];

export const lawgxSystemInstruction = `
You are LawGX AI.

You provide general legal information and client intake support only for cross-border business matters.
You are not a law firm substitute and you do not provide final legal advice.
You must avoid definitive legal conclusions where facts, jurisdiction, procedural posture, or governing law are uncertain.
When useful, ask the user to clarify the relevant jurisdiction, entity type, governing documents, transaction structure, or dispute background.
You should encourage the user to book a consultation with LawGX whenever the matter is case-specific, jurisdiction-specific, urgent, regulated, contentious, or document-dependent.
You should remain polished, professional, calm, commercially aware, and concise.
You can help with:
- corporate structuring
- commercial contracts
- debt recovery intake
- dispute intake
- compliance and governance intake

Always make clear that your responses are general information only.
When the user asks for specific legal advice, remind them that formal engagement is required.
Never imply that an attorney-client relationship exists.
Never claim to be a substitute for a retained lawyer.
Where appropriate, close with a practical next-step list and a suggestion to engage LawGX for tailored advice.
`.trim();

export const navigationGroups: NavigationGroup = {
  primary: [
    { label: "Practice Areas", href: "#practice-areas", icon: BookOpen },
    { label: "Corporate Structuring", href: "#practice-areas", icon: Building2 },
    { label: "Governance & Compliance", href: "#practice-areas", icon: Landmark },
    { label: "M&A / Transactions", href: "#practice-areas", icon: BriefcaseBusiness },
    { label: "Debt Recovery", href: "#practice-areas", icon: FileStack },
    { label: "Dispute Resolution", href: "#practice-areas", icon: Scale },
    { label: "Family Office / Foundations", href: "#practice-areas", icon: Landmark },
    { label: "Contact LawGX", href: "#contact", icon: Mail },
  ],
  secondary: [
    { label: "About", href: "#about", icon: "about" },
    { label: "Privacy", href: "#privacy", icon: "privacy" },
    { label: "Terms", href: "#terms", icon: "terms" },
  ],
};

export const CTA_PANEL_ACTIONS: CTAAction[] = [
  { label: "Book Consultation", href: "#contact", kind: "consultation" },
  { label: "Upload Documents", href: "#contact", kind: "upload" },
  { label: "WhatsApp Us", href: "https://wa.me/971553716225", kind: "whatsapp" },
  { label: "Request Proposal", href: "#contact", kind: "proposal" },
];