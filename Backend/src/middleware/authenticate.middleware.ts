import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { tokenService } from '../modules/auth/auth.service.js';
import { RefreshTokenPayload } from '../modules/auth/auth.types.js';
import { User } from '../models/user/user.model.js';

export const AuthenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken)
      return res.status(401).json({
        message: 'Access Token is missing',
        status: false,
      });

    const decodedAccessToken = tokenService.verifyAccessToken(accessToken) as RefreshTokenPayload;

    if (decodedAccessToken.role !== 'access')
      return res.status(401).json({
        message: 'Invalid Acccess Token',
        status: false,
      });

    if (!decodedAccessToken.sub)
      return res.status(401).json({
        message: 'Invalid Access Token',
        status: false,
      });

    const user = await User.findOne({ uuid: decodedAccessToken.sub });

    if (!user)
      return res.status(401).json({
        message: 'User does not exist',
        status: false,
      });

    req.accessToken = accessToken;
    req.accessTokenId = decodedAccessToken.sub;
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      return res.status(401).json({
        message: 'Access Token has been Expired',
      });

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: 'Error in refresh Token',
      });
    }
    return res.status(500).json({
      message: `Internal server Error. Due to ${error}`,
    });
  }
};
