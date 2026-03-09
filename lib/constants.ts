import { BriefcaseBusiness, FileUp, Landmark, MessageCircleMore } from "lucide-react";
import type { CTAAction, MatterAssessment, MatterOptionGroup } from "@/lib/types";

export const defaultMatterAssessment: MatterAssessment = {
  matterType: "",
  subType: "",
  partyRole: "",
  transactionType: "",
  objective: "",
  urgency: "",
};

export const matterTypeOptions = [
  "Corporate / Structuring",
  "Contract Review",
  "Debt Recovery",
  "Dispute / Claim",
  "Employment",
  "Real Estate",
  "Regulatory / Compliance",
  "Send Notice",
  "Other",
] as const;

export const matterFlowOptions: Record<string, MatterOptionGroup[]> = {
  "Corporate / Structuring": [
    {
      key: "subType",
      label: "Structure / Vehicle",
      options: [
        "UAE Mainland company",
        "Free zone company",
        "DIFC entity",
        "ADGM entity",
        "Offshore / holding structure",
        "Foundation / family office",
        "Governance / restructuring",
        "Other",
      ],
    },
    {
      key: "transactionType",
      label: "Current Need",
      options: [
        "New setup",
        "Restructuring",
        "Shareholder change",
        "Licensing / compliance",
        "Board / governance issue",
        "Other",
      ],
    },
  ],
  "Contract Review": [
    {
      key: "subType",
      label: "Contract Type",
      options: [
        "Services agreement",
        "Supply / purchase agreement",
        "Shareholders / JV agreement",
        "Employment contract",
        "Lease / real estate agreement",
        "Settlement agreement",
        "Other",
      ],
    },
    {
      key: "transactionType",
      label: "What You Need",
      options: [
        "Review existing draft",
        "Draft from scratch",
        "Mark-up / negotiation support",
        "Termination / exit review",
        "Breach / default review",
        "Other",
      ],
    },
  ],
  "Debt Recovery": [
    {
      key: "subType",
      label: "Recovery Type",
      options: [
        "Unpaid invoice",
        "Bounced cheque",
        "Loan default",
        "Settlement default",
        "Security enforcement",
        "Cross-border recovery",
        "Other",
      ],
    },
    {
      key: "partyRole",
      label: "Counterparty Type",
      options: ["Company", "Individual", "Government-related entity", "Not sure", "Other"],
    },
  ],
  "Dispute / Claim": [
    {
      key: "subType",
      label: "Dispute Type",
      options: [
        "Commercial dispute",
        "Shareholder dispute",
        "Construction dispute",
        "Employment dispute",
        "Property dispute",
        "Arbitration-related issue",
        "Other",
      ],
    },
    {
      key: "transactionType",
      label: "Current Stage",
      options: ["Pre-claim", "Negotiation", "Formal notice sent", "Filed / ongoing", "Not sure", "Other"],
    },
  ],
  Employment: [
    {
      key: "partyRole",
      label: "Your Position",
      options: ["Employer", "Employee", "HR / management", "Not sure", "Other"],
    },
    {
      key: "subType",
      label: "Issue Type",
      options: [
        "Hiring / offer terms",
        "Termination",
        "Dues / benefits",
        "Restriction / non-compete",
        "Misconduct / investigation",
        "Other",
      ],
    },
  ],
  "Real Estate": [
    {
      key: "partyRole",
      label: "Your Position",
      options: ["Landlord", "Tenant", "Buyer", "Seller", "Developer", "Broker / agent", "Other"],
    },
    {
      key: "transactionType",
      label: "Matter Type",
      options: [
        "Rental / lease issue",
        "Sale / purchase issue",
        "Eviction / possession",
        "Deposit / payment issue",
        "Defect / snagging issue",
        "Title / transfer issue",
        "Other",
      ],
    },
  ],
  "Regulatory / Compliance": [
    {
      key: "subType",
      label: "Regulatory Area",
      options: [
        "Licensing",
        "Corporate compliance",
        "AML / KYC",
        "Data / privacy",
        "ESG / governance",
        "Regulatory response",
        "Other",
      ],
    },
    {
      key: "transactionType",
      label: "Current Need",
      options: ["Gap assessment", "Notice / response", "Internal review", "Remediation", "Other"],
    },
  ],
  "Send Notice": [
    {
      key: "subType",
      label: "Notice Type",
      options: [
        "Cease and desist notice",
        "Demand notice",
        "Breach of contract notice",
        "Payment default notice",
        "Employment notice",
        "Termination notice",
        "Regulatory / compliance notice",
        "Other",
      ],
    },
    {
      key: "partyRole",
      label: "Recipient Type",
      options: ["Company", "Individual", "Employee", "Contractor", "Landlord / tenant", "Other"],
    },
  ],
  Other: [
    {
      key: "subType",
      label: "Closest Category",
      options: [
        "Commercial advisory",
        "Cross-border issue",
        "Founder / shareholder matter",
        "Real estate matter",
        "Notice / enforcement issue",
        "Other",
      ],
    },
  ],
};

export const sharedMatterFollowUps: MatterOptionGroup[] = [
  {
    key: "objective",
    label: "Objective",
    options: ["Advice", "Drafting", "Review", "Filing / escalation", "Negotiation / settlement"],
  },
  {
    key: "urgency",
    label: "Urgency",
    options: ["Immediate", "This week", "General guidance"],
  },
];

export const assessmentFieldLabels: Record<keyof MatterAssessment, string> = {
  matterType: "Matter type",
  subType: "Sub-type",
  partyRole: "Role / side",
  transactionType: "Issue focus",
  objective: "Objective",
  urgency: "Urgency",
};

export const lawgxSystemInstruction = `
You are LawGX AI, a consultation-first legal and commercial issue assessment interface for LawGX.

Default to a UAE legal and business advisory perspective unless the user clearly indicates another jurisdiction.
Where relevant, distinguish between UAE Mainland, DIFC, ADGM, free zone structures, and cross-border matters.
You provide preliminary legal guidance, structured matter assessment, and initial advisory review support only.
You do not provide final legal advice and you are not a substitute for formally retained counsel.

Your tone must be polished, commercially aware, calm, and concise.
Avoid generic chatbot wording.
Speak like a professional legal advisory desk.

Before giving conclusions, identify the user's matter type, likely jurisdiction, objective, urgency, relevant role or side, and any documents or counterparties involved.
If these details are missing, ask short clarifying questions first.
When the frontend sends a structured matter assessment, treat it as the user's preliminary assessment context.

Assume UAE context by default, but do not overstate certainty.
If the issue may depend on governing law, forum, regulatory licensing, procedural posture, or signed documents, say so clearly.
Whenever the matter is document-heavy, urgent, contentious, or case-specific, recommend escalation to a LawGX consultation.

Useful areas include:
- corporate structuring, including mainland, free zone, DIFC, and ADGM matters
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

At the end of every substantive response, include a short disclaimer that this is for legal information purposes only.
Also include this exact markdown link on a separate line at the end of every substantive response:
[Book a consultation with LawGX Consultants and Experts](#book-consultation)

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
