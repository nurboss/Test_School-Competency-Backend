import { Request, Response } from "express";
import { Question } from "./Question.model";

// Create Question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(201).json(newQuestion);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Bulk Create Questions
export const bulkCreateQuestions = async (req: Request, res: Response) => {
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

    const newQuestions = await Question.insertMany(questions, {
      ordered: false,
    });

    res.status(201).json({
      message: `${newQuestions.length} questions created successfully`,
      data: newQuestions,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Questions
export const getQuestions = async (_req: Request, res: Response) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Question
export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findOne({ id: req.params.id });
    if (!question) return res.status(404).json({ error: "Not found" });
    res.json(question);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Update Question
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const updated = await Question.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Question
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const deleted = await Question.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
