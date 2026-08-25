// Supabase Edge Function: send-inquiry
// Emails a new leasing lead to the leasing inbox AND sends the submitter a
// confirmation ("received — the Al Hamra team will contact you soon").
//
// Uses Resend (https://resend.com). Set these secrets on the function:
//   RESEND_API_KEY   - your Resend API key (required to actually send)
//   LEASING_INBOX    - optional, defaults to leasing@alhamra.com.kw
//   MAIL_FROM        - optional, defaults to "Al Hamra Leasing <leasing@alhamra.com.kw>"
//                      (the sending domain must be verified in Resend)
// Deploy with `verify_jwt = false` so the public site can call it.
//
// If RESEND_API_KEY is not set, the function returns ok:false (no crash) — the
// website has already stored the lead in the leasing_inquiries table, so nothing
// is lost while email is being configured.

import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const LEASING_INBOX = Deno.env.get("LEASING_INBOX") ?? "leasing@alhamra.com.kw";
const MAIL_FROM = Deno.env.get("MAIL_FROM") ?? "Al Hamra Leasing <leasing@alhamra.com.kw>";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}

async function sendEmail(payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), { status, headers: { ...cors, "Content-Type": "application/json" } });

  try {
    const { name, email, subject, message, lang } = await req.json();
    if (!RESEND_API_KEY) return json({ ok: false, reason: "RESEND_API_KEY not configured" });
    const ar = lang === "ar";

    // 1) Notify the leasing team (reply-to the prospect).
    await sendEmail({
      from: MAIL_FROM,
      to: [LEASING_INBOX],
      reply_to: email,
      subject: `New Leasing Inquiry — ${subject || name}`,
      html: `<h2 style="font-family:Arial,sans-serif">New leasing inquiry</h2>
        <p style="font-family:Arial,sans-serif"><b>Name:</b> ${esc(name)}<br>
        <b>Email:</b> ${esc(email)}<br>
        <b>Subject:</b> ${esc(subject)}</p>
        <p style="font-family:Arial,sans-serif"><b>Message:</b><br>${esc(message).replace(/\n/g, "<br>")}</p>
        <p style="font-family:Arial,sans-serif;color:#888">Submitted via alhamratower.com (${esc(lang || "en")})</p>`,
    });

    // 2) Confirmation / auto-reply to the prospect, from the leasing mailbox.
    await sendEmail({
      from: MAIL_FROM,
      to: [email],
      subject: ar ? "تم استلام طلبك — برج الحمرا" : "We’ve received your inquiry — Al Hamra Tower",
      html: ar
        ? `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.9">
             <p>عزيزي/عزيزتي ${esc(name)},</p>
             <p>شكراً لتواصلك مع برج الحمرا للأعمال. لقد تم استلام طلبك بنجاح، وسيتواصل معك فريق الحمرا قريباً.</p>
             <p>مع أطيب التحيات،<br>فريق التأجير — برج الحمرا</p>
           </div>`
        : `<div style="font-family:Arial,sans-serif;line-height:1.7">
             <p>Dear ${esc(name)},</p>
             <p>Thank you for contacting Al Hamra Business Tower. Your inquiry has been received successfully, and the Al Hamra team will contact you soon.</p>
             <p>Kind regards,<br>Al Hamra Leasing Team</p>
           </div>`,
    });

    return json({ ok: true });
  } catch (e) {
    console.error("send-inquiry error:", e);
    return json({ ok: false, error: String(e) });
  }
});
