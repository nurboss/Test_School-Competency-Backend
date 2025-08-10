import { IOtp } from "./Otp.interface";
import { model, Schema } from "mongoose";

const otpSchema = new Schema<IOtp>(
  {
    otp: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Optional: Automatically remove expired OTPs after 5 minutes
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const Otp = model<IOtp>("Otp", otpSchema);
