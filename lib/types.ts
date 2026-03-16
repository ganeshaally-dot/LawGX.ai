import type { LucideIcon } from "lucide-react";

export type MessageRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
};

export type FollowUpGroup = {
  prompt: string;
  options: string[];
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
  subType: string;
  partyRole: string;
  transactionType: string;
  detailType: string;
  objective: string;
  urgency: string;
};

export type MatterOptionGroup = {
  key: Exclude<keyof MatterAssessment, "matterType">;
  label: string;
  options: string[];
};
