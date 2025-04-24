import { Request, Response, Router } from "express";
import createUser from "../controllers/userActions.js";
import { validUser } from "../validators/userValidator.js";

const usersRouter: Router = Router();

// Route for getting all users
usersRouter.get("/all", (req: Request, res, Response) => {
  res.send("These are all the users");
});

// Route for creating new user
usersRouter.post("/createUser", async (req: Request, res: Response) => {
  try {
    console.log("BODY: ", req.body);

    const { name, lastName, email, userId, occupation, gender } = req.body;

    const userObj = {
      name: name,
      lastName: lastName,
      email: email,
      occupation: occupation,
      gender: gender,
      dateCreated: Date.now(),
      dateModified: Date.now(),
      userId: userId,
    };

    // Validate user data using zod
    const validatedUser = validUser.safeParse(userObj);
    console.log("Validated User: ", validatedUser);

    if (validatedUser.success) {
      // Create user if data valid
      const user = await createUser(validatedUser.data);

      if (user) {
        res
          .status(201)
          .json({ sucess: true, message: "User created successfully" });
      } else {
        throw new Error("Failed to create user");
      }
    } else {
      // Log validation error if data not valid
      console.error("Validation error: ", validatedUser.error.format());

      res.status(400).json({ sucess: false, message: "Invalid user data" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error: ", error.message);
      res.status(500).send("A server side errror occured");
    } else {
      console.error("An unknown error occured: ", error);
      res.status(500).send("A server side errror occured");
    }
  }
});

// Route for getting specific user
usersRouter.get("/:id", (req: Request, res: Response) => {
  res.send("This is the user");
});

export default usersRouter;
