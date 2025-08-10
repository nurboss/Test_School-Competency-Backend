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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["student", "admin", "supervisor"],
        required: true,
        default: "student",
    },
    status: {
        type: String,
        enum: ["active", "block"],
        default: "active",
    },
    // label: {
    //   type: String,
    //   enum: ["Basic Use", "Independent", "Proficient"],
    //   default: "Basic Use",
    // },
    // assessment: {
    //   type: String,
    //   enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
    //   default: "A1",
    // },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
        select: false, // Use `select: false` to omit password by default
    },
    phone: {
        type: String,
        required: true,
    },
    passwordChangeAt: {
        type: Date,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    profilePhoto: {
        type: String,
        default: "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
    },
    isVerified: {
        type: Boolean,
        default: false, // Default value if not provided
    },
    userProfile: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserProfile",
    },
}
// {
//   timestamps: true,
//   toJSON: {
//     transform: (doc, ret) => {
//       delete ret.password; // Explicitly remove password from the JSON output
//       return ret;
//     },
//   },
// }
);
// using middleware pre hook by save data   === Before
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const userData = this;
        userData.password = yield bcrypt_1.default.hash(this.password, Number(process.env.BCRYPT_NUMBER));
        next();
    });
});
// after save data  middle ware
userSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = "";
        next();
    });
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
