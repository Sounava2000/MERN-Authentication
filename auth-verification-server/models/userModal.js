import mongoose from "mongoose";
import { userSchema } from "../schema/userSchema.js";
export const User = mongoose.model("User", userSchema);
