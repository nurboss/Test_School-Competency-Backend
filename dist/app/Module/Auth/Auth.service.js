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
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error-Handle/AppError"));
const BcryptValidatin_1 = require("../../Re-Useable/BcryptValidatin");
const User_model_1 = require("../User/User.model");
const Auth_utils_1 = require("./Auth.utils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const User_const_1 = require("../User/User.const");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userProfile_model_1 = __importDefault(require("../User-Profile/userProfile.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const emailSender_1 = require("../../Utils/emailSender");
const singUpDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const session = yield mongoose_1.default.startSession(); // Start a new session for the transaction
    session.startTransaction(); // Begin the transaction
    try {
        // Check if the user already exists
        const user = yield User_model_1.UserModel.findOne({
            $or: [{ email: payload === null || payload === void 0 ? void 0 : payload.email }, { phone: payload === null || payload === void 0 ? void 0 : payload.phone }],
        })
            .select("email")
            .session(session); // Add session to the query
        if (user) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User Already Exists. Change Email Or Phone Number");
        }
        // Create the new user
        const result = yield User_model_1.UserModel.create([payload], { session }); // Use session in create
        if (!((_a = result[0]) === null || _a === void 0 ? void 0 : _a._id)) {
            throw new AppError_1.default(http_status_1.default.EXPECTATION_FAILED, "User Creation Failed");
        }
        // Create the user profile
        const createUserProfile = yield userProfile_model_1.default.create([
            {
                userId: (_b = result[0]) === null || _b === void 0 ? void 0 : _b._id,
                profilePhoto: (_c = result[0]) === null || _c === void 0 ? void 0 : _c.profilePhoto,
            },
        ], { session });
        if (!((_d = createUserProfile[0]) === null || _d === void 0 ? void 0 : _d._id)) {
            throw new AppError_1.default(http_status_1.default.EXPECTATION_FAILED, "User Profile Creation Failed");
        }
        // Update the user with the profile ID
        yield User_model_1.UserModel.updateOne({ _id: (_e = result[0]) === null || _e === void 0 ? void 0 : _e._id }, { userProfile: createUserProfile[0]._id }, // Set the userProfile to the created profile ID
        { session });
        // If both user and profile creation succeeded, commit the transaction
        yield session.commitTransaction();
        // Generate JWT tokens
        const jwtPayload = {
            id: (_f = result[0]) === null || _f === void 0 ? void 0 : _f._id,
            role: (_g = result[0]) === null || _g === void 0 ? void 0 : _g.role,
            isVerified: (_h = result[0]) === null || _h === void 0 ? void 0 : _h.isVerified,
            profilePhoto: (_j = result[0]) === null || _j === void 0 ? void 0 : _j.profilePhoto,
            phone: (_k = result[0]) === null || _k === void 0 ? void 0 : _k.phone,
            email: (_l = result[0]) === null || _l === void 0 ? void 0 : _l.email,
            name: (_m = result[0]) === null || _m === void 0 ? void 0 : _m.name,
        };
        const accessToken = (0, Auth_utils_1.dynamicTokenGenerate)(jwtPayload, process.env.SECRET_ACCESS_TOKEN, process.env.SECRET_ACCESS_TOKEN_TIME);
        const refreshToken = (0, Auth_utils_1.dynamicTokenGenerate)(jwtPayload, process.env.SECRET_REFRESH_TOKEN, process.env.SECRET_REFRESH_TOKEN_TIME);
        if (!accessToken) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, "Something Went Wrong!");
        }
        // Return the tokens
        return {
            accessToken,
            refreshToken,
        };
    }
    catch (error) {
        // If any error occurs, rollback the transaction
        yield session.abortTransaction();
        throw error; // Re-throw the error to be handled by the caller
    }
    finally {
        // End the session
        session.endSession();
    }
});
const signInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield User_model_1.UserModel.findOne({ email: email }).select("+password");
    if (!user) {
        throw new AppError_1.default(404, "No Data Found");
    }
    const isDelete = user === null || user === void 0 ? void 0 : user.isDelete;
    if (isDelete) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User Already Delete !");
    }
    const isBlock = user === null || user === void 0 ? void 0 : user.status;
    if (isBlock === User_const_1.USER_STATUS.block) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User Already Blocked !");
    }
    const checkPassword = yield (0, BcryptValidatin_1.validateLoginPassword)(password, user === null || user === void 0 ? void 0 : user.password);
    if (!checkPassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Your Password dose not matched !!");
    }
    const jwtPayload = {
        id: user === null || user === void 0 ? void 0 : user._id,
        role: user === null || user === void 0 ? void 0 : user.role,
        isVerified: user === null || user === void 0 ? void 0 : user.isVerified,
        profilePhoto: user === null || user === void 0 ? void 0 : user.profilePhoto,
        phone: user === null || user === void 0 ? void 0 : user.phone,
        email: user === null || user === void 0 ? void 0 : user.email,
        name: user === null || user === void 0 ? void 0 : user.name,
    };
    const accessToken = (0, Auth_utils_1.dynamicTokenGenerate)(jwtPayload, process.env.SECRET_ACCESS_TOKEN, process.env.SECRET_ACCESS_TOKEN_TIME);
    const refreshToken = (0, Auth_utils_1.dynamicTokenGenerate)(jwtPayload, process.env.SECRET_REFRESH_TOKEN, process.env.SECRET_REFRESH_TOKEN_TIME);
    if (!accessToken) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "Something Went Wrong !!");
    }
    return {
        accessToken,
        refreshToken,
    };
});
const refreshTokenDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !!!");
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_REFRESH_TOKEN);
    // validation is exists
    const { id } = decoded.data;
    const { iat } = decoded;
    const user = yield User_model_1.UserModel.findById(id).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This User Not Found !");
    }
    // validate isExistsUserDeleted
    const isExistsUserDeleted = user === null || user === void 0 ? void 0 : user.isDelete;
    if (isExistsUserDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This User Already Deleted !");
    }
    const isExistsUserStatus = user === null || user === void 0 ? void 0 : user.status;
    if (isExistsUserStatus === (User_const_1.USER_STATUS === null || User_const_1.USER_STATUS === void 0 ? void 0 : User_const_1.USER_STATUS.block)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This User Blocked !");
    }
    const passwordChangeConvertMilliSecond = new Date(user === null || user === void 0 ? void 0 : user.passwordChangeAt).getTime() / 1000;
    const jwtIssueTime = iat;
    if (passwordChangeConvertMilliSecond > jwtIssueTime) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    // implements jwt token
    const jwtPayload = {
        id: user === null || user === void 0 ? void 0 : user._id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, Auth_utils_1.dynamicTokenGenerate)(jwtPayload, process.env.SECRET_ACCESS_TOKEN, process.env.SECRET_ACCESS_TOKEN_TIME);
    return { accessToken };
});
const forgetPasswordDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = payload;
    // validation is exists
    const user = yield User_model_1.UserModel.findById({ _id: id }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This User Not Found !");
    }
    // validate isExistsUserDeleted
    const isExistsUserDeleted = user === null || user === void 0 ? void 0 : user.isDelete;
    if (isExistsUserDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This User Already Deleted !");
    }
    const isExistsUserStatus = user === null || user === void 0 ? void 0 : user.status;
    if (isExistsUserStatus === (User_const_1.USER_STATUS === null || User_const_1.USER_STATUS === void 0 ? void 0 : User_const_1.USER_STATUS.block)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This User Blocked !");
    }
    const jwtPayload = {
        id: user === null || user === void 0 ? void 0 : user._id, // Change 'userId' to 'id'
        role: (user === null || user === void 0 ? void 0 : user.role) || "user", // Ensure role is always a string, default to 'user'
    };
    const resetToken = (0, Auth_utils_1.dynamicTokenGenerate)(jwtPayload, process.env.SECRET_ACCESS_TOKEN, "10m");
    const resetUILink = `${process.env.FRONTEND_URL}/forget-password?id=${user.id}&token=${resetToken} `;
    yield (0, emailSender_1.emailSender)(user === null || user === void 0 ? void 0 : user.email, resetUILink);
    // updating user model needPassword change false and password bcrypt
    // let newPasswordBcrypt;
    // if (checkPassword) {
    //   newPasswordBcrypt = await Bcrypt.hash(
    //     newPassword,
    //     Number(process.env.BCRYPT_NUMBER)
    //   );
    // }
    // if (!newPasswordBcrypt) {
    //   throw new AppError(400, "Password Not Change here");
    // }
});
const changePasswordDB = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = payload;
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_ACCESS_TOKEN); // Explicitly handle both cases
    const { id } = decoded.data;
    // validation is exists
    const user = yield User_model_1.UserModel.findById({ _id: id }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This User Not Found !");
    }
    // validate isExistsUserDeleted
    const isExistsUserDeleted = user === null || user === void 0 ? void 0 : user.isDelete;
    if (isExistsUserDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This User Already Deleted !");
    }
    const isExistsUserStatus = user === null || user === void 0 ? void 0 : user.status;
    if (isExistsUserStatus === (User_const_1.USER_STATUS === null || User_const_1.USER_STATUS === void 0 ? void 0 : User_const_1.USER_STATUS.block)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This User Blocked !");
    }
    if ((user === null || user === void 0 ? void 0 : user.email) !== email) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Token email and payload email dose't match !!");
    }
    // updating user model needPassword change false and password bcrypt
    const newPasswordBcrypt = yield bcrypt_1.default.hash(newPassword, Number(process.env.BCRYPT_NUMBER));
    if (!newPasswordBcrypt) {
        throw new AppError_1.default(400, "Password Not Change here");
    }
    const result = yield User_model_1.UserModel.findByIdAndUpdate({ _id: id }, {
        password: newPasswordBcrypt,
        passwordChangeAt: new Date(),
    });
    if (result) {
        return null;
    }
    else {
        throw new AppError_1.default(400, "Password Not Change here");
    }
});
exports.authService = {
    signInDB,
    singUpDB,
    refreshTokenDB,
    changePasswordDB,
    forgetPasswordDB,
};
