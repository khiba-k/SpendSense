import { Request, Response, Router } from "express";

const usersRouter: Router = Router();

// Route for getting all users
usersRouter.get("/all", (req: Request, res, Response) => {
  res.send("These are all the users");
});

// Route for creating new user
usersRouter.post("/create", (req: Request, res: Response) => {
  res.send("User data posted");
});

// Route for getting specific user
usersRouter.get("/:id", (req: Request, res: Response) => {
  res.send("This is the user");
});

export default usersRouter;
