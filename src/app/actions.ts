"use server";

import { z } from "zod";
import { registrationSchema, type RegistrationInput } from "@/lib/registration-schema";

export type SubmitRegistrationResult =
  | { ok: true; firstName: string }
  | { ok: false; fieldErrors?: Partial<Record<keyof RegistrationInput, string[]>>; message?: string };

export async function submitRegistration(input: RegistrationInput): Promise<SubmitRegistrationResult> {
  // Public, unauthenticated form: never trust the client, re-validate with the shared schema.
  const parsed = registrationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const registration = {
    ...parsed.data,
    // Only keep who invited them when it applies to the chosen referral source.
    invitedBy: parsed.data.referralSource === "friend_family" ? parsed.data.invitedBy : "",
  };

  // TODO: persist `registration` (TKP Hub API / database) and notify the hospitality team.
  // Don't log the payload: it contains personal data and prayer requests.
  void registration;

  return { ok: true, firstName: registration.firstName };
}
