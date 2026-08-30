// server.js — Local development API server
// Run alongside the Vite dev server to handle the contact form.
// Vite proxies /api/* → this server (port 3001). See vite.config.js.
// Start with: npm run dev:api

import 'dotenv/config';
import http from 'http';

const PORT = 3001;

// ── Input validation ──────────────────────────────────────────────────────────
function validateBody({ name, email, message }) {
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

// ── JSON response helpers ─────────────────────────────────────────────────────
function jsonOk(res, payload) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function jsonError(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

// ── Contact email handler ─────────────────────────────────────────────────────
async function handleSend(req, res) {
  let raw = '';
  req.on('data', (chunk) => { raw += chunk; });
  req.on('end', async () => {
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return jsonError(res, 400, { ok: false, error: 'Invalid request body.' });
    }

    const { name, email, message } = body;
    const errors = validateBody({ name, email, message });
    if (Object.keys(errors).length > 0) {
      return jsonError(res, 422, { ok: false, errors });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || emailUser;

    if (!emailUser || !emailPass) {
      return jsonError(res, 500, {
        ok: false,
        error: 'Email service is not configured. Contact the site owner directly.',
      });
    }

    try {
      const { default: nodemailer } = await import('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: emailUser, pass: emailPass },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      });

      const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

      await Promise.all([
        transporter.sendMail({
          from: `"Portfolio Contact" <${emailUser}>`,
          to: emailTo,
          replyTo: email,
          subject: `Portfolio message from ${name}`,
          text: [
            'New message via your portfolio contact form',
            '',
            `Name:    ${name}`,
            `Email:   ${email}`,
            `Date:    ${timestamp}`,
            '',
            'Message:',
            '--------',
            message,
            '',
            `Reply to this email to respond directly to ${name}.`,
          ].join('\n'),
        }),
        transporter.sendMail({
          from: `"Fahim Yusuf" <${emailUser}>`,
          to: email,
          subject: `Thanks for reaching out, ${name.split(' ')[0]}!`,
          text: [
            `Hi ${name.split(' ')[0]},`,
            '',
            "Thanks for your message! I've received it and will get back to you as soon as possible — typically within 24–48 hours.",
            '',
            'Best,',
            'Fahim Yusuf',
            'Software Engineer & AI/ML Researcher',
          ].join('\n'),
        }),
      ]);

      return jsonOk(res, { ok: true, message: 'Message sent successfully.' });

    } catch (err) {
      // Log diagnostics server-side only — never expose credentials or SMTP internals to the client
      if (err.code === 'EAUTH') {
        console.error('[api/send] Gmail authentication failed.');
        console.error('  → Ensure EMAIL_PASS in .env is a valid Gmail App Password.');
        console.error('  → Visit https://myaccount.google.com/apppasswords to generate one.');
      } else if (err.code === 'ESOCKET' || err.code === 'ETIMEDOUT') {
        console.error('[api/send] Network timeout connecting to mail server.');
      } else {
        console.error('[api/send] Unexpected error:', err.message || err.code || 'UNKNOWN');
      }

      return jsonError(res, 500, {
        ok: false,
        error: 'Failed to send message. Please try again or email directly to fahim.yusuf06@gmail.com.',
      });
    }
  });
}

// ── HTTP server ───────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/send') {
    handleSend(req, res);
    return;
  }

  jsonError(res, 404, { error: 'Not found.' });
});

server.listen(PORT, () => {
  const userSet = process.env.EMAIL_USER ? 'configured' : 'NOT SET';
  const passSet = process.env.EMAIL_PASS ? 'configured' : 'NOT SET';
  console.log(`\n  API server   http://localhost:${PORT}`);
  console.log(`  EMAIL_USER   ${userSet}`);
  console.log(`  EMAIL_PASS   ${passSet}\n`);
});
