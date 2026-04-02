import ErrorHandeler from "../middlewares/error.js";
import { User } from "../models/userModal.js";
import { generateEmailTemplate } from "../utils/emailTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";

export const resendService = async (req, res, next) => {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return next(new ErrorHandeler("Email or Phone is required", 400));
    }

    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (!user) {
      return next(new ErrorHandeler("User not found", 404));
    }

    if (user.accountVerified) {
      return next(new ErrorHandeler("User already verified", 400));
    }

    const currentTime = Date.now();

    if (user.lastOtpSent && currentTime - user.lastOtpSent < 60000) {
      return next(
        new ErrorHandeler("Please wait before requesting again", 429)
      );
    }

    const verificationCode = await user.genarateVerificationCode();

    user.lastOtpSent = currentTime;
    await user.save();

    const subject = "Resend Verification Code";
    const message = generateEmailTemplate(
      verificationCode,
      user.name,
      subject
    );

    await sendEmail(message, user.email, subject);

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    next(error);
  }
};
