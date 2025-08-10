"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authZodValidation = void 0;
const zod_1 = require("zod");
const signInValidationSchemaZod = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email({ message: "Email must be a valid email" })
            .nonempty({ message: "Email is required" }),
        password: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
const changePasswordValidationSchemaZod = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .email({ message: "Email must be a valid email" })
            .nonempty({ message: "Email is required" }),
        newPassword: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
const forgetPasswordSchemaZod = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Id should be string" }),
    }),
});
const refreshTokenValidationSchemaZod = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required!",
        }),
    }),
});
exports.authZodValidation = {
    signInValidationSchemaZod,
    refreshTokenValidationSchemaZod,
    changePasswordValidationSchemaZod,
    forgetPasswordSchemaZod,
};
