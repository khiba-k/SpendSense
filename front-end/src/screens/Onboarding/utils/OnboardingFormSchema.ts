"use client";

import { z } from "zod";

const OnboardingFormSchema = z.object({
  name: z.string().min(2).max(50),
  surname: z.string().min(2).max(50),
  email: z.string().email(),
  occupation: z.string().min(2).max(50),
  gender: z.enum(["Male", "Female", "Other"]),
});

type OnboardingForm = z.infer<typeof OnboardingFormSchema>;

export { OnboardingFormSchema };
export type { OnboardingForm };
