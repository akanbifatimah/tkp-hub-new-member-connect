"use client";

import { Icon } from "@/components/Icon";
import { useState, useTransition, type ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitRegistration } from "@/app/actions";
import {
  CONTACT_METHODS,
  REFERRAL_SOURCES,
  registrationSchema,
  type Registration,
  type RegistrationInput,
} from "@/lib/registration-schema";
import { Choice, FieldError, IconField, PlainInput, PlainTextarea } from "./fields";
import { SectionCard } from "./SectionCard";
import { SuccessCard } from "./SuccessCard";

const defaultValues: Partial<RegistrationInput> = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  contactMethod: "sms",
  invitedBy: "",
  companions: "",
  prayerRequest: "",
  serviceFeedback: "",
};

const personIcon = { src: "/icons/person.svg", width: 13.3333, height: 13.3333 };

/** `intro` (the welcome hero) is shown above the form and hidden once the guest has submitted. */
export function RegistrationForm({ intro }: { intro?: ReactNode }) {
  const [pending, startTransition] = useTransition();
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegistrationInput, unknown, Registration>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
    mode: "onTouched",
  });

  const referralSource = useWatch({ control, name: "referralSource" });

  const onSubmit = (data: Registration) => {
    setFormError(null);
    startTransition(async () => {
      try {
        const result = await submitRegistration(data);
        if (result.ok) {
          setSubmittedName(result.firstName);
          reset(defaultValues);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
          if (messages?.[0]) setError(field as keyof RegistrationInput, { message: messages[0] });
        }
        setFormError(result.message ?? "Please check the highlighted fields and try again.");
      } catch {
        setFormError("We couldn’t send your details. Please check your connection and try again.");
      }
    });
  };

  if (submittedName !== null) {
    return (
      <div className="flex w-full flex-col items-center gap-4">
        <SuccessCard firstName={submittedName} />
        <button
          type="button"
          onClick={() => setSubmittedName(null)}
          className="min-h-11 px-4 text-[13px] leading-[18px] font-medium text-body underline underline-offset-4"
        >
          Register another guest
        </button>
      </div>
    );
  }

  return (
    <>
      {intro}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full flex-col gap-6">
        <SectionCard
          id="contact"
          title="Your Contact Details"
          icon={{ src: "/icons/contact-card.svg", width: 15, height: 15 }}
          className="gap-4"
        >
          <p className="-mt-2 font-body text-[15px] leading-[22px] text-body">
            So our pastoral hospitality team knows who to say hello to!
          </p>
          <div className="flex w-full flex-col gap-3.5 pt-1">
            <IconField
              id="firstName"
              label="First Name"
              required
              icon={personIcon}
              placeholder="e.g. Jordan"
              autoComplete="given-name"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
            <IconField
              id="lastName"
              label="Last Name"
              required
              icon={personIcon}
              placeholder="e.g. Adeleke"
              autoComplete="family-name"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
            <IconField
              id="phone"
              label="Phone Number"
              hint="For a welcome text"
              required
              icon={{ src: "/icons/phone.svg", width: 15, height: 15 }}
              type="tel"
              inputMode="tel"
              placeholder="(555) 000-0000"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <IconField
              id="email"
              label="Email Address"
              hint="Quiet notes only"
              required
              icon={{ src: "/icons/mail.svg", width: 16.6667, height: 13.3333 }}
              type="email"
              inputMode="email"
              placeholder="jordan@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
        </SectionCard>
  
        <SectionCard
          id="contact-method"
          title="Preferred Contact Method"
          description="How would you feel most comfortable hearing from us?"
          icon={{ src: "/icons/chat.svg", width: 15, height: 15 }}
          className="gap-3"
        >
          <div role="radiogroup" aria-labelledby="contact-method-heading" className="grid w-full grid-cols-3 gap-2 pt-1">
            {CONTACT_METHODS.map((method) => (
              <Choice
                key={method.value}
                value={method.value}
                {...register("contactMethod")}
                className="flex h-[52px] flex-col items-center justify-center gap-0.5 rounded-field bg-cream text-ink-soft drop-shadow-hairline has-checked:bg-butter has-checked:text-butter-ink"
              >
                <Icon src={method.icon} width={method.width} height={method.height} />
                <span className="text-[13px] leading-[18px] font-medium">{method.label}</span>
              </Choice>
            ))}
          </div>
          <FieldError id="contactMethod-error" message={errors.contactMethod?.message} />
        </SectionCard>
  
        <SectionCard id="referral" title="How did you hear about us?" icon={{ src: "/icons/compass.svg", width: 15, height: 15 }} className="gap-4">
          <div
            role="radiogroup"
            aria-labelledby="referral-heading"
            aria-describedby={errors.referralSource ? "referralSource-error" : undefined}
            className="flex w-full flex-wrap gap-2"
          >
            {REFERRAL_SOURCES.map((source) => (
              <Choice
                key={source.value}
                value={source.value}
                {...register("referralSource")}
                className="rounded-full bg-stone px-3.5 py-2 text-[12px] leading-4 font-semibold tracking-[0.96px] text-ink-soft has-checked:bg-accent has-checked:text-white has-checked:drop-shadow-hairline"
              >
                {source.label}
              </Choice>
            ))}
          </div>
          <FieldError id="referralSource-error" message={errors.referralSource?.message} />
  
          {referralSource === "friend_family" && (
            <div className="flex w-full flex-col gap-1.5 rounded-lg bg-sand-muted p-4">
              <label
                htmlFor="invitedBy"
                className="text-[12px] leading-4 font-semibold tracking-[0.96px] text-body uppercase"
              >
                Who invited you?
              </label>
              <PlainInput
                id="invitedBy"
                placeholder="e.g. Chioma E."
                autoComplete="off"
                className="px-3.5 py-2.5"
                {...register("invitedBy")}
              />
            </div>
          )}
        </SectionCard>
  
        <SectionCard id="companions" title="Who came with you today?" optional icon={{ src: "/icons/group.svg", width: 16.5, height: 12 }} className="gap-2">
          <div className="w-full pt-1">
            <PlainInput
              aria-labelledby="companions-heading"
              placeholder="e.g. My spouse and two kids"
              className="px-4 pt-[15px] pb-4"
              {...register("companions")}
            />
          </div>
        </SectionCard>
  
        <SectionCard id="prayer" title="Any Prayer Request?" optional icon={{ src: "/icons/prayer.svg", width: 12.2625, height: 15.2812 }} className="gap-2">
          <p id="prayer-note" className="flex w-full items-center gap-1.5 text-[13px] leading-[18px] text-body">
            <Icon src="/icons/heart-lock.svg" width={13.3333} height={12.2333} />
            Our pastoral team and intercessors pray over every note this week in strict confidence.
          </p>
          <div className="w-full pt-1">
            <PlainTextarea
              aria-labelledby="prayer-heading"
              aria-describedby="prayer-note"
              placeholder="Share a request, thanksgiving, or anything on your heart..."
              {...register("prayerRequest")}
            />
          </div>
        </SectionCard>
  
        <SectionCard id="feedback" title="How was the Service Today?" icon={{ src: "/icons/heart-outline.svg", width: 15, height: 13.7625 }} className="gap-2">
          <div className="w-full pt-1">
            <PlainTextarea
              aria-labelledby="feedback-heading"
              placeholder="Share your Thoughts, Concerns, or anything on your heart..."
              className="text-[14px]"
              {...register("serviceFeedback")}
            />
          </div>
        </SectionCard>
  
        <div className="flex w-full flex-col items-center gap-2 pt-1">
          {formError && (
            <p role="alert" className="text-center text-[13px] leading-[18px] text-danger">
              {formError}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="bg-gold-gradient flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-[14px] leading-5 font-semibold tracking-[0.35px] text-on-gold shadow-cta transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep disabled:opacity-70"
          >
            {pending ? "Submitting…" : "Submit"}
            <Icon src="/icons/arrow-forward.svg" width={14.75} height={14.75} />
          </button>
          <p className="px-4 text-center text-[13px] leading-[18px] text-body">
            We’ll only use this to say hello and follow up.
            <br />
            Nothing more. No spam, ever.
          </p>
        </div>
      </form>
    </>
  );
}
