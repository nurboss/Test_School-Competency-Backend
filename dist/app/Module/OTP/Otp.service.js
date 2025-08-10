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
exports.createAndSendOtp = createAndSendOtp;
exports.verifyOtp = verifyOtp;
const mail_util_1 = require("../../Utils/mail.util");
const otp_util_1 = require("../../Utils/otp.util");
const Otp_model_1 = require("./Otp.model");
function createAndSendOtp(userId, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const otp = (0, otp_util_1.generateOtp)(6);
        // Remove any existing OTP for the same user
        yield Otp_model_1.Otp.deleteMany({ user_id: userId });
        yield Otp_model_1.Otp.create({ otp, user_id: userId });
        yield (0, mail_util_1.sendOtpEmail)(email, otp);
        return otp;
    });
}
function verifyOtp(userId, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = yield Otp_model_1.Otp.findOne({ user_id: userId, otp });
        return !!record;
    });
}
