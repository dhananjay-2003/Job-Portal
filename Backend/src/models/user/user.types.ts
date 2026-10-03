import { Document } from 'mongoose';

export interface IUser extends Document {
  uuid: string;
  email: string;
  mobileNo: string;
  password: string;
  firstName: string;
  lastName?: string;

  isEmailVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
}
