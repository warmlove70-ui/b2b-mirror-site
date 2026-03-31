# ZEKSmart Export Website

Runnable B2B export website for ZEKSmart, built with Next.js and Tailwind CSS.

## Pages

- Home
- Products
- For Importers
- For Designers
- For Projects
- Contact
- Admin Leads

## Tech Stack

- Next.js 14 App Router
- React 18
- Tailwind CSS 3
- TypeScript

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Lead Capture Features

- Floating smart chat widget in the bottom-right corner
- Lead capture form with Name / Company / Email / Need
- Server-side lead save API: `/api/leads`
- Lead storage file: `data/leads.json`
- Admin lead inbox: `/admin/leads`
- CSV export: `/api/leads/export`
- Admin login protection via `ADMIN_PASSWORD`
- Optional automatic email notification when SMTP is configured

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

Required for admin protection:

- `ADMIN_PASSWORD`

Optional for automatic lead email notifications:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `LEAD_NOTIFY_TO`

If SMTP variables are not configured, lead capture still works normally. The system will save leads locally and skip email sending.

## Notes

- WhatsApp number is connected to the floating smart chat widget.
- Lead data is currently stored locally in JSON for fast deployment.
- Email notification is deployment-ready, but requires SMTP credentials.
- For production, you can later extend this to Google Sheet, CRM, or database storage.
