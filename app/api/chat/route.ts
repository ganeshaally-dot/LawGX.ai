import OpenAI from "openai";
import { NextResponse } from "next/server";
import { defaultMatterAssessment, lawgxSystemInstruction } from "@/lib/constants";
import type { ChatMessage, MatterAssessment } from "@/lib/types";
import { buildAssessmentContext } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const body = (await request.json()) as { messages?: ChatMessage[]; assessment?: MatterAssessment };
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const assessmentContext = buildAssessmentContext(body.assessment ?? defaultMatterAssessment);

    const sanitizedInput = messages
      .filter(
        (message): message is ChatMessage =>
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim().length > 0,
      )
      .slice(-16)
      .map((message) => ({
        role: message.role,
        content: message.content.trim(),
      }));

    if (sanitizedInput.length === 0) {
      return NextResponse.json({ error: "No valid messages were provided." }, { status: 400 });
    }

    const input = assessmentContext
      ? [{ role: "user" as const, content: assessmentContext }, ...sanitizedInput]
      : sanitizedInput;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      instructions: lawgxSystemInstruction,
      input,
    });

    const output = response.output_text?.trim();

    if (!output) {
      return NextResponse.json(
        { error: "The assistant did not return any text output." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply: output });
  } catch (error) {
    console.error("LawGX chat route error:", error);

    return NextResponse.json(
      {
        error:
          "LawGX AI could not complete this advisory review right now. Please try again, or escalate to a LawGX consultation for urgent matters.",
      },
      { status: 500 },
    );
  }
}
