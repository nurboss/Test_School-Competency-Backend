import { model, Schema } from "mongoose";
import { AssessmentLevel } from "./Question.cnst";
import { IQuestion } from "./Question.interface";

const QuestionSchema = new Schema<IQuestion>(
  {
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
      enum: Object.values(AssessmentLevel),
      required: true,
    },
  },
  { timestamps: true } // auto handles createdAt & updatedAt
);

export const Question = model<IQuestion>("Question", QuestionSchema);
