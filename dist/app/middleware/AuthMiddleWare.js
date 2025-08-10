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
exports.authMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const AppError_1 = __importDefault(require("../Error-Handle/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const User_model_1 = require("../Module/User/User.model");
const User_const_1 = require("../Module/User/User.const");
dotenv_1.default.config();
const handleUnauthorizedError = (message, next) => {
    const error = new AppError_1.default(http_status_1.default.UNAUTHORIZED, message);
    next(error);
};
const authMiddleWare = (...requiredRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                return handleUnauthorizedError("You have no access to this route", next);
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_ACCESS_TOKEN);
            const { role, id } = decoded.data;
            const { iat } = decoded;
            const user = yield User_model_1.UserModel.findById(id).select("+password");
            if (!user) {
                return next(new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found"));
            }
            if (user === null || user === void 0 ? void 0 : user.isDelete) {
                return next(new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User Already Deleted !"));
            }
            if ((user === null || user === void 0 ? void 0 : user.status) === User_const_1.USER_STATUS.block) {
                return next(new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User Blocked !"));
            }
            const passwordChangeConvertMilliSecond = new Date(user === null || user === void 0 ? void 0 : user.passwordChangeAt).getTime() / 1000;
            const jwtIssueTime = iat;
            if (passwordChangeConvertMilliSecond > jwtIssueTime) {
                return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !"));
            }
            if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
                return handleUnauthorizedError("You have no access to this route", next);
            }
            const data = {
                id: user === null || user === void 0 ? void 0 : user._id,
                role: (_b = decoded === null || decoded === void 0 ? void 0 : decoded.data) === null || _b === void 0 ? void 0 : _b.role,
            };
            req.user = data;
            next();
        }
        catch (error) {
            return handleUnauthorizedError("You have no access to this route", next);
        }
    });
};
exports.authMiddleWare = authMiddleWare;
