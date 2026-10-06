import { Request, Response } from 'express';
import { User } from '../../../models/user/user.model.js';
import { verifyPassword } from '../utils/password.js';
import { tokenService } from '../auth.service.js';
import { RefreshToken } from '../../../models/refresh/refresh.model.js';
import { hashToken } from '../utils/hashToken.js';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        status: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordMatch = await verifyPassword(user.password, password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        status: false,
        message: 'Invalid email or password',
      });
    }

    // Generate access token
    const accessToken = tokenService.generateAccessToken({
      sub: user.uuid,
      role: 'access',
    });

    // Generate refresh token
    const refreshToken = tokenService.generateRefreshToken({
      sub: user.uuid,
      role: 'refresh',
    });

    // Hash refresh token before storing
    const tokenHash = await hashToken(refreshToken);

    // Store refresh token hash
    await RefreshToken.findOneAndUpdate(
      { userId: user.uuid },
      {
        userId: user.uuid,
        tokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        revokedAt: null,
      },
      {
        upsert: true,
        new: true,
      },
    );

    // Access token cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    // Refresh token cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: true,
      message: 'Login successful',
      data: {
        user: {
          email: user.email,
          mobileNo: user.mobileNo,
          firstName: user.firstName,
          lastName: user.lastName,
          isEmailVerified: user.isEmailVerified,
        },
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
};
