"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("./handleZodError"));
const dotenv_1 = __importDefault(require("dotenv"));
const handleValidationError_1 = __importDefault(require("./handleValidationError"));
const handleCastError_1 = __importDefault(require("./handleCastError"));
const handleDuplicateError_1 = __importDefault(require("./handleDuplicateError"));
const AppError_1 = __importDefault(require("./AppError"));
dotenv_1.default.config();
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong !";
    let errorSources = [
        {
            path: "",
            message: "",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifyError = (0, handleZodError_1.default)(err);
        (statusCode = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.statusCode);
        (message = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.message);
        (errorSources = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.errorSources);
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifyError = (0, handleValidationError_1.default)(err);
        (statusCode = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.statusCode);
        (message = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.message);
        (errorSources = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.errorSources);
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifyError = (0, handleCastError_1.default)(err);
        (statusCode = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.statusCode);
        (message = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.message);
        (errorSources = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.errorSources);
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifyError = (0, handleCastError_1.default)(err);
        statusCode = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.statusCode;
        message = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.message;
        errorSources = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifyError = (0, handleDuplicateError_1.default)(err);
        (statusCode = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.statusCode);
        (message = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.message);
        (errorSources = simplifyError === null || simplifyError === void 0 ? void 0 : simplifyError.errorSources);
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: process.env.NODE_ENV === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
