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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const Auth_service_1 = require("./Auth.service");
const CustomResponse_1 = require("../../Re-Useable/CustomResponse");
const http_status_1 = __importDefault(require("http-status"));
const singUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Auth_service_1.authService.singUpDB(req.body);
        const { accessToken, refreshToken } = result;
        res.cookie("refreshToken", refreshToken, {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
        });
        res.send((0, CustomResponse_1.successResponse)({ accessToken, refreshToken }, 201, "User registered successfully"));
    }
    catch (error) {
        next(error);
    }
});
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Auth_service_1.authService.signInDB(req.body);
        const { accessToken, refreshToken } = result;
        res.cookie("refreshToken", refreshToken, {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
        });
        res.send((0, CustomResponse_1.successResponse)({ accessToken, refreshToken }, 200, "User logged in successfully"));
    }
    catch (error) {
        next(error);
    }
});
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Auth_service_1.authService.refreshTokenDB(req === null || req === void 0 ? void 0 : req.cookies.refreshToken);
        res.send((0, CustomResponse_1.successResponse)(result, http_status_1.default.OK, "Refresh Token send Successfully done "));
    }
    catch (error) {
        next(error);
    }
});
const forgetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Auth_service_1.authService.forgetPasswordDB(req.body);
        res.send((0, CustomResponse_1.successResponse)(result, http_status_1.default.OK, "Forget Password Request Done"));
    }
    catch (error) {
        next(error);
    }
});
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    try {
        const result = yield Auth_service_1.authService.changePasswordDB(token, req.body);
        res.send((0, CustomResponse_1.successResponse)(result, http_status_1.default.OK, "Password Change Successfully done "));
    }
    catch (error) {
        next(error);
    }
});
exports.authController = {
    signIn,
    singUp,
    refreshToken,
    changePassword,
    forgetPassword,
};
