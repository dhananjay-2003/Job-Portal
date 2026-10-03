import { RefreshToken } from '../../models/refresh/refresh.model.js';
import { User } from '../../models/user/user.model.js';
import { tokenService } from '../auth/auth.service.js';
import { hashToken } from '../auth/utils/hashToken.js';
import { hashPassowrd } from '../auth/utils/password.js';

export const signup = async (
  uuid: string,
  email: string,
  mobileNo: string,
  firstName: string,
  lastName: string | undefined,
  password: string,
) => {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedMobileNo = mobileNo.toString();
  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  const existingMobileNo = await User.findOne({
    mobileNo: normalizedMobileNo,
  });

  if (existingUser || existingMobileNo) {
    throw new Error('Unable to create new user. Account already exist with this credentials');
  }

  const passwordHash = await hashPassowrd(password);

  const user = await User.create({
    uuid,
    email: normalizedEmail,
    mobileNo: normalizedMobileNo,
    password: passwordHash,
    firstName,
    lastName,
    isEmailVerified: false,
  });

  const accessToken = tokenService.generateAccessToken({
    sub: user.uuid.toString(),
    role: 'access',
  });

  const refreshToken = tokenService.generateRefreshToken({
    sub: user.uuid.toString(),
    role: 'token',
  });

  await RefreshToken.create({
    userId: user.uuid,
    tokenHash: await hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    user: {
      id: user.uuid,
      email: user.email,
      mobileNo: user.mobileNo,
      firstName: user.firstName,
      lastName: user.lastName,
      isEmailVerified: user.isEmailVerified,
    },
    accessToken,
    refreshToken,
  };
};
