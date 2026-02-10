import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const userSchema = new Schema({
  password: {
    type: String,
    select: false,
    minLength: [6, " Password Must be at least 6, got only {VALUE}"],
  },
  name: String,
  accountVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordAttempts: {
    type: Number,
    default: 0,
  },
  forgotPasswordLastRequest: {
    type: Date,
  },
  email: { type: String, required: [true, "Email is required"] },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  verificationCode: {
    type: Number,
  },

  verificationCodeExpire: {
    type: Date,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpired: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("save", async function (next) {
  this.createdAt = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  next();
});
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED,
  });
  return token;
};
userSchema.methods.genarateVerificationCode = function () {
  const fourDigitNo = Math.floor(Math.random() * 9000 + 1000);
  this.verificationCode = fourDigitNo;

  this.verificationCodeExpire = new Date(
    Date.now() + 5 * 60 * 1000 + 5.5 * 60 * 60 * 1000
  );

  return fourDigitNo;
};
userSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.resetPasswordTokenExpired = Date.now() + 15 * 60 * 1000;
  return token;
};
