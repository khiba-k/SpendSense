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
    // Send request to backend
    console.log("Form Data: ", formData);
    const response = await fetch("http://localhost:5201/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // <-- Important!
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Update user metadata
      const res = await client.users.updateUser(userId, {
        publicMetadata: {
          onboardingComplete: true,
        },
      });
      return { message: res.publicMetadata };
    } else {
      //handle failure to create new user
      const responseBody = await response.json();
      console.log("Response Body: ", responseBody);
      const status = responseBody["status"];

      if (status == 400) {
        return { message: "Invalid user data" };
      }
      if (status == 500) {
        console.log("An error occured");
        throw new Error();
        return { message: "A server side error occured" };
      }
    }
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
