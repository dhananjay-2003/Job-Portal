import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.types.js';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema<IUser>(
  {
    uuid: {
      type: String,
      default: () => uuidv4() || '',
      unique: true,
      immutable: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    mobileNo: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model('User', userSchema);
