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
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error-Handle/AppError"));
const User_model_1 = require("./User.model");
const User_const_1 = require("./User.const");
const QueryBuilder_1 = __importDefault(require("../../Builder/QueryBuilder"));
const updateProfileDB = (id, body, tokenGetsId, tokenGetsRole) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.UserModel.findById(id).select("+password");
    const tokenIdByUser = yield User_model_1.UserModel.findById({ _id: tokenGetsId }).select("role status isDelete");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Data Not Found !!");
    }
    if ((user === null || user === void 0 ? void 0 : user.status) === User_const_1.USER_STATUS.block && tokenGetsRole === User_const_1.USER_ROLE.user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User Already Blocked !!");
    }
    if ((user === null || user === void 0 ? void 0 : user.isDelete) && tokenGetsRole === User_const_1.USER_ROLE.user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User Already Delete !!");
    }
    if (body === null || body === void 0 ? void 0 : body.password) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Your Can not change password !");
    }
    if (body === null || body === void 0 ? void 0 : body.email) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Your Can not change email !");
    }
    if (tokenGetsRole === User_const_1.USER_ROLE.user && tokenGetsId.toString() !== id) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Your can't change Other user info");
    }
    const result = yield User_model_1.UserModel.findByIdAndUpdate(id, {
        $set: Object.assign({}, body),
    }, { upsert: true, new: true }).select("+password");
    return result;
});
const getSingleUserDB = (tokenUserId, paramsUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.UserModel.findById({ _id: tokenUserId })
        .select("+password")
        .populate({ path: "userProfile", select: "_id followers" });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This User Not Found !");
    }
    if ((user === null || user === void 0 ? void 0 : user.status) === User_const_1.USER_STATUS.block) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User Is Already Blocked !");
    }
    if (user === null || user === void 0 ? void 0 : user.isDelete) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User Is Already Delete !");
    }
    return user;
});
const findAllUserDB = (tokenUserId, queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.UserModel.findById({ _id: tokenUserId }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This User Not Found !");
    }
    if ((user === null || user === void 0 ? void 0 : user.status) === User_const_1.USER_STATUS.block) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User Is Already Blocked !");
    }
    if (user === null || user === void 0 ? void 0 : user.isDelete) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This User Is Already Delete !");
    }
    if ((user === null || user === void 0 ? void 0 : user.role) !== User_const_1.USER_ROLE.admin) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You Can't Access This Route.Only Admin Access Here !");
    }
    const queryUser = new QueryBuilder_1.default(User_model_1.UserModel.find(), queryParams)
        .filter()
        .paginate()
        .search(User_const_1.userSearchTerm)
        .sort()
        .fields();
    const result = yield queryUser.modelQuery;
    const meta = yield queryUser.countTotal();
    return { meta, result };
});
exports.userService = {
    updateProfileDB,
    getSingleUserDB,
    findAllUserDB,
};
