import { config } from "dotenv";
import mongoose from "mongoose";

config();
const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("Missing DATABASE URL");
    }
    const mongoConnect = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Connected to MongoDB ${mongoConnect.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.log(`An unknown error has been caught ${error}`);
    }
  }
};

export default connectDB;
