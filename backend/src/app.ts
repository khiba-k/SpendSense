import express, { Express } from "express";
import usersRouter from "./routes/userRoutes.js";

const app: Express = express();
const port = 5201;

// Users Router
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

export default app;
