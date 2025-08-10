"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Otp_controller_1 = require("./Otp.controller");
const router = express_1.default.Router();
router.post("/generate", Otp_controller_1.generateOtpController);
router.post("/verify", Otp_controller_1.verifyOtpController);
exports.otpRoutes = router;
