import { clsx, type ClassValue } from "clsx";
import { assessmentFieldLabels } from "@/lib/constants";
import type { ChatMessage, MatterAssessment, MessageRole } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function createMessage(role: MessageRole, content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: new Date().toISOString(),
  };
}

export function formatTimestamp(timestamp: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function buildAssessmentContext(assessment: MatterAssessment) {
  const lines = (Object.entries(assessment) as Array<[keyof MatterAssessment, string]>)
    .filter(([, value]) => value.trim().length > 0)
    .map(([key, value]) => `${assessmentFieldLabels[key]}: ${value}`);

  return lines.length > 0 ? `Structured matter assessment:\n${lines.join("\n")}` : "";
}

export function buildAssessmentUserMessage(assessment: MatterAssessment) {
  const lines = (Object.entries(assessment) as Array<[keyof MatterAssessment, string]>)
    .filter(([, value]) => value.trim().length > 0)
    .map(([key, value]) => `${assessmentFieldLabels[key]}: ${value}`);

  return lines.length > 0 ? lines.join("\n") : "";
}

export function buildChatSummary(messages: ChatMessage[], assessment: MatterAssessment) {
  const userMessages = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content.trim())
    .filter(Boolean);

  const assistantMessages = messages
    .filter((message) => message.role === "assistant")
    .map((message) => message.content.trim())
    .filter(Boolean);

  const combinedUserText = userMessages.join(" ");
  const documentMatches = combinedUserText.match(/\b(contract|agreement|invoice|statement|email|notice|lease|term sheet|shareholders'? agreement|purchase order|memo|draft|claim form|cheque|judgment|award|licen[cs]e|policy|title deed|resolution|minutes)\b/gi) ?? [];
  const uniqueDocuments = [...new Set(documentMatches.map((entry) => entry.toLowerCase()))];

  const keyFacts = userMessages.slice(-3).join(" ").trim() || "No substantive facts have been provided yet.";
  const consultationFocus = assistantMessages.length
    ? "Clarify the governing jurisdiction, review the relevant documents, and confirm the recommended legal or commercial next step."
    : "Establish the factual background, jurisdiction, and immediate legal priority for the matter.";

  return [
    `Matter type: ${assessment.matterType || "To be confirmed"}`,
    `Sub-type: ${assessment.subType || "To be confirmed"}`,
    `Role / side: ${assessment.partyRole || "To be confirmed"}`,
    `Issue focus: ${assessment.transactionType || "To be confirmed"}`,
    `Specific focus: ${assessment.detailType || "To be confirmed"}`,
    `Key facts shared: ${keyFacts}`,
    `User objective: ${assessment.objective || "To be confirmed"}`,
    `Urgency: ${assessment.urgency || "Not specified"}`,
    `Documents mentioned: ${uniqueDocuments.length ? uniqueDocuments.join(", ") : "None clearly identified"}`,
    `Suggested consultation focus: ${consultationFocus}`,
  ].join("\n");
}
