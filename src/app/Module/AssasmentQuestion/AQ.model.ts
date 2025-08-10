import { Schema, model } from "mongoose";
import { IAssessmentQuestion } from "./AQ.interface";

const assessmentQuestionSchema = new Schema<IAssessmentQuestion>(
  {
    numberOfQuestion: { type: Number, required: true },
    level: { type: String, required: true, trim: true },
    assessment: { type: String, required: true, trim: true },
    // completion: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const AssessmentQuestion = model<IAssessmentQuestion>(
  "AssessmentQuestion",
  assessmentQuestionSchema
);
