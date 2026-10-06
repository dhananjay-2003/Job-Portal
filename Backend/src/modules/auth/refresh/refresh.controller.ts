import { NextFunction, Request, Response } from 'express';
import { tokenService } from '../auth.service.js';
import { RefreshTokenPayload } from '../auth.types.js';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '../../../models/refresh/refresh.model.js';
import { hashPassowrd } from '../utils/password.js';

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({
        message: 'Refresh Token is Missing',
        status: false,
      });

    const decodedRefreshToken = tokenService.verifyRefreshToken(
      refreshToken,
    ) as RefreshTokenPayload;

    if (decodedRefreshToken.role !== 'refresh')
      return res.status(401).json({
        message: 'Invalid Refresh Token',
        status: false,
      });

    if (!decodedRefreshToken.sub)
      return res.status(401).json({
        message: 'Invalid Refresh Token',
        status: false,
      });
    const hashedRefreshToken = hashPassowrd(refreshToken);
    const refreshTokenDb = await RefreshToken.findOne({ hashedRefreshToken });

    const userId = refreshToken.userId;

    const accessToken = tokenService.generateAccessToken({ sub: userId, role: 'accessTokens' });

    if (refreshTokenDb) {
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    }

    return res.status(200).json({
      message: 'Access Token Fetched Successfully',
    });

    next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError)
      return res.status(401).json({
        message: 'Error while validating the refresh Token',
        status: false,
      });

    if (error instanceof jwt.TokenExpiredError)
      return res.status(401).json({
        message: 'Token has been expired. Please login again.',
        status: false,
      });

    return res.status(500).json({
      message: 'Internal Server Error',
      status: false,
    });
  }
};
