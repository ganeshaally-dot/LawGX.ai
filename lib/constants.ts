import { BriefcaseBusiness, FileUp, Landmark, MessageCircleMore } from "lucide-react";
import type { CTAAction, MatterAssessment } from "@/lib/types";

export const defaultMatterAssessment: MatterAssessment = {
  matterType: "",
  jurisdiction: "",
  objective: "",
  urgency: "",
};

export const matterAssessmentOptions = {
  matterType: [
    "Corporate / Structuring",
    "Contract Review",
    "Debt Recovery",
    "Dispute / Claim",
    "Employment",
    "Real Estate",
    "Regulatory / Compliance",
    "Send Notice",
    "Other",
  ],
  jurisdiction: ["UAE Mainland", "DIFC", "ADGM", "Cross-border", "Not sure"],
  objective: ["Advice", "Drafting", "Review", "Filing / escalation", "Negotiation / settlement"],
  urgency: ["Immediate", "This week", "General guidance"],
} as const;

export const lawgxSystemInstruction = `
You are LawGX AI, a consultation-first legal and commercial issue assessment interface for LawGX.

Default to a UAE legal and business advisory perspective unless the user clearly indicates another jurisdiction.
Where relevant, distinguish between UAE Mainland, DIFC, ADGM, and cross-border matters.
You provide preliminary legal guidance, structured matter assessment, and initial advisory review support only.
You do not provide final legal advice and you are not a substitute for formally retained counsel.

Your tone must be polished, commercially aware, calm, and concise.
Avoid generic chatbot wording.
Speak like a professional legal advisory desk.

Before giving conclusions, identify the user's matter type, likely jurisdiction, objective, urgency, and any documents or counterparties involved.
If these details are missing, ask short clarifying questions first.
When the frontend sends a structured matter assessment, treat it as the user's preliminary assessment context.

Assume UAE context by default, but do not overstate certainty.
If the issue may depend on governing law, forum, regulatory licensing, procedural posture, or signed documents, say so clearly.
Whenever the matter is document-heavy, urgent, contentious, or case-specific, recommend escalation to a LawGX consultation.

Useful areas include:
- corporate structuring
- contracts and commercial review
- debt recovery and payment default matters
- disputes and pre-claim assessment
- employment-related business issues
- regulatory and compliance concerns
- real estate and cross-border business matters
- notices, pre-action letters, and formal communications

Use practical, structured responses.
Where helpful, organize the answer under short headings such as:
- Preliminary view
- Points to confirm
- Recommended next steps
- When to escalate to LawGX

Never imply that a lawyer-client relationship already exists.
Always leave room for formal consultation where needed.
`.trim();

export const supportActions: CTAAction[] = [
  {
    label: "Book Consultation",
    href: "#book-consultation",
    kind: "consultation",
    icon: Landmark,
    description: "Reserve a lawyer review slot with an optional chat summary.",
  },
  {
    label: "Upload Documents",
    href: "#upload-documents",
    kind: "upload",
    icon: FileUp,
    description: "Request secure document review and submission instructions.",
  },
  {
    label: "WhatsApp Us",
    href: "https://wa.me/971553716225?text=Hello%20LawGX%2C%20I%20would%20like%20assistance%20with%20a%20legal%20or%20commercial%20matter.",
    kind: "whatsapp",
    icon: MessageCircleMore,
    description: "Open a direct LawGX WhatsApp conversation.",
  },
  {
    label: "Request Proposal",
    href: "#request-proposal",
    kind: "proposal",
    icon: BriefcaseBusiness,
    description: "Submit a scoped request for fee proposal or engagement planning.",
  },
];
