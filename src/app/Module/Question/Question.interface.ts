import { AssessmentLevel } from "./Question.cnst";

export interface IQuestion extends Document {
  question: string;
  options: string[];
  answer: string;
  answerIndex: number;
  competency: string;
  level: AssessmentLevel;
  createdAt: Date;
  updatedAt: Date;
}
