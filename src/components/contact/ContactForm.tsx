"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { AlertCircle, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import {
  sendContactMessage,
  type ContactState,
} from "@/app/[locale]/contact/actions";
import { CONTACT_DETAILS } from "@/data/legal";

const INITIAL: ContactState = { status: "idle" };

function SubmitButton() {
  const t = useTranslations("Contact");
  // Reads the parent form's state, so the label flips without extra wiring.
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? t("sending") : t("send")}
    </Button>
  );
}

export function ContactForm() {
  const t = useTranslations("Contact");
  const id = useId();
  const [state, action] = useActionState(sendContactMessage, INITIAL);

  if (state.status === "sent") {
    return (
      <div className="rounded-card border border-line bg-surface p-6 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-positive-100 text-positive">
          <MailCheck aria-hidden className="size-6" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-ink">{t("sentTitle")}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {t("sentBody")}
        </p>
      </div>
    );
  }

  if (state.status === "unavailable") {
    return (
      <div className="rounded-card border border-line bg-accent-100/60 p-5">
        <h3 className="font-semibold text-ink">{t("fallbackTitle")}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {t("fallbackBody")}
        </p>
        <a
          href={`mailto:${CONTACT_DETAILS.general}`}
          dir="ltr"
          className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline"
        >
          {CONTACT_DETAILS.general}
        </a>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("name")} htmlFor={`${id}-name`}>
          <Input id={`${id}-name`} name="name" autoComplete="name" maxLength={120} />
        </Field>
        <Field label={t("email")} htmlFor={`${id}-email`}>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            dir="ltr"
            maxLength={254}
          />
        </Field>
      </div>

      <Field label={t("subject")} htmlFor={`${id}-subject`}>
        <Input id={`${id}-subject`} name="subject" maxLength={160} />
      </Field>

      <Field label={t("message")} htmlFor={`${id}-message`}>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          className={cn(
            "w-full rounded-xl border border-line-input bg-surface px-4 py-3 text-sm leading-relaxed text-ink",
            "transition-[border-color,box-shadow] duration-200",
            "hover:border-brand-500 focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-500/15",
          )}
        />
      </Field>

      {state.status === "error" ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-negative-100 p-3 text-sm text-negative"
        >
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {t("errorGeneric")}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton />
        <p className="text-xs text-ink-muted">{t("responseTime")}</p>
      </div>
    </form>
  );
}
