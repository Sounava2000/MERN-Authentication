import express from "express";
import {
  forgetPassword,
  getUser,
  resend,
  resetPassword,
  userLogin,
  userRegister,
  veriftOtp,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.post("/register", userRegister);
router.post("/otp-verify", veriftOtp);

router.post("/login", userLogin);
router.get("/me", isAuthenticated,getUser);
router.post("/password/forget",forgetPassword);
router.post("/password/reset/:token",resetPassword);

router.post("/resend-otp",resend)
export default router;
