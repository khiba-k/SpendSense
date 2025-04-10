"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { OnboardingForm } from "./OnboardingFormSchema";

export const Onboardingcomplete = async (formData: OnboardingForm) => {
  const { userId } = await auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const client = await clerkClient();

  try {
    console.log("Updating user metadata:", formData);

    // Update user metadata
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
