import mongoose from "mongoose";
import { config } from "dotenv";

config();
const main = async () => {
    try {
        const mongoConnect: string | undefined = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Connected to MongoDB ${mongoConnect}`)
    }
}