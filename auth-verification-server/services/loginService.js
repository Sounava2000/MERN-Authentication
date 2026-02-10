import ErrorHandeler from "../middlewares/error.js";
import { User } from "../models/userModal.js";
import bcrypt from "bcryptjs";
export const loginService = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const err = new ErrorHandeler("Email and password are required", 400);
      return next(err);
    }
    const user = await User.findOne({ email, accountVerified: true }).select(
      "+password",
    );
    console.log(user);
    if (!user) {
      const err = new ErrorHandeler("Invalid email or password", 400);
      return next(err);
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      const err = new ErrorHandeler("Invalid email or password", 400);
      return next(err);
    }
    const token = await user.generateToken();
    res.status(200).json({
      success: true,
      name: user.name,
      message: "User logged in Successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};
