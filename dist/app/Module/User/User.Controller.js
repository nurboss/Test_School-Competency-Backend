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
exports.userController = void 0;
const CustomResponse_1 = require("../../Re-Useable/CustomResponse");
const http_status_1 = __importDefault(require("http-status"));
const User_service_1 = require("./User.service");
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const tokenGetsId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    const userId = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.userId;
    try {
        const result = yield User_service_1.userService.updateProfileDB(userId, req === null || req === void 0 ? void 0 : req.body, tokenGetsId, (_c = req.user) === null || _c === void 0 ? void 0 : _c.role);
        res
            .status(201)
            .send((0, CustomResponse_1.successResponse)(result, http_status_1.default.OK, "User registered successfully"));
    }
    catch (error) {
        next(error);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const tokenGetsId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    const userId = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.userId;
    try {
        const result = yield User_service_1.userService.getSingleUserDB(tokenGetsId, userId);
        res
            .status(201)
            .send((0, CustomResponse_1.successResponse)(result, http_status_1.default.OK, "User Find Successfully Done"));
    }
    catch (error) {
        next(error);
    }
});
const findAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tokenGetsId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    const query = req === null || req === void 0 ? void 0 : req.query;
    try {
        const result = yield User_service_1.userService.findAllUserDB(tokenGetsId, query);
        res
            .status(201)
            .send((0, CustomResponse_1.successResponse)(result, http_status_1.default.OK, "All User Find Successfully Done"));
    }
    catch (error) {
        next(error);
    }
});
exports.userController = {
    updateProfile,
    getSingleUser,
    findAllUser,
};
