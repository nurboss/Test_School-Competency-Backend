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
exports.userProfileService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error-Handle/AppError"));
const User_model_1 = require("../User/User.model");
const User_const_1 = require("../User/User.const");
const userProfile_model_1 = __importDefault(require("./userProfile.model"));
const updateUserProfileDB = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.UserModel.findById(userId).select("+password");
    // Find user profile by the userId field in the UserProfileModel
    const userProfile = yield userProfile_model_1.default.findOne({ userId }).select("_id");
    if (!userProfile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Profile Data Not Found !");
    }
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Not found !");
    }
    if (user === null || user === void 0 ? void 0 : user.isDelete) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Already Delete !");
    }
    if ((user === null || user === void 0 ? void 0 : user.status) === User_const_1.USER_STATUS.block) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Already Blocked!");
    }
    if (payload === null || payload === void 0 ? void 0 : payload.profilePhoto) {
        yield User_model_1.UserModel.findByIdAndUpdate({ _id: userId }, {
            profilePhoto: payload === null || payload === void 0 ? void 0 : payload.profilePhoto,
        });
    }
    const result = yield userProfile_model_1.default.findOneAndUpdate({ userId }, {
        $set: Object.assign({}, payload),
    }, {
        new: true,
        upsert: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.EXPECTATION_FAILED, "User Profile Update Failed");
    }
    return result;
});
const createAndRemoveFollowingDB = (userId, followersId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.UserModel.findById(userId).select("+password");
    // Find user profile by the userId field in the UserProfileModel
    const userProfile = yield userProfile_model_1.default.findOne({
        userId: followersId,
    }).select("_id");
    if (!userProfile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Profile Data Not Found !");
    }
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Not found !");
    }
    if (user === null || user === void 0 ? void 0 : user.isDelete) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Already Delete !");
    }
    if ((user === null || user === void 0 ? void 0 : user.status) === User_const_1.USER_STATUS.block) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Already Blocked!");
    }
    if ((payload === null || payload === void 0 ? void 0 : payload.isCreateFollowing) === true) {
        const result = yield userProfile_model_1.default.findOneAndUpdate({
            userId: followersId,
            followers: { $ne: user === null || user === void 0 ? void 0 : user._id },
        }, {
            $addToSet: { followers: user === null || user === void 0 ? void 0 : user._id },
        }, {
            new: true,
        }).select("followers");
        if (!result) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Your Are Already Following");
        }
        return result;
    }
    if ((payload === null || payload === void 0 ? void 0 : payload.isCreateFollowing) === false) {
        const result = yield userProfile_model_1.default.findOneAndUpdate({
            userId: followersId,
        }, {
            $pull: { followers: user === null || user === void 0 ? void 0 : user._id },
        }, {
            new: true,
        }).select("followers");
        if (!result) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Please Follow Fast");
        }
        return result;
    }
});
const findMyProfileDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.UserModel.findById(userId).select("+password");
    // Find user profile by the userId field in the UserProfileModel
    const userProfile = yield userProfile_model_1.default.findOne({
        userId,
    })
        .populate({
        path: "userId",
        select: "+password",
    })
        .populate({
        path: "followers",
        select: "_id name profilePhoto isVerified",
    });
    if (!userProfile) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Profile Data Not Found !");
    }
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Not found !");
    }
    if (user === null || user === void 0 ? void 0 : user.isDelete) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Already Delete !");
    }
    if ((user === null || user === void 0 ? void 0 : user.status) === User_const_1.USER_STATUS.block) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User Already Blocked!");
    }
    return userProfile;
});
exports.userProfileService = {
    updateUserProfileDB,
    createAndRemoveFollowingDB,
    findMyProfileDB,
};
