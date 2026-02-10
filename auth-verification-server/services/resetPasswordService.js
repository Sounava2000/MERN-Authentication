import crypto from "crypto";
import { User } from "../models/userModal.js";
import ErrorHandeler from "../middlewares/error.js";

export const resetPasswordService = async (req, res, next) => {
  try {
    const { token } = req.params;

    const { password, confirmPassword } = req.body;

    
    if (!password || !confirmPassword) {
      return next(
        new ErrorHandeler(
          "Password and confirm password both are required",
          400
        )
      );
    }

    if (password !== confirmPassword) {
      return next(
        new ErrorHandeler(
          "Password and confirm password do not match",
          400
        )
      );
    }
 
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpired: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorHandeler("Password token is invalid or expired", 401)
      );
    }
 
    user.password = password;

 
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpired = undefined;

    await user.save();
 
    const myToken = user.generateToken();

    
    res.status(200).json({
      success: true,
      message: "Password reset successful",
      myToken,
      user
    });
  } catch (error) {
    next(error);
  }
};
