"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import type { NewsletterContent } from "@/lib/types";
import { DirectContact } from '@/components/ui/DirectContact';

// Bản demo: email chỉ được kiểm tra trên trình duyệt, không gọi API và không lưu lại.
export function FooterNewsletter({ data }: { data: NewsletterContent }) {
  if (data.mode === 'direct') return <DirectContact data={data.directContact} compact/>;
  return <DemoNewsletter data={data}/>;
}

function DemoNewsletter({ data }: { data: NewsletterContent }) {
  const baseId = useId();
  const inputId = `${baseId}-email`;
  const errorId = `${baseId}-error`;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const check = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return data.field.requiredError;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return data.field.invalidError;
    return "";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = check(email);
    setError(message);
    if (message) { setDone(false); return; }
    setEmail("");
    setDone(true);
  };

  return <form className="footerNewsletter" noValidate onSubmit={handleSubmit}>
    <h2>{data.title}</h2>
    <p className="footerNewsletterNote">{data.description}</p>
    <p className="footerNewsletterDemo" role="note">{data.note}</p>
    <div className="footerNewsletterRow">
      <label className="srOnly" htmlFor={inputId}>{data.field.label}</label>
      <input
        id={inputId}
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder={data.field.placeholder}
        value={email}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={event => { setEmail(event.target.value); if (error) setError(check(event.target.value)); }}
      />
      <button type="submit">{data.buttonLabel}</button>
    </div>
    {error && <p className="footerNewsletterError" id={errorId}>{error}</p>}
    <div className="footerNewsletterStatus" role="status" aria-live="polite">
      {done && <p>{data.successMessage}</p>}
    </div>
  </form>;
}
