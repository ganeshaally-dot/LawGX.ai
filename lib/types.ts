import type { LucideIcon } from "lucide-react";

export type MessageRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
};

export type CTAActionKind = "consultation" | "upload" | "whatsapp" | "proposal";

export type CTAAction = {
  label: string;
  href: string;
  kind: CTAActionKind;
  icon: LucideIcon;
  description: string;
};

export type MatterAssessment = {
  matterType: string;
  jurisdiction: string;
  objective: string;
  urgency: string;
};
