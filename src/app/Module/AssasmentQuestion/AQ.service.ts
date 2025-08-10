import { IAssessmentQuestion } from "./AQ.interface";
import { AssessmentQuestion } from "./AQ.model";

// Create
export const createAssessmentQuestion = async (
  data: IAssessmentQuestion
): Promise<IAssessmentQuestion> => {
  const question = new AssessmentQuestion(data);
  return await question.save();
};

// Get All
export const getAllAssessmentQuestions = async (): Promise<
  IAssessmentQuestion[]
> => {
  return await AssessmentQuestion.find();
};

// Get by ID
export const getAssessmentQuestionById = async (
  id: string
): Promise<IAssessmentQuestion | null> => {
  return await AssessmentQuestion.findById(id);
};

// Update
export const updateAssessmentQuestion = async (
  id: string,
  data: Partial<IAssessmentQuestion>
): Promise<IAssessmentQuestion | null> => {
  return await AssessmentQuestion.findByIdAndUpdate(id, data, { new: true });
};

// Delete
export const deleteAssessmentQuestion = async (
  id: string
): Promise<IAssessmentQuestion | null> => {
  return await AssessmentQuestion.findByIdAndDelete(id);
};
