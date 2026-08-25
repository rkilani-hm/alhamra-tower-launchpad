// Supabase Edge Function: send-inquiry
// Sends leasing-inquiry email FROM the real Microsoft 365 mailbox
// leasing@alhamra.com.kw using Microsoft Graph (app-only / client credentials):
//   1) a notification to the leasing inbox (reply-to = the prospect)
//   2) a bilingual confirmation to the prospect ("received — team will contact soon")
//
// Required function secrets (Supabase → Edge Functions → send-inquiry → Secrets):
//   MS_TENANT_ID       Azure AD tenant (directory) ID
//   MS_CLIENT_ID       App registration (client) ID
//   MS_CLIENT_SECRET   App registration client secret value
//   LEASING_MAILBOX    optional, defaults to leasing@alhamra.com.kw
//
// Azure setup (one-time): register an app → Microsoft Graph → APPLICATION
// permission "Mail.Send" → grant admin consent. Strongly recommended: add an
// Exchange ApplicationAccessPolicy restricting the app to ONLY send as the
// leasing mailbox. Deploy this function with `verify_jwt = false`.
//
// If credentials are absent the function returns ok:false (no crash); the site
// has already stored the lead in the leasing_inquiries table, so nothing is lost.

import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const TENANT = Deno.env.get("MS_TENANT_ID");
const CLIENT_ID = Deno.env.get("MS_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("MS_CLIENT_SECRET");
const MAILBOX = Deno.env.get("LEASING_MAILBOX") ?? "leasing@alhamra.com.kw";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}

async function getToken(): Promise<string> {
  const body = new URLSearchParams({
    client_id: CLIENT_ID!,
    client_secret: CLIENT_SECRET!,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });
  const res = await fetch(`https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(`token ${res.status}: ${await res.text()}`);
  return (await res.json()).access_token as string;
}

async function graphSend(token: string, message: Record<string, unknown>) {
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(MAILBOX)}/sendMail`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ message, saveToSentItems: true }),
    },
  );
  // Graph returns 202 Accepted on success.
  if (res.status !== 202 && !res.ok) throw new Error(`graph ${res.status}: ${await res.text()}`);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), { status, headers: { ...cors, "Content-Type": "application/json" } });

  try {
    const { name, email, subject, message, lang } = await req.json();
    if (!TENANT || !CLIENT_ID || !CLIENT_SECRET) {
      return json({ ok: false, reason: "M365 app credentials not configured" });
    }
    const token = await getToken();
    const ar = lang === "ar";

    // 1) Notify the leasing team — from leasing@, reply-to the prospect.
    await graphSend(token, {
      subject: `New Leasing Inquiry — ${subject || name}`,
      body: {
        contentType: "HTML",
        content: `<h2 style="font-family:Arial,sans-serif">New leasing inquiry</h2>
          <p style="font-family:Arial,sans-serif"><b>Name:</b> ${esc(name)}<br>
          <b>Email:</b> ${esc(email)}<br>
          <b>Subject:</b> ${esc(subject)}</p>
          <p style="font-family:Arial,sans-serif"><b>Message:</b><br>${esc(message).replace(/\n/g, "<br>")}</p>
          <p style="font-family:Arial,sans-serif;color:#888">Submitted via alhamratower.com (${esc(lang || "en")})</p>`,
      },
      toRecipients: [{ emailAddress: { address: MAILBOX } }],
      replyTo: [{ emailAddress: { address: email } }],
    });

    // 2) Confirmation / auto-reply to the prospect — from leasing@.
    await graphSend(token, {
      subject: ar ? "تم استلام طلبك — برج الحمرا" : "We’ve received your inquiry — Al Hamra Tower",
      body: {
        contentType: "HTML",
        content: ar
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
      },
      toRecipients: [{ emailAddress: { address: email } }],
    });

    return json({ ok: true });
  } catch (e) {
    console.error("send-inquiry error:", e);
    return json({ ok: false, error: String(e) });
  }
});
