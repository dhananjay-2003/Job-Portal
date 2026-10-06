import { IUser } from '../../models/user/user.types.ts';

// types/express.d.ts
export {};

declare global {
  namespace Express {
    interface Request {
      accessToken: string;
      accessTokenId: string;
      refreshToken: string;
      refreshTokenId: string;
      user: IUser;
    }
  }
}
