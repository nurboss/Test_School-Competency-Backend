"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtpController = generateOtpController;
exports.verifyOtpController = verifyOtpController;
const Otp_service_1 = require("./Otp.service");
function generateOtpController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId, email } = req.body;
            if (!userId || !email) {
                return res.status(400).json({ error: "userId and email are required" });
            }
            yield (0, Otp_service_1.createAndSendOtp)(userId, email);
            res.json({ message: "OTP sent successfully" });
        }
        catch (error) {
            res.status(500).json({ error: "Failed to send OTP" });
        }
    });
}
function verifyOtpController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId, otp } = req.body;
            if (!userId || !otp) {
                return res.status(400).json({ error: "userId and otp are required" });
            }
            const isValid = yield (0, Otp_service_1.verifyOtp)(userId, otp);
            if (!isValid) {
                return res.status(400).json({ error: "Invalid or expired OTP" });
            }
            res.json({ message: "OTP verified successfully" });
        }
        catch (error) {
            res.status(500).json({ error: "Failed to verify OTP" });
        }
    });
}
