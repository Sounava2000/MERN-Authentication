import ErrorHandeler from "../middlewares/error.js";
import { User } from "../models/userModal.js";

export const veriftOtpService = async (req, res, next) => {
  try {
    const { email, otp, phone } = req.body;
    if (!email || !phone || !otp) {
      const err = new ErrorHandeler("Email, phone and OTP are required", 401);
      return next(err);
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    const isValid = phoneRegex.test(phone);
    if (!isValid) {
      const err = new ErrorHandeler("Invalid Phone No", 401);
      return next(err);
    }

    const allUsers = await User.find({
      $or: [
        { email, accountVerified: false },
        { phone, accountVerified: false },
      ],
    });
    if (allUsers.length === 0) {
      const err = new ErrorHandeler("User not found", 404);
      return next(err);
    }
    if (allUsers.length >= 1) {
      let firstUser = allUsers[0];
      await User.deleteMany({
        _id: { $ne: firstUser._id },
        $or: [
          { email, accountVerified: false },
          { phone, accountVerified: false },
        ],
      });
      if (firstUser.verificationCode !== +otp) {
        const err = new ErrorHandeler("Otp not match", 402);
        return next(err);
      }
      const currentTime = Date.now();
      const verificationCodeExpired = new Date(
        firstUser.verificationCodeExpire
      ).getTime();
      if (currentTime > verificationCodeExpired) {
        const err = new ErrorHandeler("Otp expired", 406);
        return next(err);
      }
      firstUser.accountVerified = true;
      firstUser.verificationCodeExpire = null;
      firstUser.verificationCode = null;
      await firstUser.save();
      const token = firstUser.generateToken();
      res.status(200).json({
        success: true,
        token,
        firstUser,
      });
    }
  } catch (error) {
    next(error);
  }
};
