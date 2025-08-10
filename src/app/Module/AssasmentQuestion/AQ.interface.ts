export interface IAssessmentQuestion extends Document {
  numberOfQuestion: number;
  level: string;
  assessment: string;
  //   completion: string;
  createdAt?: Date;
  updatedAt?: Date;
}
