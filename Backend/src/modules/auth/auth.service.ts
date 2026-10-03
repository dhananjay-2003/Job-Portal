import jwt from 'jsonwebtoken';
import { AccessTokenPayload, RefreshTokenPayload } from './auth.types.js';
import { jwtConfig } from '../../config/jwt.js';

export const tokenService = {
  generateAccessToken(payload: AccessTokenPayload) {
    return jwt.sign(payload, jwtConfig.jwtAccessTokenSecret, {
      expiresIn: jwtConfig.accessTokenExpiry,
      issuer: jwtConfig.jwtIssuer,
      audience: jwtConfig.jwtAudience,
    });
  },

  generateRefreshToken(payload: RefreshTokenPayload) {
    return jwt.sign(payload, jwtConfig.jwtRefreshTokenSecret, {
      expiresIn: jwtConfig.refreshTokenExpiry,
      issuer: jwtConfig.jwtIssuer,
      audience: jwtConfig.jwtAudience,
    });
  },

  verifyAccessToken(token: string) {
    return jwt.verify(token, jwtConfig.jwtAccessTokenSecret, {
      issuer: jwtConfig.jwtIssuer,
      audience: jwtConfig.jwtAudience,
    });
  },

  verifyRefreshToken(token: string) {
    return jwt.verify(token, jwtConfig.jwtRefreshTokenSecret, {
      issuer: jwtConfig.jwtIssuer,
      audience: jwtConfig.jwtAudience,
    });
  },
};
