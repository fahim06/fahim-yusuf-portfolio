// api/send.js
// Vercel Serverless Function — POST /api/send
// Sends the contact form message via Gmail SMTP and dispatches an auto-reply.
// Environment variables required: EMAIL_USER, EMAIL_PASS, EMAIL_TO (optional).

import nodemailer from 'nodemailer';

// ── CORS headers ──────────────────────────────────────────────────────────────
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// ── Input validation ──────────────────────────────────────────────────────────
function validate({ name, email, message }) {
  const errors = {};
  const safeName = typeof name === 'string' ? name.trim() : '';
  const safeEmail = typeof email === 'string' ? email.trim() : '';
  const safeMessage = typeof message === 'string' ? message.trim() : '';

  if (!safeName || safeName.length < 2)
    errors.name = 'Name must be at least 2 characters.';
  if (!safeEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail))
    errors.email = 'A valid email address is required.';
  if (!safeMessage || safeMessage.length < 10)
    errors.message = 'Message must be at least 10 characters.';
  return errors;
}

// ── HTML escaping ─────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Nodemailer transporter ────────────────────────────────────────────────────
function createTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    throw new Error('EMAIL_USER and EMAIL_PASS environment variables are required.');
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    connectionTimeout: 10000, // 10s timeout
    greetingTimeout: 10000,
    socketTimeout: 15000
  });
}

// ── Owner notification email ──────────────────────────────────────────────────
function buildOwnerEmail({ name, email, message }) {
  const to = process.env.EMAIL_TO || process.env.EMAIL_USER;
  const from = process.env.EMAIL_USER;
  const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

  return {
    from: `"Portfolio Contact" <${from}>`,
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: [
      'New message via your portfolio contact form',
      '',
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Date:    ${date}`,
      '',
      'Message:',
      '--------',
      message,
      '',
      `Reply to this email to respond directly to ${name}.`,
    ].join('\n'),
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>body{background:#0a0a0a;color:#e8e8e8;font-family:'Helvetica Neue',Arial,sans-serif;margin:0;padding:0}.wrapper{max-width:560px;margin:40px auto;background:#111;border:1px solid rgba(255,255,255,0.08)}.header{padding:32px 40px;border-bottom:1px solid rgba(255,255,255,0.06)}.header h1{margin:0;font-size:22px;font-weight:300;letter-spacing:.12em}.accent{color:#4ecca3}.body{padding:32px 40px}.field{margin-bottom:20px}.label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#888;margin-bottom:4px}.value{font-size:15px;color:#e8e8e8}.msg{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);padding:20px;font-size:14px;line-height:1.8;color:#a0a0a0;white-space:pre-wrap}.footer{padding:20px 40px;border-top:1px solid rgba(255,255,255,.06);font-size:11px;color:#555}</style></head><body><div class="wrapper"><div class="header"><h1><span class="accent">FY</span> &middot; Portfolio Message</h1></div><div class="body"><div class="field"><div class="label">From</div><div class="value">${escapeHtml(name)}</div></div><div class="field"><div class="label">Reply-to Email</div><div class="value"><a href="mailto:${escapeHtml(email)}" style="color:#4ecca3">${escapeHtml(email)}</a></div></div><div class="field"><div class="label">Received</div><div class="value">${date}</div></div><div class="field"><div class="label">Message</div><div class="msg">${escapeHtml(message)}</div></div></div><div class="footer">Reply to this email to respond directly to ${escapeHtml(name)}. Sent via portfolio contact form.</div></div></body></html>`,
  };
}

// ── Auto-reply to sender ──────────────────────────────────────────────────────
function buildAutoReply({ name, email }) {
  const from = process.env.EMAIL_USER;
  const firstName = escapeHtml((name || '').split(' ')[0]);

  return {
    from: `"Fahim Yusuf" <${from}>`,
    to: email,
    subject: `Thanks for reaching out, ${(name || '').split(' ')[0]}!`,
    text: [
      `Hi ${(name || '').split(' ')[0]},`,
      '',
      "Thanks for your message! I've received it and will get back to you as soon as possible — typically within 24–48 hours.",
      '',
      'Best,',
      'Fahim Yusuf',
      'Software Engineer & AI/ML Researcher',
    ].join('\n'),
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>body{background:#0a0a0a;color:#e8e8e8;font-family:'Helvetica Neue',Arial,sans-serif;margin:0;padding:0}.wrapper{max-width:560px;margin:40px auto;background:#111;border:1px solid rgba(255,255,255,0.08)}.header{padding:32px 40px;border-bottom:1px solid rgba(255,255,255,0.06)}.header h1{margin:0;font-size:22px;font-weight:300;letter-spacing:.12em}.accent{color:#4ecca3}.body{padding:32px 40px;font-size:15px;line-height:1.8;color:#a0a0a0}.body p{margin:0 0 16px}.sig{margin-top:24px;color:#e8e8e8;font-size:14px}.sig strong{display:block;font-weight:500;letter-spacing:.04em}.sig small{color:#888;font-size:12px}.footer{padding:20px 40px;border-top:1px solid rgba(255,255,255,.06);font-size:11px;color:#555}</style></head><body><div class="wrapper"><div class="header"><h1><span class="accent">FY</span> &middot; Fahim Yusuf</h1></div><div class="body"><p>Hi ${firstName},</p><p>Thanks for your message! I've received it and will get back to you as soon as possible &mdash; typically within 24&ndash;48 hours.</p><p>If your matter is urgent, reach me at <a href="mailto:fahim.yusuf06@gmail.com" style="color:#4ecca3">fahim.yusuf06@gmail.com</a>.</p><div class="sig"><strong>Fahim Yusuf</strong><small>Software Engineer &amp; AI/ML Researcher</small></div></div><div class="footer">This is an automated confirmation. Please do not reply to this email.</div></div></body></html>`,
  };
}

// ── Request handler ───────────────────────────────────────────────────────────
export default async function handler(req, res) {
  try {
    setCors(res);

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ ok: false, error: 'Method not allowed. Use POST.' });
      return;
    }

    // Safely parse request body
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        res.status(400).json({ ok: false, error: 'Malformed JSON payload.' });
        return;
      }
    }

    if (!body || typeof body !== 'object') {
      res.status(400).json({ ok: false, error: 'Request body is required.' });
      return;
    }

    const { name, email, message } = body;
    const errors = validate({ name, email, message });
    if (Object.keys(errors).length > 0) {
      res.status(422).json({ ok: false, errors });
      return;
    }

    let transporter;
    try {
      transporter = createTransporter();
    } catch (e) {
      console.error('[api/send] Missing environment variables.');
      res.status(500).json({
        ok: false,
        error: 'Email service is temporarily unconfigured. Please contact directly via email.',
      });
      return;
    }


    await Promise.all([
      transporter.sendMail(buildOwnerEmail({ name, email, message })),
      transporter.sendMail(buildAutoReply({ name, email })),
    ]);

    res.status(200).json({ ok: true, message: 'Message sent successfully.' });
  } catch (err) {
    if (err.code === 'EAUTH') {
      console.error('[api/send] Gmail authentication failed. Check EMAIL_PASS in environment variables.');
    } else if (err.code === 'ESOCKET' || err.code === 'ETIMEDOUT') {
      console.error('[api/send] Network timeout connecting to mail server:', err.code);
    } else {
      console.error('[api/send] Unexpected error:', err.message || err.code || 'UNKNOWN');
    }

    res.status(500).json({
      ok: false,
      error: 'Failed to send message. Please try again or email directly to fahim.yusuf06@gmail.com.',
    });
  }
}

