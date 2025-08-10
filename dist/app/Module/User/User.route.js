"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ZodSchemaValidationMiddleware_1 = __importDefault(require("../../middleware/ZodSchemaValidationMiddleware"));
const User_ZodValidation_1 = require("./User.ZodValidation");
const User_const_1 = require("./User.const");
const AuthMiddleWare_1 = require("../../middleware/AuthMiddleWare");
const User_Controller_1 = require("./User.Controller");
const router = express_1.default.Router();
router.put("/profile-update/:userId", (0, AuthMiddleWare_1.authMiddleWare)(User_const_1.USER_ROLE.admin, User_const_1.USER_ROLE.user), (0, ZodSchemaValidationMiddleware_1.default)(User_ZodValidation_1.UserZodValidation.userUpdateValidationSchemaZod), User_Controller_1.userController.updateProfile);
router.get("/:userId", (0, AuthMiddleWare_1.authMiddleWare)(User_const_1.USER_ROLE.admin, User_const_1.USER_ROLE.user), User_Controller_1.userController.getSingleUser);
router.get("/", (0, AuthMiddleWare_1.authMiddleWare)(User_const_1.USER_ROLE.admin), User_Controller_1.userController.findAllUser);
exports.userRoutes = router;
