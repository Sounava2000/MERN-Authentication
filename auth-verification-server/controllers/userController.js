import { catchAsync } from "../middlewares/catchAsync.js"
import { forgetPasswordService } from "../services/forgetPasswordService.js"
import { getUserService } from "../services/getUserService.js"
import { loginService } from "../services/loginService.js"
import { registerService } from "../services/registerService.js"
import { resetPasswordService } from "../services/resetPasswordService.js"
import { veriftOtpService } from "../services/veriftOtpService.js"

export const userRegister = catchAsync(async(req,res,next)=> {
await registerService(req,res,next)
})
export const veriftOtp = catchAsync(async(req,res,next)=> {
await veriftOtpService(req,res,next)
})
export const userLogin = catchAsync(async(req,res,next)=> {
await loginService(req,res,next)
})
export const getUser = catchAsync(async(req,res,next)=> {
await getUserService(req,res,next)
})
export const forgetPassword = catchAsync(async(req,res,next)=> {
await forgetPasswordService(req,res,next)
})

export const resetPassword = catchAsync(async(req,res,next)=> {
await resetPasswordService(req,res,next)
})