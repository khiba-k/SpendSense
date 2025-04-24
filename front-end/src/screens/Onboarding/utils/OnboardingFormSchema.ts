"use client";

import { z } from "zod";

const OnboardingFormSchema = z.object({
  name: z.string().min(2, "Name should be atleast 2 characters long").max(50),
  lastName: z
    .string()
    .min(2, "Surname should be atleast 2 characters long")
    .max(50),
  email: z.string().email(),
  occupation: z
    .string()
    .min(2, "Occupation should be atleast 2 characters long")
    .max(50),
  gender: z.enum(["Male", "Female", "Other"]),
  userId: z.string().optional(),
});

type OnboardingForm = z.infer<typeof OnboardingFormSchema>;

export { OnboardingFormSchema };
export type { OnboardingForm };
