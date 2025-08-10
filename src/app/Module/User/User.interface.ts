import { Types } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./User.const";

export interface TUser {
  name: string;
  email: string;
  role?: "student" | "admin" | "supervisor";
  password: string;
  // assessment?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  // label?: "Basic Use" | "Independent" | "Proficient";
  phone: string;
  status?: "active" | "block";
  passwordChangeAt?: Date;
  isDelete?: boolean;
  profilePhoto?: string;
  isVerified?: boolean;
  userProfile?: Types.ObjectId;
}
export type TUserRole = keyof typeof USER_ROLE;
export type TUserStatus = keyof typeof USER_STATUS;
