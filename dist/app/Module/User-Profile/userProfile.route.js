"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileRoute = void 0;
const express_1 = __importDefault(require("express"));
const ZodSchemaValidationMiddleware_1 = __importDefault(require("../../middleware/ZodSchemaValidationMiddleware"));
const AuthMiddleWare_1 = require("../../middleware/AuthMiddleWare");
const userProfile_controller_1 = require("./userProfile.controller");
const userProfile_zodValidation_1 = require("./userProfile.zodValidation");
const User_const_1 = require("../User/User.const");
const router = express_1.default.Router();
router.put("/", (0, AuthMiddleWare_1.authMiddleWare)(User_const_1.USER_ROLE.user, User_const_1.USER_ROLE.admin), (0, ZodSchemaValidationMiddleware_1.default)(userProfile_zodValidation_1.userProfileZodValidation.userProfileZodSchema), userProfile_controller_1.userProfileController.updateUserProfile);
router.put("/create-and-remove-followers/:followerId", (0, AuthMiddleWare_1.authMiddleWare)(User_const_1.USER_ROLE.user, User_const_1.USER_ROLE.admin), (0, ZodSchemaValidationMiddleware_1.default)(userProfile_zodValidation_1.userProfileZodValidation.userProfileZodSchema), userProfile_controller_1.userProfileController.createAndRemoveFollowing);
router.get("/", (0, AuthMiddleWare_1.authMiddleWare)(User_const_1.USER_ROLE.user, User_const_1.USER_ROLE.admin), userProfile_controller_1.userProfileController.findMyProfile);
exports.userProfileRoute = router;
