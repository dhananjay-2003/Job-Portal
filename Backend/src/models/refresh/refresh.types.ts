import { Document } from 'mongoose';

export interface IRefreshToken extends Document {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date;
}
