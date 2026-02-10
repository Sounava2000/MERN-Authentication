import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB successfully connected");
  } catch (error) {
    console.log(error.message);
  }
}
