import express from "express";
import {
  register,
  verifyemail,
  login,
  resendOtp,
  logout,
  sendResetOtp,
  resetPassword,
  verifyResetOtp
} from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/verify-account", verifyemail);
router.post("/login", login);
router.post("/resend-otp", resendOtp);
// Password Reset Routes
router.post("/send-reset-otp", sendResetOtp);  // Public route
router.post("/reset-password", resetPassword); // Public route
router.post("/verify-reset-otp", verifyResetOtp); 


// Protected routes would go here
router.post("/logout", logout);

export default router;