import { z } from "zod";

const validUser = z.object({
  name: z.string().min(2, "Name should be atleast 2 characters long"),
  lastName: z.string().min(2, "lastName should be atleast 2 characters long"),
  email: z.string().email("Invalid email format"),
  occupation: z
    .string()
    .min(2, "Occupation should be atleast 2 characters long")
    .max(50),
  gender: z.enum(["Male", "Female", "Other"]),
  dateCreated: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      return new Date(val);
    }
    return new Date();
  }, z.date()),
  dateModified: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      return new Date(val);
    }
    return new Date();
  }, z.date()),
  userId: z.string().min(1, "User ID is required"),
});

type userType = z.infer<typeof validUser>;

export { userType, validUser };
