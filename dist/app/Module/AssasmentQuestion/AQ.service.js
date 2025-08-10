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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssessmentQuestion = exports.updateAssessmentQuestion = exports.getAssessmentQuestionById = exports.getAllAssessmentQuestions = exports.createAssessmentQuestion = void 0;
const AQ_model_1 = require("./AQ.model");
// Create
const createAssessmentQuestion = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const question = new AQ_model_1.AssessmentQuestion(data);
    return yield question.save();
});
exports.createAssessmentQuestion = createAssessmentQuestion;
// Get All
const getAllAssessmentQuestions = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield AQ_model_1.AssessmentQuestion.find();
});
exports.getAllAssessmentQuestions = getAllAssessmentQuestions;
// Get by ID
const getAssessmentQuestionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield AQ_model_1.AssessmentQuestion.findById(id);
});
exports.getAssessmentQuestionById = getAssessmentQuestionById;
// Update
const updateAssessmentQuestion = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield AQ_model_1.AssessmentQuestion.findByIdAndUpdate(id, data, { new: true });
});
exports.updateAssessmentQuestion = updateAssessmentQuestion;
// Delete
const deleteAssessmentQuestion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield AQ_model_1.AssessmentQuestion.findByIdAndDelete(id);
});
exports.deleteAssessmentQuestion = deleteAssessmentQuestion;
