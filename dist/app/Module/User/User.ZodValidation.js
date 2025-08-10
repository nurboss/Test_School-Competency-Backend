"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodValidation = void 0;
const zod_1 = require("zod");
const userCreateValidationSchemaZod = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty("Name is required"),
        email: zod_1.z
            .string()
            .email({ message: "Email must be a valid email" })
            .nonempty({ message: "Email is required" }),
        role: zod_1.z
            .enum(["student", "admin", "supervisor"], {
            required_error: "Role is required",
        })
            .optional(),
        status: zod_1.z
            .enum(["active", "block"], { required_error: "Status is required" })
            .optional(),
        isDelete: zod_1.z.boolean().optional(),
        userProfile: zod_1.z.string().optional(),
        password: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .max(20, "Password must be at most 20 characters long")
            .nonempty("Password is required"),
        phone: zod_1.z.string().nonempty("Phone number is required"),
        profilePhoto: zod_1.z.string().nonempty("Profile Photo is required").optional(),
        isVerified: zod_1.z.boolean().optional(),
    }),
});
const userUpdateValidationSchemaZod = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty("Name is required").optional(),
        email: zod_1.z
            .string()
            .email({ message: "Email must be a valid email" })
            .nonempty({ message: "Email is required" })
            .optional(),
        role: zod_1.z
            .enum(["student", "admin", "supervisor"], {
            required_error: "Role is required",
        })
            .optional(),
        status: zod_1.z
            .enum(["active", "block"], { required_error: "Status is required" })
            .optional(),
        userProfile: zod_1.z.string().optional(),
        profilePhoto: zod_1.z.string().nonempty("Profile Photo is required").optional(),
        isDelete: zod_1.z.boolean().optional(),
        phone: zod_1.z.string().nonempty("Phone number is required").optional(),
        isVerified: zod_1.z.boolean().optional(),
    }),
});
exports.UserZodValidation = {
    userCreateValidationSchemaZod,
    userUpdateValidationSchemaZod,
};
