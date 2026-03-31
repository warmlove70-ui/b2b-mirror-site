"use client";

import { FormEvent, ReactNode, useState } from "react";
import { brand } from "@/components/site-data";

const initialState = {
  name: "",
  company: "",
  email: "",
  interest: "Request Quotation",
  message: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-[2rem] border border-ink/10 bg-white/85 p-6 shadow-soft sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper">Inquiry Form</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Tell us what you need.</h2>
        <p className="mt-3 text-sm leading-6 text-ink/72">
          This is a frontend-ready B2B inquiry form. It currently confirms on-page and is ready for
          the next step of API, email, or CRM integration.
        </p>
      </div>
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <Field label="Name">
          <input
            required
            className="w-full rounded-2xl border border-ink/12 bg-sand px-4 py-3 outline-none focus:border-teal"
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
          />
        </Field>
        <Field label="Company">
          <input
            required
            className="w-full rounded-2xl border border-ink/12 bg-sand px-4 py-3 outline-none focus:border-teal"
            value={formData.company}
            onChange={(event) => setFormData({ ...formData, company: event.target.value })}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            required
            className="w-full rounded-2xl border border-ink/12 bg-sand px-4 py-3 outline-none focus:border-teal"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
          />
        </Field>
        <Field label="Inquiry Type">
          <select
            className="w-full rounded-2xl border border-ink/12 bg-sand px-4 py-3 outline-none focus:border-teal"
            value={formData.interest}
            onChange={(event) => setFormData({ ...formData, interest: event.target.value })}
          >
            <option>Request Quotation</option>
            <option>Get Catalog</option>
            <option>Ask for Sample</option>
            <option>Project Consultation</option>
          </select>
        </Field>
        <Field label="Message" className="sm:col-span-2">
          <textarea
            required
            rows={5}
            className="w-full rounded-2xl border border-ink/12 bg-sand px-4 py-3 outline-none focus:border-teal"
            placeholder="Share product category, target market, quantity range, customization needs, or project details."
            value={formData.message}
            onChange={(event) => setFormData({ ...formData, message: event.target.value })}
          />
        </Field>
        <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-sand hover:bg-teal"
          >
            Send Inquiry
          </button>
          <a
            href={brand.whatsappHref}
            className="inline-flex items-center justify-center rounded-full border border-ink/12 bg-sand px-5 py-3 text-sm font-semibold text-ink hover:bg-white"
          >
            {brand.whatsappDisplay}
          </a>
          <a
            href={`mailto:${brand.email}`}
            className="inline-flex items-center justify-center rounded-full border border-ink/12 bg-sand px-5 py-3 text-sm font-semibold text-ink hover:bg-white"
          >
            {brand.email}
          </a>
        </div>
        {submitted ? (
          <div className="sm:col-span-2 rounded-2xl bg-mist px-4 py-3 text-sm text-ink">
            Inquiry captured in demo mode. Next step: connect this form to an API route, mailbox,
            or CRM workflow for live lead delivery.
          </div>
        ) : null}
      </form>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium text-ink/74">{label}</span>
      {children}
    </label>
  );
}
