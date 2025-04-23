import cors from "cors";
import express, { Express } from "express";
import connectDB from "./config/mongo.js";
import usersRouter from "./routes/userRoutes.js";

const app: Express = express();
const port = 5201;

// Give access to frontend
app.use(cors({ origin: "http://localhost:3000" }));

//Parse json data
app.use(express.json());

// Users Router
app.use("/", usersRouter);

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
