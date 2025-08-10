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
exports.userProfileController = void 0;
const userProfile_service_1 = require("./userProfile.service");
const CustomResponse_1 = require("../../Re-Useable/CustomResponse");
const http_status_1 = __importDefault(require("http-status"));
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield userProfile_service_1.userProfileService.updateUserProfileDB(req === null || req === void 0 ? void 0 : req.body, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
        res
            .status(200)
            .send((0, CustomResponse_1.successResponse)(result, http_status_1.default.OK, "User Profile Update Done"));
    }
    catch (error) {
        next(error);
    }
});
const createAndRemoveFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const result = yield userProfile_service_1.userProfileService.createAndRemoveFollowingDB((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id, (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.followerId, req === null || req === void 0 ? void 0 : req.body);
        res
            .status(200)
            .send((0, CustomResponse_1.successResponse)(result, http_status_1.default.OK, "Following Update Done"));
    }
    catch (error) {
        next(error);
    }
});
const findMyProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield userProfile_service_1.userProfileService.findMyProfileDB((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
        res
            .status(200)
            .send((0, CustomResponse_1.successResponse)(result, http_status_1.default.OK, "Find My Profile Successfully Done"));
    }
    catch (error) {
        next(error);
    }
});
exports.userProfileController = {
    updateUserProfile,
    createAndRemoveFollowing,
    findMyProfile,
};
