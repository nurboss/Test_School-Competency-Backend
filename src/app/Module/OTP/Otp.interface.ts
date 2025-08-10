import { Types } from "mongoose";

export interface IOtp extends Document {
  otp: string;
  user_id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
