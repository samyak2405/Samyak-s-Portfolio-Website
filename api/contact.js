import { Resend } from 'resend';
import { checkRateLimit, incrementCount } from './_rateLimiter.js';

export default async function handler(req, res) {
  // ── Method guard ──────────────────────────────────────────────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Field validation ──────────────────────────────────────────────────────
  const name    = (req.body?.name    ?? '').trim();
  const email   = (req.body?.email   ?? '').trim();
  const message = (req.body?.message ?? '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }

  // ── Rate limit check ──────────────────────────────────────────────────────
  const { allowed, count, limit } = await checkRateLimit();

  if (!allowed) {
    return res.status(429).json({
      error:       'Contact limit reached for this month. Please email me directly.',
      directEmail: process.env.CONTACT_EMAIL,
    });
  }

  // ── Send email via Resend ─────────────────────────────────────────────────
  const resend = new Resend(process.env.RESEND_API_KEY);

  const submissionNumber = count + 1;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f9f9f9;font-family:system-ui,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#0a0a10;padding:28px 32px;">
      <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.4);">Portfolio Contact Form</p>
      <h1 style="margin:8px 0 0;font-size:22px;color:#ede8de;font-weight:500;">New message from ${name}</h1>
      <p style="margin:6px 0 0;font-size:14px;color:#c8a96e;">${email}</p>
    </div>

    <!-- Message body -->
    <div style="padding:32px;">
      <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#999;">Message</p>
      <div style="background:#f5f5f5;border-radius:8px;padding:20px;">
        <pre style="margin:0;white-space:pre-wrap;font-family:inherit;font-size:15px;line-height:1.7;color:#333;">${message}</pre>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:0 32px 28px;border-top:1px solid #f0f0f0;">
      <p style="margin:20px 0 4px;font-size:12px;color:#aaa;">Sent via portfolio contact form</p>
      <p style="margin:0;font-size:12px;color:#ccc;">Submission ${submissionNumber} of ${limit} this month</p>
    </div>

  </div>
</body>
</html>`;

  try {
    await resend.emails.send({
      from:     'Portfolio Contact <onboarding@resend.dev>',
      to:       process.env.CONTACT_EMAIL,
      reply_to: email,
      subject:  `[Portfolio] New message from ${name}`,
      html,
    });
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }

  // ── Increment counter after successful send ────────────────────────────────
  const newCount = await incrementCount();

  return res.status(200).json({
    success:   true,
    remaining: limit - newCount,
  });
}
