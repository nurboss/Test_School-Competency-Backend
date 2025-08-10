"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = require("mongoose");
const Question_cnst_1 = require("./Question.cnst");
const QuestionSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    answerIndex: {
        type: Number,
        required: true,
    },
    competency: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: Object.values(Question_cnst_1.AssessmentLevel),
        required: true,
    },
}, { timestamps: true } // auto handles createdAt & updatedAt
);
exports.Question = (0, mongoose_1.model)("Question", QuestionSchema);
