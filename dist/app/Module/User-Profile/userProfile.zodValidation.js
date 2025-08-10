"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileZodValidation = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// Zod validation schema for TUserProfile
const userProfileZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z
            .string()
            .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
            message: "Invalid user ID",
        })
            .optional(),
        bio: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        isCreateFollowing: zod_1.z.boolean().optional(),
        profilePhoto: zod_1.z.string().url("Invalid URL").optional(),
        coverPhoto: zod_1.z.string().url("Invalid URL").optional(),
        followers: zod_1.z
            .array(zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
            message: "Invalid follower ObjectId",
        }))
            .optional(),
    }),
});
exports.userProfileZodValidation = {
    userProfileZodSchema,
};
