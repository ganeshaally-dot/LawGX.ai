import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BookingPayload = {
  fullName?: string;
  email?: string;
  company?: string;
  jurisdiction?: string;
  preferredDate?: string;
  preferredTime?: string;
  matterSummary?: string;
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

    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const jurisdiction = body.jurisdiction?.trim() ?? "";
    const preferredDate = body.preferredDate?.trim() ?? "";
    const preferredTime = body.preferredTime?.trim() ?? "";
    const matterSummary = body.matterSummary?.trim() ?? "";

    if (!fullName || !email || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: "Full name, email, preferred date, and preferred time are required." },
        { status: 400 },
      );
    }

    const safe = {
      fullName: escapeHtml(fullName),
      email: escapeHtml(email),
      company: escapeHtml(company || "Not provided"),
      jurisdiction: escapeHtml(jurisdiction || "Not provided"),
      preferredDate: escapeHtml(preferredDate),
      preferredTime: escapeHtml(preferredTime),
      matterSummary: escapeHtml(matterSummary || "Not provided"),
    };

    await resend.emails.send({
      from: "LawGX Bookings <noreply@lawgx.ai>",
      to: ["support@lawgx.ai"],
      replyTo: email,
      subject: `New consultation request from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
          <h2 style="margin-bottom: 16px;">New LawGX consultation request</h2>
          <p><strong>Name:</strong> ${safe.fullName}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Company / group:</strong> ${safe.company}</p>
          <p><strong>Jurisdiction(s):</strong> ${safe.jurisdiction}</p>
          <p><strong>Preferred date:</strong> ${safe.preferredDate}</p>
          <p><strong>Preferred time:</strong> ${safe.preferredTime}</p>
          <p><strong>Matter summary:</strong><br/>${safe.matterSummary.replaceAll("\n", "<br/>")}</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: "LawGX <noreply@lawgx.ai>",
      to: [email],
      subject: "We received your LawGX consultation request",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
          <h2 style="margin-bottom: 16px;">Consultation request received</h2>
          <p>Dear ${safe.fullName},</p>
          <p>Thank you for requesting a consultation with LawGX. We have received your preferred slot and intake details.</p>
          <p><strong>Preferred date:</strong> ${safe.preferredDate}<br/>
          <strong>Preferred time:</strong> ${safe.preferredTime}</p>
          <p>Our team will review the request and revert to you from <strong>support@lawgx.ai</strong> to confirm the appointment or propose the next available option.</p>
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
          "The booking request could not be submitted right now. Please try again or contact support@lawgx.ai.",
      },
      { status: 500 },
    );
  }
}