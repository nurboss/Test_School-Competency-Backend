import { sendOtpEmail } from "../../Utils/mail.util";
import { generateOtp } from "../../Utils/otp.util";
import { Otp } from "./Otp.model";

export async function createAndSendOtp(userId: string, email: string) {
  const otp = generateOtp(6);

  // Remove any existing OTP for the same user
  await Otp.deleteMany({ user_id: userId });

  await Otp.create({ otp, user_id: userId });
  await sendOtpEmail(email, otp);

  return otp;
}

export async function verifyOtp(userId: string, otp: string) {
  const record = await Otp.findOne({ user_id: userId, otp });
  return !!record;
}
