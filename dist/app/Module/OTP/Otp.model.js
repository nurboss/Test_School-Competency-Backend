"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    otp: { type: String, required: true },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
// Optional: Automatically remove expired OTPs after 5 minutes
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
exports.Otp = (0, mongoose_1.model)("Otp", otpSchema);
