import ErrorHandeler from "../middlewares/error.js";
import { User } from "../models/userModal.js";
import dotenv from "dotenv";

import { sendEmail } from "../utils/sendEmail.js";
dotenv.config();
export const forgetPasswordService = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email,
      accountVerified: true,
    });
    const MAX_ATTEMPTS = 4;
    const COOLDOWN_TIME = 15 * 60 * 1000;
    if (!user) {
      const err = new ErrorHandeler("User not found", 404);
      return next(err);
    }
    if (
      user.forgotPasswordLastRequest &&
      Date.now() - user.forgotPasswordLastRequest.getTime() < COOLDOWN_TIME &&
      user.forgotPasswordAttempts >= MAX_ATTEMPTS
    ) {
      return next(
        new ErrorHandeler(
          "Too many reset requests. Please try again after 15 minutes.",
          429
        )
      );
    }
    if (
      user.forgotPasswordLastRequest &&
      Date.now() - user.forgotPasswordLastRequest.getTime() >= COOLDOWN_TIME
    ) {
      user.forgotPasswordAttempts = 0;
    }
    user.forgotPasswordAttempts = user.forgotPasswordAttempts + 1;
    user.forgotPasswordLastRequest = new Date();
    const resetToken = user.generateResetToken();
    console.log(resetToken)
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${process.env.FRONTEND_URL}password/reset/${resetToken}`;
    const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl}`;
    const subject = "Mern Authentication App";

    sendEmail(message, user.email, subject);
    res.status(201).json({
      success: true,
      message: `Email sent to ${user.email} SuccessFully `,
    });
  } catch (error) {
    next(error);
  }
};
