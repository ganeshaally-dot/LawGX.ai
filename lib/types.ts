import type { LucideIcon } from "lucide-react";

export type MessageRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
};

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type NavigationMetaItem = {
  label: string;
  href: string;
  icon: "about" | "privacy" | "terms";
};

export type NavigationGroup = {
  primary: NavigationItem[];
  secondary: NavigationMetaItem[];
};

export type CTAAction = {
  label: string;
  href: string;
  kind: "consultation" | "upload" | "whatsapp" | "proposal";
};