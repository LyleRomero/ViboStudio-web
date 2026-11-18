"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Arrow } from "@/components/ui/Arrow";
import { Chapter } from "@/components/ui/Chapter";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { PREFILL_EVENT } from "@/components/ui/QuoteButton";
import { Reveal } from "@/components/ui/Reveal";
import { contact, contactEndpoint } from "@/data/site";
import { serviceLines } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1] as const;

const serviceOptions = [
  ...serviceLines.map((line) => line.title),
  "PLANES DE CONTENIDO",
  "OTRO",
];

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "handoff" }
  | { kind: "error"; message: string };

type Fields = { name: string; email: string; service: string; message: string };

const empty: Fields = { name: "", email: "", service: "", message: "" };

/**
 * Chapter 08: contact.
 *
 * The form posts to NEXT_PUBLIC_CONTACT_ENDPOINT when one is configured. Until
 * then it hands the message to WhatsApp, already written out, and says so. It
 * never reports a delivery that did not happen.
 */
export function Contact() {
  const reduce = useReducedMotion();
  const fieldId = useId();
  const serviceRef = useRef<HTMLSelectElement>(null);
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // "Cotizar mi plan" and the rate card carry their context into the form.
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      const match = serviceOptions.find(
        (option) => option.toLowerCase() === detail.toLowerCase(),
      );
      setFields((previous) => ({ ...previous, service: match ?? "OTRO" }));
      window.setTimeout(() => serviceRef.current?.focus(), 700);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const update = (key: keyof Fields) => (value: string) => {
    setFields((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
    if (status.kind !== "idle") setStatus({ kind: "idle" });
  };

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) next.name = "Escribe tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
      next.email = "Revisa el correo: no tiene un formato válido.";
    }
    if (!fields.service) next.service = "Elige el tipo de servicio.";
    if (fields.message.trim().length < 10) {
      next.message = "Cuéntanos un poco más, al menos 10 caracteres.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    if (!contactEndpoint) {
      const text = [
        `Hola VIBO STUDIO, soy ${fields.name.trim()}.`,
        `Me interesa: ${fields.service}.`,
        fields.message.trim(),
        `Mi correo: ${fields.email.trim()}`,
      ].join("\n");
      window.open(
        `${contact.whatsappUrl}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener",
      );
      setStatus({ kind: "handoff" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) throw new Error(String(response.status));
      setFields(empty);
      setStatus({ kind: "sent" });
    } catch {
      setStatus({
        kind: "error",
        message: `No pudimos enviar el mensaje. Escríbenos por WhatsApp al ${contact.whatsappNumber}.`,
      });
    }
  };

  return (
    <Chapter id="contacto" surface="acid">
      <ChapterLabel number="08" title="LET'S TALK" aside="RESPUESTA EN HORAS HÁBILES" />

      <Reveal className="mt-[clamp(2.5rem,6vw,4.5rem)]">
        <h2 className="disp text-[clamp(2.6rem,9.5vw,8.5rem)]">
          HABLEMOS
          <br />
          DE TU PRÓXIMO
          <br />
          PROYECTO.
        </h2>
      </Reveal>

      <div className="mt-[clamp(3rem,7vw,5.5rem)] grid gap-x-16 gap-y-[clamp(3rem,6vw,4rem)] lg:grid-cols-12">
        {/* ---------- direct channels ---------- */}
        <Reveal className="lg:col-span-5">
          <p className="mono border-t border-ink/30 pt-4">CANALES DIRECTOS</p>

          <dl className="mt-5">
            {[
              {
                term: "WHATSAPP",
                value: contact.whatsappNumber,
                href: contact.whatsappUrl,
                external: true,
              },
              {
                term: "EMAIL",
                value: contact.email,
                href: `mailto:${contact.email}`,
                external: false,
              },
              {
                term: "INSTAGRAM",
                value: contact.instagram,
                href: contact.instagramUrl,
                external: true,
              },
            ].map((row) => (
              <div
                key={row.term}
                className="grid grid-cols-1 items-baseline gap-1 border-b border-ink/25 py-3.5 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
              >
                <dt className="mono">{row.term}</dt>
                <dd className="min-w-0">
                  <a
                    href={row.href}
                    className="ed-link inline-flex min-h-11 max-w-full items-center break-all text-[1.05rem]"
                    {...(row.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {row.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap items-end gap-7">
            <div>
              <Image
                src="/brand/whatsapp-qr.svg"
                alt={`Código QR que abre una conversación de WhatsApp con ${contact.whatsappNumber}`}
                width={132}
                height={132}
                className="size-[7.5rem] md:size-[8.25rem]"
              />
              <p className="mono mt-3 max-w-[9rem] leading-[1.5]">
                ESCANEA PARA
                <br />
                ESCRIBIRNOS
              </p>
            </div>

            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ink"
            >
              INICIAR CONVERSACIÓN
              <Arrow className="w-[1.9em]" />
            </a>
          </div>
        </Reveal>

        {/* ---------- form ---------- */}
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <form onSubmit={onSubmit} noValidate>
            <p className="mono border-t border-ink/30 pt-4">
              CUÉNTANOS TU PROYECTO
            </p>

            <div className="mt-7 grid gap-7 sm:grid-cols-2">
              <Field
                id={`${fieldId}-name`}
                label="NOMBRE"
                error={errors.name}
                value={fields.name}
                onChange={update("name")}
                autoComplete="name"
              />
              <Field
                id={`${fieldId}-email`}
                label="CORREO"
                type="email"
                error={errors.email}
                value={fields.email}
                onChange={update("email")}
                autoComplete="email"
              />
            </div>

            <div className="mt-7">
              <label htmlFor={`${fieldId}-service`} className="mono block">
                TIPO DE SERVICIO
              </label>
              <div className="relative">
                <select
                  ref={serviceRef}
                  id={`${fieldId}-service`}
                  className="field pr-8"
                  value={fields.service}
                  onChange={(event) => update("service")(event.target.value)}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={
                    errors.service ? `${fieldId}-service-error` : undefined
                  }
                >
                  <option value="">Elige una opción</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-3.5 right-1 h-2 w-2 rotate-45 border-b border-r border-current"
                />
              </div>
              {errors.service ? (
                <p id={`${fieldId}-service-error`} className="mono mt-2">
                  {errors.service}
                </p>
              ) : null}
            </div>

            <div className="mt-7">
              <label htmlFor={`${fieldId}-message`} className="mono block">
                MENSAJE
              </label>
              <textarea
                id={`${fieldId}-message`}
                rows={4}
                className="field resize-y"
                value={fields.message}
                onChange={(event) => update("message")(event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? `${fieldId}-message-error` : undefined
                }
              />
              {errors.message ? (
                <p id={`${fieldId}-message-error`} className="mono mt-2">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                type="submit"
                className="btn btn-line"
                disabled={status.kind === "sending"}
              >
                {status.kind === "sending" ? "ENVIANDO" : "ENVIAR MENSAJE"}
                <Arrow className="w-[1.9em]" />
              </button>

              {!contactEndpoint ? (
                <p className="mono max-w-[22rem] leading-[1.5] opacity-70">
                  TU MENSAJE SE ABRIRÁ EN WHATSAPP LISTO PARA ENVIAR
                </p>
              ) : null}
            </div>

            <div aria-live="polite" className="min-h-[1.5rem]">
              <AnimatePresence mode="wait">
                {status.kind !== "idle" && status.kind !== "sending" ? (
                  <motion.p
                    key={status.kind}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="mt-5 border-t border-ink/30 pt-4 text-[0.95rem] leading-[1.55]"
                  >
                    {status.kind === "sent"
                      ? "Mensaje enviado. Te respondemos al correo que nos dejaste."
                      : null}
                    {status.kind === "handoff"
                      ? "Abrimos WhatsApp con tu mensaje escrito. Pulsa enviar allí para que nos llegue."
                      : null}
                    {status.kind === "error" ? status.message : null}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </Chapter>
  );
}

function Field({
  id,
  label,
  error,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mono block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="field"
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="mono mt-2">
          {error}
        </p>
      ) : null}
    </div>
  );
}
