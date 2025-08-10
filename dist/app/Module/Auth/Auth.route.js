"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ZodSchemaValidationMiddleware_1 = __importDefault(require("../../middleware/ZodSchemaValidationMiddleware"));
const Auth_ZodValidation_1 = require("./Auth.ZodValidation");
const Auth_controller_1 = require("./Auth.controller");
const User_ZodValidation_1 = require("../User/User.ZodValidation");
const router = express_1.default.Router();
router.post("/signup", (0, ZodSchemaValidationMiddleware_1.default)(User_ZodValidation_1.UserZodValidation.userCreateValidationSchemaZod), Auth_controller_1.authController.singUp);
router.post("/signin", (0, ZodSchemaValidationMiddleware_1.default)(Auth_ZodValidation_1.authZodValidation.signInValidationSchemaZod), Auth_controller_1.authController.signIn);
router.post("/password-change", (0, ZodSchemaValidationMiddleware_1.default)(Auth_ZodValidation_1.authZodValidation.changePasswordValidationSchemaZod), Auth_controller_1.authController.changePassword);
router.post("/forget-password", (0, ZodSchemaValidationMiddleware_1.default)(Auth_ZodValidation_1.authZodValidation.forgetPasswordSchemaZod), Auth_controller_1.authController.forgetPassword);
router.post("/refresh-token", (0, ZodSchemaValidationMiddleware_1.default)(Auth_ZodValidation_1.authZodValidation.refreshTokenValidationSchemaZod), Auth_controller_1.authController.refreshToken);
exports.authRoutes = router;
