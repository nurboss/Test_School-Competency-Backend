"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentQuestion = void 0;
const mongoose_1 = require("mongoose");
const assessmentQuestionSchema = new mongoose_1.Schema({
    numberOfQuestion: { type: Number, required: true },
    level: { type: String, required: true, trim: true },
    assessment: { type: String, required: true, trim: true },
    // completion: { type: String, required: true, trim: true },
}, { timestamps: true });
exports.AssessmentQuestion = (0, mongoose_1.model)("AssessmentQuestion", assessmentQuestionSchema);
