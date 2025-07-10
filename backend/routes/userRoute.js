import express from "express";
import {
  adminLogin,
  getUserInfo,
  updateUser,
  userGetOtp,
  userLogin,
  userRegister,
  userResetPassword,
  userVerifyOTP,
} from "../controllers/userController.js";
import upload from "../middleware/multer.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.post("/admin", adminLogin);
userRouter.post("/get", authUser, getUserInfo);
userRouter.post("/getotp", userGetOtp);
userRouter.post("/verifyotp", userVerifyOTP);
userRouter.post("/resetpassword", userResetPassword);
userRouter.post("/update",  upload.single("image"), updateUser);

export default userRouter;
