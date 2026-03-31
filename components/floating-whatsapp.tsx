"use client";

import { FormEvent, useMemo, useState } from "react";
import { brand } from "@/components/site-data";

const quickActions = [
  {
    label: "Get Catalog",
    message: "Hello ZEKSmart, please send me your latest mirror catalog.",
  },
  {
    label: "Request Quotation",
    message:
      "Hello ZEKSmart, I would like a quotation for your mirror products. Please contact me.",
  },
  {
    label: "Ask for Sample",
    message: "Hello ZEKSmart, I want to discuss sample options for selected mirror models.",
  },
];

const initialLead = {
  name: "",
  email: "",
  company: "",
  need: "Get Catalog",
};

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState(initialLead);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const defaultChatLink = useMemo(() => {
    const text = encodeURIComponent(
      "Hello ZEKSmart, I am interested in your mirror products. Please share more details.",
    );
    return `${brand.whatsappHref}?text=${text}`;
  }, []);

  function buildLeadMessage() {
    return `Hello ZEKSmart, I want to start an inquiry.\n\nName: ${lead.name}\nCompany: ${lead.company || "Not provided"}\nEmail: ${lead.email}\nNeed: ${lead.need}`;
  }

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      if (!response.ok) {
        throw new Error("Failed to save lead");
      }

      setSubmitted(true);

      const message = buildLeadMessage();
      const whatsappHref = `${brand.whatsappHref}?text=${encodeURIComponent(message)}`;
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
    } catch {
      setError("Lead save failed. Please try again, or use direct WhatsApp below.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div className="w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white shadow-2xl">
          <div className="bg-[#25D366] px-5 py-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/80">Smart Assistant</p>
                <h3 className="mt-1 text-lg font-semibold">Chat with ZEKSmart</h3>
                <p className="mt-1 text-sm text-white/88">
                  Submit your details first, then jump into WhatsApp with a qualified inquiry.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close chat panel"
                onClick={() => setOpen(false)}
                className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold text-white hover:bg-white/25"
              >
                ×
              </button>
            </div>
          </div>

          <div className="space-y-4 bg-[#f7faf8] p-4">
            <div className="rounded-2xl bg-white p-4 text-sm leading-6 text-ink shadow-sm">
              Hi, this is ZEKSmart assistant. Fill in your details and we will save your lead before
              opening WhatsApp.
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-3 rounded-2xl bg-white p-4 shadow-sm">
              <div>
                <label className="mb-2 block text-sm font-medium text-ink/74">Name</label>
                <input
                  required
                  value={lead.name}
                  onChange={(event) => setLead({ ...lead, name: event.target.value })}
                  className="w-full rounded-xl border border-ink/12 bg-sand px-3 py-3 outline-none focus:border-[#25D366]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-ink/74">Company</label>
                <input
                  value={lead.company}
                  onChange={(event) => setLead({ ...lead, company: event.target.value })}
                  className="w-full rounded-xl border border-ink/12 bg-sand px-3 py-3 outline-none focus:border-[#25D366]"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-ink/74">Email</label>
                <input
                  type="email"
                  required
                  value={lead.email}
                  onChange={(event) => setLead({ ...lead, email: event.target.value })}
                  className="w-full rounded-xl border border-ink/12 bg-sand px-3 py-3 outline-none focus:border-[#25D366]"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-ink/74">Need</label>
                <select
                  value={lead.need}
                  onChange={(event) => setLead({ ...lead, need: event.target.value })}
                  className="w-full rounded-xl border border-ink/12 bg-sand px-3 py-3 outline-none focus:border-[#25D366]"
                >
                  <option>Get Catalog</option>
                  <option>Request Quotation</option>
                  <option>Ask for Sample</option>
                  <option>Project Consultation</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Saving Lead..." : "Submit & Open WhatsApp"}
              </button>
              {submitted ? (
                <div className="rounded-xl bg-[#f1fff6] px-3 py-2 text-xs text-ink/75">
                  Lead saved successfully. WhatsApp has been opened with the same inquiry details.
                </div>
              ) : null}
              {error ? <div className="rounded-xl bg-[#fff3f1] px-3 py-2 text-xs text-[#9f3d2e]">{error}</div> : null}
            </form>

            <div className="grid gap-2">
              {quickActions.map((action) => {
                const href = `${brand.whatsappHref}?text=${encodeURIComponent(action.message)}`;
                return (
                  <a
                    key={action.label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-medium text-ink hover:border-[#25D366] hover:bg-[#f1fff6]"
                  >
                    {action.label}
                  </a>
                );
              })}
            </div>

            <div className="rounded-2xl bg-white p-4 text-sm text-ink/75 shadow-sm">
              <p className="font-semibold text-ink">Lead Capture</p>
              <p className="mt-1">WhatsApp: {brand.whatsappDisplay}</p>
              <p>Email: {brand.email}</p>
              <p className="mt-2 text-xs text-ink/60">
                This version stores lead data through a site API first, then opens WhatsApp for fast
                follow-up.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-ink/8 bg-white px-4 py-3">
            <a
              href={defaultChatLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:brightness-95"
            >
              Open WhatsApp
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-ink/12 px-4 py-3 text-sm font-semibold text-ink hover:bg-sand"
            >
              Contact Page
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        aria-label="Open smart customer service"
        onClick={() => setOpen((value) => !value)}
        className="group flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
          WA
        </span>
        <span className="hidden sm:block text-left">
          <span className="block text-xs uppercase tracking-[0.18em] text-white/80">Smart Chat</span>
          <span className="block text-sm font-semibold">在线咨询</span>
        </span>
      </button>
    </div>
  );
}
