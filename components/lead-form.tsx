"use client";

import { useEffect, useId, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { CtaIcon } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { finalCta, siteConfig } from "@/content/site";
import { useSubmitLead } from "@/hooks/use-submit-lead";
import { subscribeToInterest } from "@/lib/interest";
import {
  COMPANY_SIZE_OPTIONS,
  INDUSTRY_OPTIONS,
  INTEREST_OPTIONS,
  leadSchema,
  type LeadFormInput,
  type LeadFormValues,
} from "@/lib/schemas/lead";
import { cn } from "@/lib/utils";

const TEXT_MAX = 2000;

const DEFAULT_VALUES: LeadFormInput = {
  fullName: "",
  email: "",
  company: "",
  website: "",
  industry: undefined as unknown as string,
  companySize: undefined as unknown as string,
  biggestCost: "",
  interests: [],
  consent: false,
  fax: "",
};

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
};

function Field({ id, label, error, optional, hint, children, className }: FieldProps) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>
          {label}
          {optional ? <span className="font-normal text-ink-muted">(optional)</span> : null}
        </Label>
        {hint}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function LeadForm() {
  const uid = useId();
  const ids = {
    fullName: `${uid}-name`,
    email: `${uid}-email`,
    company: `${uid}-company`,
    website: `${uid}-website`,
    industry: `${uid}-industry`,
    companySize: `${uid}-size`,
    biggestCost: `${uid}-cost`,
    interests: `${uid}-interests`,
    consent: `${uid}-consent`,
    fax: `${uid}-fax`,
  };

  const mutation = useSubmitLead();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<LeadFormInput, unknown, LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  });

  // Service and product CTAs pre-select an interest (see lib/interest.ts).
  useEffect(
    () =>
      subscribeToInterest((interest) => {
        const current = getValues("interests") ?? [];
        if (!current.includes(interest)) setValue("interests", [...current, interest], { shouldDirty: true });
      }),
    [getValues, setValue],
  );

  const textLength = watch("biggestCost")?.length ?? 0;

  const onSubmit = (values: LeadFormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success(finalCta.form.successTitle, { description: finalCta.form.successMessage });
        reset(DEFAULT_VALUES);
      },
      onError: (error) => {
        if (error.fieldErrors) {
          for (const [field, messages] of Object.entries(error.fieldErrors)) {
            if (messages?.[0]) setError(field as keyof LeadFormValues, { message: messages[0] });
          }
        }
        toast.error("Your enquiry wasn't sent", { description: error.message });
      },
    });
  };

  const describedBy = (field: keyof LeadFormValues, extra?: string) =>
    [errors[field] ? `${ids[field]}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  const isPending = mutation.isPending;

  return (
    <div data-surface="light" className="rounded-3xl border border-line bg-surface p-5 text-ink shadow-[0_30px_60px_-30px_rgb(14_13_18/0.3)] sm:p-8">
      <h3 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.02em]">{finalCta.form.title}</h3>
      <p className="mt-2 text-[0.9375rem] text-ink-muted">{finalCta.form.description}</p>

      <div aria-live="polite" className="empty:hidden">
        {mutation.isSuccess ? (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-success/25 bg-highlight-soft/60 p-4 text-sm">
            <CircleCheck className="mt-0.5 size-4.5 shrink-0 text-success" aria-hidden="true" />
            <p>
              <span className="block font-medium text-ink">{finalCta.form.successTitle}</span>
              <span className="text-ink-muted">{finalCta.form.successMessage}</span>
            </p>
          </div>
        ) : null}
      </div>

      {mutation.isError ? (
        <div role="alert" className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/25 bg-destructive/6 p-4 text-sm">
          <CircleAlert className="mt-0.5 size-4.5 shrink-0 text-destructive" aria-hidden="true" />
          <p>
            <span className="block font-medium text-ink">{mutation.error.message}</span>
            <span className="text-ink-muted">
              If it keeps happening, email us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-accent underline underline-offset-4">
                {siteConfig.email}
              </a>
              .
            </span>
          </p>
        </div>
      ) : null}

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-6" aria-busy={isPending}>
        <fieldset disabled={isPending} className="grid gap-5 sm:grid-cols-2">
          <legend className="sr-only">Your details</legend>

          <Field id={ids.fullName} label="Full name" error={errors.fullName?.message}>
            <Input id={ids.fullName} autoComplete="name" aria-invalid={!!errors.fullName} aria-describedby={describedBy("fullName")} {...register("fullName")} />
          </Field>

          <Field id={ids.email} label="Work email" error={errors.email?.message}>
            <Input
              id={ids.email}
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={describedBy("email")}
              {...register("email")}
            />
          </Field>

          <Field id={ids.company} label="Company name" error={errors.company?.message}>
            <Input id={ids.company} autoComplete="organization" aria-invalid={!!errors.company} aria-describedby={describedBy("company")} {...register("company")} />
          </Field>

          <Field id={ids.website} label="Website" optional error={errors.website?.message}>
            <Input
              id={ids.website}
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="yourcompany.co.uk"
              aria-invalid={!!errors.website}
              aria-describedby={describedBy("website")}
              {...register("website")}
            />
          </Field>

          <Field id={ids.industry} label="Industry" error={errors.industry?.message}>
            <Controller
              control={control}
              name="industry"
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange} name={field.name} disabled={isPending}>
                  <SelectTrigger id={ids.industry} ref={field.ref} onBlur={field.onBlur} aria-invalid={!!errors.industry} aria-describedby={describedBy("industry")}>
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field id={ids.companySize} label="Company size" error={errors.companySize?.message}>
            <Controller
              control={control}
              name="companySize"
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange} name={field.name} disabled={isPending}>
                  <SelectTrigger
                    id={ids.companySize}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    aria-invalid={!!errors.companySize}
                    aria-describedby={describedBy("companySize")}
                  >
                    <SelectValue placeholder="Choose one" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_SIZE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field
            id={ids.biggestCost}
            label="What's costing you the most time or money?"
            error={errors.biggestCost?.message}
            className="sm:col-span-2"
            hint={
              <span id={`${ids.biggestCost}-count`} className="shrink-0 text-xs text-ink-muted tabular-nums">
                {textLength}/{TEXT_MAX}
              </span>
            }
          >
            <Textarea
              id={ids.biggestCost}
              rows={4}
              maxLength={TEXT_MAX}
              placeholder="For example: we spend every Friday building reports by hand, and new enquiries wait days for a reply."
              aria-invalid={!!errors.biggestCost}
              aria-describedby={describedBy("biggestCost", `${ids.biggestCost}-count`)}
              {...register("biggestCost")}
            />
          </Field>

          <Controller
            control={control}
            name="interests"
            render={({ field }) => {
              const selected = field.value ?? [];
              return (
                <fieldset className="sm:col-span-2" aria-describedby={describedBy("interests")}>
                  <legend className="mb-2 text-sm font-medium text-ink">
                    Areas of interest <span className="font-normal text-ink-muted">(optional)</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map((option) => {
                      const checked = selected.includes(option.value);
                      return (
                        <label key={option.value} className="relative cursor-pointer">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            name={field.name}
                            value={option.value}
                            checked={checked}
                            onBlur={field.onBlur}
                            onChange={(e) =>
                              field.onChange(
                                e.target.checked ? [...selected, option.value] : selected.filter((v) => v !== option.value),
                              )
                            }
                          />
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors",
                              "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                              checked ? "border-accent bg-accent-soft text-accent" : "border-line-strong bg-surface text-ink hover:border-accent",
                            )}
                          >
                            {checked ? <Check className="size-3.5" strokeWidth={3} aria-hidden="true" /> : null}
                            {option.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.interests?.message ? (
                    <p id={`${ids.interests}-error`} className="mt-1.5 text-sm text-destructive">
                      {errors.interests.message}
                    </p>
                  ) : null}
                </fieldset>
              );
            }}
          />

          {/* Honeypot: hidden from people and assistive tech; bots tend to fill it in. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor={ids.fax}>Leave this field empty</label>
            <input id={ids.fax} type="text" tabIndex={-1} autoComplete="off" {...register("fax")} />
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-start gap-3">
              <Controller
                control={control}
                name="consent"
                render={({ field }) => (
                  <Checkbox
                    id={ids.consent}
                    ref={field.ref}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    onBlur={field.onBlur}
                    aria-invalid={!!errors.consent}
                    aria-describedby={describedBy("consent")}
                    className="mt-0.5"
                  />
                )}
              />
              <Label htmlFor={ids.consent} className="block text-sm leading-relaxed font-normal text-ink-muted">
                I agree to {siteConfig.name} storing these details and contacting me about my enquiry, as described in the{" "}
                <a href={siteConfig.privacyPolicyHref} className="font-medium text-accent underline underline-offset-4">
                  privacy policy
                </a>
                .
              </Label>
            </div>
            {errors.consent?.message ? (
              <p id={`${ids.consent}-error`} className="mt-1.5 pl-8 text-sm text-destructive">
                {errors.consent.message}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="w-full">
              {isPending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  {finalCta.form.submitLabel}
                  <CtaIcon />
                </>
              )}
            </Button>
            <p className="mt-3 text-center text-xs text-ink-muted">Free and no obligation. We never share your details.</p>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
