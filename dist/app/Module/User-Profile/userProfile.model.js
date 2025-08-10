"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the schema
const UserProfileSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    bio: {
        type: String,
    },
    isCreateFollowing: {
        type: Boolean,
    },
    description: {
        type: String,
    },
    profilePhoto: {
        type: String,
    },
    coverPhoto: {
        type: String,
    },
    followers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, { timestamps: true });
// Create the model
const UserProfileModel = (0, mongoose_1.model)("UserProfile", UserProfileSchema);
exports.default = UserProfileModel;
