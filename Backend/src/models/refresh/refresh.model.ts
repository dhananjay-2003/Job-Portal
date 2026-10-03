import mongoose, { Schema } from 'mongoose';
import { IRefreshToken } from './refresh.types.js';

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: {
      type: String,
      ref: 'User',
      required: true,
      index: true,
    },

    tokenHash: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    revokedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);
