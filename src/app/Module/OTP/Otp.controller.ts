import { Request, Response } from "express";
import { createAndSendOtp, verifyOtp } from "./Otp.service";

export async function generateOtpController(req: Request, res: Response) {
  try {
    const { userId, email } = req.body;
    if (!userId || !email) {
      return res.status(400).json({ error: "userId and email are required" });
    }

    await createAndSendOtp(userId, email);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
}

export async function verifyOtpController(req: Request, res: Response) {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      return res.status(400).json({ error: "userId and otp are required" });
    }

    const isValid = await verifyOtp(userId, otp);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to verify OTP" });
  }
}
