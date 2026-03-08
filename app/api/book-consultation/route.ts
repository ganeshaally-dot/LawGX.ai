import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { CTAActionKind } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestType = Exclude<CTAActionKind, "whatsapp">;

type BookingPayload = {
  requestType?: RequestType;
  fullName?: string;
  email?: string;
  company?: string;
  jurisdiction?: string;
  preferredDate?: string;
  preferredTime?: string;
  matterSummary?: string;
  includeChatSummary?: boolean;
  chatSummary?: string;
};

const requestLabels: Record<RequestType, string> = {
  consultation: "Consultation request",
  upload: "Document review request",
  proposal: "Proposal request",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = (await request.json()) as BookingPayload;

    const requestType = body.requestType ?? "consultation";
    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const jurisdiction = body.jurisdiction?.trim() ?? "";
    const preferredDate = body.preferredDate?.trim() ?? "";
    const preferredTime = body.preferredTime?.trim() ?? "";
    const matterSummary = body.matterSummary?.trim() ?? "";
    const includeChatSummary = Boolean(body.includeChatSummary);
    const chatSummary = body.chatSummary?.trim() ?? "";

    if (!fullName || !email || !matterSummary) {
      return NextResponse.json(
        { error: "Full name, email, and matter summary are required." },
        { status: 400 },
      );
    }

    if (requestType === "consultation" && (!preferredDate || !preferredTime)) {
      return NextResponse.json(
        { error: "Preferred date and preferred time are required for consultation requests." },
        { status: 400 },
      );
    }

    const safe = {
      requestType: escapeHtml(requestLabels[requestType]),
      fullName: escapeHtml(fullName),
      email: escapeHtml(email),
      company: escapeHtml(company || "Not provided"),
      jurisdiction: escapeHtml(jurisdiction || "Not provided"),
      preferredDate: escapeHtml(preferredDate || "Not applicable"),
      preferredTime: escapeHtml(preferredTime || "Not applicable"),
      matterSummary: escapeHtml(matterSummary || "Not provided"),
      chatSummary: escapeHtml(chatSummary || "Not included"),
      includeChatSummary: includeChatSummary ? "Included" : "Not included",
    };

    await resend.emails.send({
      from: "LawGX Bookings <noreply@lawgx.ai>",
      to: ["support@lawgx.ai"],
      replyTo: email,
      subject: `${requestLabels[requestType]} from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
          <h2 style="margin-bottom: 16px;">New LawGX ${safe.requestType.toLowerCase()}</h2>
          <p><strong>Request type:</strong> ${safe.requestType}</p>
          <p><strong>Name:</strong> ${safe.fullName}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Company / group:</strong> ${safe.company}</p>
          <p><strong>Jurisdiction(s):</strong> ${safe.jurisdiction}</p>
          <p><strong>Preferred date:</strong> ${safe.preferredDate}</p>
          <p><strong>Preferred time:</strong> ${safe.preferredTime}</p>
          <p><strong>Matter summary:</strong><br/>${safe.matterSummary.replaceAll("\n", "<br/>")}</p>
          <p><strong>Lawyer review summary:</strong> ${safe.includeChatSummary}</p>
          <p><strong>Structured chat summary:</strong><br/>${safe.chatSummary.replaceAll("\n", "<br/>")}</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: "LawGX <noreply@lawgx.ai>",
      to: [email],
      subject: `We received your ${requestLabels[requestType].toLowerCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
          <h2 style="margin-bottom: 16px;">Request received</h2>
          <p>Dear ${safe.fullName},</p>
          <p>Thank you for contacting LawGX. We have received your ${safe.requestType.toLowerCase()} and the submitted matter details.</p>
          <p><strong>Request type:</strong> ${safe.requestType}</p>
          <p><strong>Jurisdiction(s):</strong> ${safe.jurisdiction}</p>
          <p><strong>Preferred date:</strong> ${safe.preferredDate}<br/>
          <strong>Preferred time:</strong> ${safe.preferredTime}</p>
          <p>Our team will review the submission and revert from <strong>support@lawgx.ai</strong> with the next step, confirmation, or proposed follow-up.</p>
          <p>This confirmation does not itself create a lawyer-client or consultant-client relationship unless formally agreed.</p>
          <p>Regards,<br/>LawGX</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("LawGX booking route error:", error);

    return NextResponse.json(
      {
        error:
          "The request could not be submitted right now. Please try again or contact support@lawgx.ai.",
      },
      { status: 500 },
    );
  }
}
