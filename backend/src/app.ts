import express, { Express } from "express";
import connectDB from "./config/mongo.js";
import usersRouter from "./routes/userRoutes.js";

const app: Express = express();
const port = 5201;

//Parse json data
app.use(express.json());

// Users Router
app.use("/users", usersRouter);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

startServer();

export default app;
