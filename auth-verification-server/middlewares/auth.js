import { catchAsync } from "./catchAsync.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ErrorHandeler from "./error.js";
import { User } from "../models/userModal.js";
dotenv.config();
export const isAuthenticated = catchAsync(async (req, res, next) => {
 
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const err = new ErrorHandeler("Login First", 400);
      return next(err);
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      const err = new ErrorHandeler("Token not match", 400);
      return next(err);
    }
    const user = await User.findById(decoded.id).select("+password");
    if (!user) {
    return next(new ErrorHandeler("User not found", 404));
  }
    req.user = user;
    next();
   
});
