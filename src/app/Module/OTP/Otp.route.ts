import express from "express";
import { generateOtpController, verifyOtpController } from "./Otp.controller";

const router = express.Router();

router.post("/generate", generateOtpController);
router.post("/verify", verifyOtpController);

export const otpRoutes = router;
