import Users from "../schemas/userSchema.js";
import { userType } from "../validators/userValidator.js";

const createUser = async (data: userType) => {
  try {
    // Create new user
    const user = await Users.create(data);

    if (user) {
      // If user created successfully
      console.log("User created");
      return true;
    } else {
      // If failed to create user
      console.log("Failed to create user");
      return false;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unexpected error occured: ", error);
    }
  }
};

export default createUser;
