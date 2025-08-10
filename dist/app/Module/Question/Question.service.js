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
exports.deleteQuestion = exports.updateQuestion = exports.getQuestionById = exports.getQuestions = exports.bulkCreateQuestions = exports.createQuestion = void 0;
const Question_model_1 = require("./Question.model");
// Create Question
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newQuestion = yield Question_model_1.Question.create(req.body);
        res.status(201).json(newQuestion);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.createQuestion = createQuestion;
// Bulk Create Questions
const bulkCreateQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = req.body;
        if (!Array.isArray(questions)) {
            return res
                .status(400)
                .json({ error: "Request body must be an array of questions" });
        }
        if (questions.length > 100) {
            return res
                .status(400)
                .json({ error: "Cannot insert more than 100 questions at once" });
        }
        const newQuestions = yield Question_model_1.Question.insertMany(questions, {
            ordered: false,
        });
        res.status(201).json({
            message: `${newQuestions.length} questions created successfully`,
            data: newQuestions,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.bulkCreateQuestions = bulkCreateQuestions;
// Get All Questions
const getQuestions = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield Question_model_1.Question.find();
        res.json(questions);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getQuestions = getQuestions;
// Get Single Question
const getQuestionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield Question_model_1.Question.findOne({ id: req.params.id });
        if (!question)
            return res.status(404).json({ error: "Not found" });
        res.json(question);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getQuestionById = getQuestionById;
// Update Question
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield Question_model_1.Question.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!updated)
            return res.status(404).json({ error: "Not found" });
        res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.updateQuestion = updateQuestion;
// Delete Question
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield Question_model_1.Question.findOneAndDelete({ id: req.params.id });
        if (!deleted)
            return res.status(404).json({ error: "Not found" });
        res.json({ message: "Deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteQuestion = deleteQuestion;
