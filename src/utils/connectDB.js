import { config } from "dotenv";
config();
import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(MONGODB_URI);
        console.log("connected to database", connection.connection.host);
    } catch (error) {
        console.log("error connecting to database", error.message);
    }
}