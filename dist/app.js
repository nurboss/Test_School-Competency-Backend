"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHandle_1 = __importDefault(require("../src/app/Error-Handle/globalErrorHandle"));
const normalMiddleware_1 = __importDefault(require("../src/app/middleware/normalMiddleware"));
const Auth_route_1 = require("./app/Module/Auth/Auth.route");
const userProfile_route_1 = require("./app/Module/User-Profile/userProfile.route");
const User_route_1 = require("./app/Module/User/User.route");
const Question_route_1 = require("./app/Module/Question/Question.route");
const Otp_route_1 = require("./app/Module/OTP/Otp.route");
const AQ_route_1 = require("./app/Module/AssasmentQuestion/AQ.route");
const app = (0, express_1.default)();
(0, normalMiddleware_1.default)(app);
// "/api/";
app.use("/api/auth", Auth_route_1.authRoutes);
app.use("/api/user", User_route_1.userRoutes);
app.use("/api/user-profile", userProfile_route_1.userProfileRoute);
app.use("/api/questions", Question_route_1.questionRoutes);
app.use("/otp", Otp_route_1.otpRoutes);
app.use("/api/assessment-questions", AQ_route_1.assessmentQuestionRoutes);
app.get("/", (req, res) => {
    res.send("Level-2 setup ");
});
app.all("*", (req, res, next) => {
    const error = new Error(`Can't find ${req.url} on the server`);
    next(error);
});
// global error handle
app.use(globalErrorHandle_1.default);
exports.default = app;
