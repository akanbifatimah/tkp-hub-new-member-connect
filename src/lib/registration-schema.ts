import { z } from "zod";

export const CONTACT_METHODS = [
  { value: "sms", label: "Text / SMS", icon: "/icons/sms.svg", width: 15, height: 15 },
  { value: "call", label: "Phone Call", icon: "/icons/phone-call.svg", width: 13.5, height: 13.5 },
  { value: "email", label: "Email", icon: "/icons/email.svg", width: 15, height: 12 },
] as const;

export const REFERRAL_SOURCES = [
  { value: "friend_family", label: "A friend or family member" },
  { value: "special_event", label: "Special Event" },
  { value: "social_media", label: "Social media" },
  { value: "website", label: "Church website" },
  { value: "outreach", label: "Community outreach" },
  { value: "walked_in", label: "Walked in" },
] as const;

type Values<T extends readonly { value: string }[]> = T[number]["value"];
const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((item) => item.value) as [Values<T>, ...Values<T>[]];

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

export const registrationSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(80),
  lastName: z.string().trim().min(1, "Please enter your last name").max(80),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number")
    .refine((v) => /^\+?[\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 7, {
      error: "Please enter a valid phone number",
    }),
  email: z.string().trim().min(1, "Please enter your email address").pipe(
    z.email({ error: "Please enter a valid email address" }),
  ),
  contactMethod: z.enum(values(CONTACT_METHODS), { error: "Choose how we should reach you" }),
  referralSource: z.enum(values(REFERRAL_SOURCES), { error: "Let us know how you heard about us" }),
  invitedBy: optionalText(120),
  companions: optionalText(300),
  prayerRequest: optionalText(2000),
  serviceFeedback: optionalText(2000),
});

/** Shape of the form's field values (before zod defaults/transforms). */
export type RegistrationInput = z.input<typeof registrationSchema>;
/** Shape of validated data as seen by the server. */
export type Registration = z.output<typeof registrationSchema>;
