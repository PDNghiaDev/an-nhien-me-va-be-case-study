"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { DirectContact } from '@/components/ui/DirectContact';
import type { ConsultFormContent } from "@/lib/types";

type FormData = ConsultFormContent;
type FieldName = "name" | "phone" | "topic" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const emptyValues: Values = { name: "", phone: "", topic: "", message: "" };
const MESSAGE_MAX = 500;

// Bản demo: chỉ kiểm tra phía client, không có fetch/action nào gửi dữ liệu ra ngoài.
function validate(values: Values, form: FormData): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  if (!name) errors.name = form.name.requiredError;
  else if (name.length < 2) errors.name = form.name.invalidError;

  const phone = values.phone.replace(/[\s.()-]/g, "");
  if (!phone) errors.phone = form.phone.requiredError;
  else if (!/^(?:0|\+84)\d{9}$/.test(phone)) errors.phone = form.phone.invalidError;

  if (!values.topic) errors.topic = form.topic.requiredError;

  if (values.message.trim().length > MESSAGE_MAX) errors.message = form.message.invalidError;

  return errors;
}

export function ConsultForm({ form }: { form: FormData }) {
  if (form.mode === 'direct') return <DirectContact data={form.directContact}/>;
  return <DemoConsultForm form={form}/>;
}

function DemoConsultForm({ form }: { form: FormData }) {
  const fieldId = useId();
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "invalid" | "success">("idle");

  const idFor = (field: FieldName) => `${fieldId}-${field}`;
  const errorIdFor = (field: FieldName) => `${fieldId}-${field}-error`;

  const update = (field: FieldName, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) {
      const nextErrors = validate(next, form);
      setErrors(nextErrors);
      setStatus(Object.keys(nextErrors).length > 0 ? "invalid" : "idle");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(values, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("invalid");
      return;
    }
    // Không gửi dữ liệu đi đâu: chỉ reset và báo cho người dùng đây là bản demo.
    setValues(emptyValues);
    setSubmitted(false);
    setStatus("success");
  };

  const fieldProps = (field: FieldName) => ({
    id: idFor(field),
    name: field,
    value: values[field],
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorIdFor(field) : undefined,
  });

  const errorFor = (field: FieldName) =>
    errors[field] ? <p className="consultError" id={errorIdFor(field)}>{errors[field]}</p> : null;

  return <form className="consultForm" noValidate onSubmit={handleSubmit}>
    <h3 className="consultFormTitle">{form.title}</h3>
    <p className="consultFormNote">{form.description}</p>
    <p className="consultDemoNote" role="note">{form.demoNote}</p>

    <div className="consultField">
      <label htmlFor={idFor("name")}>{form.name.label} <span aria-hidden="true">*</span></label>
      <input {...fieldProps("name")} type="text" autoComplete="name" required placeholder={form.name.placeholder} onChange={event => update("name", event.target.value)}/>
      {errorFor("name")}
    </div>

    <div className="consultField">
      <label htmlFor={idFor("phone")}>{form.phone.label} <span aria-hidden="true">*</span></label>
      <input {...fieldProps("phone")} type="tel" inputMode="tel" autoComplete="tel" required placeholder={form.phone.placeholder} onChange={event => update("phone", event.target.value)}/>
      {errorFor("phone")}
    </div>

    <div className="consultField">
      <label htmlFor={idFor("topic")}>{form.topic.label} <span aria-hidden="true">*</span></label>
      <select {...fieldProps("topic")} required onChange={event => update("topic", event.target.value)}>
        <option value="">{form.topic.placeholder}</option>
        {form.topic.options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      {errorFor("topic")}
    </div>

    <div className="consultField">
      <label htmlFor={idFor("message")}>{form.message.label}</label>
      <textarea {...fieldProps("message")} rows={3} maxLength={MESSAGE_MAX} placeholder={form.message.placeholder} onChange={event => update("message", event.target.value)}/>
      {errorFor("message")}
    </div>

    <button className="consultSubmit" type="submit">{form.submitLabel}</button>

    <div className="consultStatus" role="status" aria-live="polite">
      {status === "success" && <p className="consultSuccess">
        <CheckCircle2 aria-hidden="true" size={18}/>{form.successMessage}
      </p>}
      {status === "invalid" && <p className="consultInvalid">{form.errorSummary}</p>}
    </div>
  </form>;
}
