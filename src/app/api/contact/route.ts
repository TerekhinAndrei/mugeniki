import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO = "andrei@terekhindt.com";
const FROM = "Mugeniki Contact <onboarding@resend.dev>";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { company, name, email, industry, interests, message } = body;

    const interestList = Array.isArray(interests) && interests.length
      ? interests.join(", ")
      : "—";

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New inquiry from ${company}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6b6b6b;margin-bottom:24px">
            Mugeniki — New Inquiry
          </p>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;color:#6b6b6b;font-size:12px;width:140px">Company</td><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;font-size:14px">${company}</td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;color:#6b6b6b;font-size:12px">Name</td><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;font-size:14px">${name}</td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;color:#6b6b6b;font-size:12px">Email</td><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;font-size:14px"><a href="mailto:${email}" style="color:#0a0a0a">${email}</a></td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;color:#6b6b6b;font-size:12px">Industry</td><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;font-size:14px">${industry || "—"}</td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;color:#6b6b6b;font-size:12px">Looking for</td><td style="padding:12px 0;border-bottom:1px solid #e0e0e0;font-size:14px">${interestList}</td></tr>
            <tr><td style="padding:12px 0;color:#6b6b6b;font-size:12px;vertical-align:top">Message</td><td style="padding:12px 0;font-size:14px;line-height:1.7">${message || "—"}</td></tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
