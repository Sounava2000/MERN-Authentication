import ErrorHandeler from "../middlewares/error.js";
import { User } from "../models/userModal.js";
import { generateEmailTemplate } from "../utils/emailTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";

export const registerService = async (req, res, next) => {
  try {
    const { name, email, phone, password, verificationMethod } = req.body;
    if (!name || !email || !phone || !password || !verificationMethod) {
      const err = new ErrorHandeler("All field are required", 400);
      next(err);
    }
    const existingUser = await User.find().or([
      { email, accountVerified: true },
      { phone, accountVerified: true },
    ]);
    if (existingUser.length > 0) {
      const err = new ErrorHandeler("Phone or Email already exist", 400);
      return next(err);
    }
    const registrationAttempsByUser = await User.find().or([
      { email, accountVerified: false },
      { phone, accountVerified: false },
    ]);
    if (registrationAttempsByUser.length >= 3) {
      const err = new ErrorHandeler("Too many registration attempts", 429);
      return next(err);
    }
    const regex = /^[6-9]\d{9}$/;

    const phoneIsValid = regex.test(phone);
    if (!phoneIsValid) {
      const err = new ErrorHandeler("Phone no not valid", 429);
      return next(err);
    }
    const newUser = await User.create({ name, email, phone, password });
    const verificationCode = await newUser.genarateVerificationCode();
    await newUser.save();
    const subject ="Your verification code"
    const message = generateEmailTemplate(verificationCode, name,subject);
   await sendEmail(message, email,subject);
    res.status(201).json({
      success: true,
      newUser,
      message: "User Created SuccessFully",
      OTP : verificationCode,
    });
  } catch (error) {
    next(error);
  }
};
