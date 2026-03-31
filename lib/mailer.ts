import nodemailer from "nodemailer";
import type { Lead } from "@/lib/leads";

function getEnv(name: string) {
  return process.env[name]?.trim() || "";
}

export function isMailerConfigured() {
  return Boolean(
    getEnv("SMTP_HOST") &&
      getEnv("SMTP_PORT") &&
      getEnv("SMTP_USER") &&
      getEnv("SMTP_PASS") &&
      getEnv("LEAD_NOTIFY_TO"),
  );
}

export async function sendLeadNotification(lead: Lead) {
  if (!isMailerConfigured()) {
    return { ok: false, skipped: true, reason: "SMTP not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: getEnv("SMTP_HOST"),
    port: Number(getEnv("SMTP_PORT")),
    secure: Number(getEnv("SMTP_PORT")) === 465,
    auth: {
      user: getEnv("SMTP_USER"),
      pass: getEnv("SMTP_PASS"),
    },
  });

  const to = getEnv("LEAD_NOTIFY_TO");
  const from = getEnv("SMTP_FROM") || getEnv("SMTP_USER");
  const subject = `[ZEKSmart Lead] ${lead.need} - ${lead.name}`;
  const text = [
    "New website lead captured.",
    "",
    `Name: ${lead.name}`,
    `Company: ${lead.company || "Not provided"}`,
    `Email: ${lead.email}`,
    `Need: ${lead.need}`,
    `Source: ${lead.source}`,
    `Created At: ${lead.createdAt}`,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
      <h2 style="margin-bottom: 12px;">New website lead captured</h2>
      <table cellpadding="8" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(lead.name)}</td></tr>
        <tr><td><strong>Company</strong></td><td>${escapeHtml(lead.company || "Not provided")}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email)}</td></tr>
        <tr><td><strong>Need</strong></td><td>${escapeHtml(lead.need)}</td></tr>
        <tr><td><strong>Source</strong></td><td>${escapeHtml(lead.source)}</td></tr>
        <tr><td><strong>Created At</strong></td><td>${escapeHtml(lead.createdAt)}</td></tr>
      </table>
    </div>
  `;

  await transporter.sendMail({ from, to, subject, text, html });
  return { ok: true };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
