import { Request, Response } from "express";
import * as service from "./AQ.service";

// Create
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const question = await service.createAssessmentQuestion(req.body);
    res.status(201).json(question);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get All
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const questions = await service.getAllAssessmentQuestions();
    res.json(questions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get by ID
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const question = await service.getAssessmentQuestionById(req.params.id);
    if (!question) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(question);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const question = await service.updateAssessmentQuestion(
      req.params.id,
      req.body
    );
    if (!question) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(question);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await service.deleteAssessmentQuestion(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json({ message: "Deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
