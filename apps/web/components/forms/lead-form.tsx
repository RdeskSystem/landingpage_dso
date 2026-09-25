"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trackAnalyticsEvent } from "@/components/analytics";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import type { Locale } from "@/i18n/routing";
import { ADMIN_WHATSAPP_NUMBER } from "@/lib/site-content";
import { cn } from "@/lib/utils";

type LeadFormProps = Readonly<{
  locale: Locale;
  copy: {
    name: string;
    company: string;
    position: string;
    email: string;
    phone: string;
    services: string;
    serviceOptions: Record<string, string>;
    message: string;
    privacy: string;
    submit: string;
    optional: string;
    required: string;
  };
}>;

const serviceValues = [
  "call-centre",
  "survey-verification",
  "collection",
  "information-data",
] as const;

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-xl border border-[var(--dso-line)] bg-white px-4 py-3 text-sm text-[var(--dso-ink)] outline-none transition placeholder:text-[var(--dso-muted)]/60 focus:border-[var(--dso-red)] focus:ring-4 focus:ring-[var(--dso-red)]/10";

export function LeadForm({ locale, copy }: LeadFormProps) {
  const schema = z.object({
    name: z.string().trim().min(2, copy.required),
    company: z.string().trim().min(2, copy.required),
    position: z.string().trim().optional(),
    email: z.string().trim().email(copy.required),
    phone: z.string().trim().min(6, copy.required),
    services: z.array(z.enum(serviceValues)).min(1, copy.required),
    message: z.string().trim().max(4000).optional(),
    privacyAccepted: z.boolean().refine(Boolean, copy.required),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { services: [], privacyAccepted: false },
  });

  function onSubmit(values: FormValues) {
    const greeting = locale === "id" ? "Halo tim DSO, saya ingin meminta proposal." : "Hello DSO team, I would like to request a proposal.";
    const details = [
      `${copy.name}: ${values.name}`,
      `${copy.company}: ${values.company}`,
      ...(values.position ? [`${copy.position}: ${values.position}`] : []),
      `${copy.email}: ${values.email}`,
      `${copy.phone}: ${values.phone}`,
      `${copy.services}: ${values.services.map((service) => copy.serviceOptions[service]).join(", ")}`,
      ...(values.message ? [`${copy.message}: ${values.message}`] : []),
    ];
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(`${greeting}\n\n${details.join("\n")}`)}`;

    trackAnalyticsEvent("lead_submit", { locale, service_count: String(values.services.length) });
    window.location.assign(whatsappUrl);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={copy.name} error={errors.name?.message}>
          <input {...register("name")} className={fieldClassName} autoComplete="name" />
        </Field>
        <Field label={copy.company} error={errors.company?.message}>
          <input {...register("company")} className={fieldClassName} autoComplete="organization" />
        </Field>
        <Field label={`${copy.position} (${copy.optional})`} error={errors.position?.message}>
          <input {...register("position")} className={fieldClassName} autoComplete="organization-title" />
        </Field>
        <Field label={copy.email} error={errors.email?.message}>
          <input {...register("email")} className={fieldClassName} type="email" autoComplete="email" />
        </Field>
        <Field label={copy.phone} error={errors.phone?.message}>
          <input {...register("phone")} className={fieldClassName} type="tel" autoComplete="tel" />
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-[var(--dso-ink)]">{copy.services}</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {serviceValues.map((value) => (
            <label key={value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--dso-line)] bg-white px-4 py-3 text-sm text-[var(--dso-muted)] transition has-[:checked]:border-[var(--dso-red)] has-[:checked]:bg-[var(--dso-red)]/5">
              <input {...register("services")} value={value} type="checkbox" className="h-4 w-4 accent-[var(--dso-red)]" />
              {copy.serviceOptions[value]}
            </label>
          ))}
        </div>
        {errors.services ? <p className="mt-2 text-xs text-[var(--dso-red)]">{errors.services.message}</p> : null}
      </fieldset>

      <Field label={`${copy.message} (${copy.optional})`} error={errors.message?.message}>
        <textarea {...register("message")} className={`${fieldClassName} min-h-32 resize-y`} rows={5} />
      </Field>

      <label className="flex items-start gap-3 text-sm leading-6 text-[var(--dso-muted)]">
        <input {...register("privacyAccepted")} type="checkbox" className="mt-1 h-4 w-4 accent-[var(--dso-red)]" />
        <span>{copy.privacy}</span>
      </label>
      {errors.privacyAccepted ? <p className="-mt-3 text-xs text-[var(--dso-red)]">{errors.privacyAccepted.message}</p> : null}

      <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#148a55] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#106e44] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#148a55]">
        <WhatsAppIcon size={19} />
        {copy.submit}
      </button>
    </form>
  );
}

function Field({ label, error, children }: Readonly<{ label: string; error?: string; children: React.ReactNode }>) {
  return (
    <label className="block text-sm font-semibold text-[var(--dso-ink)]">
      {label}
      {children}
      {error ? <span className={cn("mt-1 block text-xs font-normal text-[var(--dso-red)]")}>{error}</span> : null}
    </label>
  );
}
