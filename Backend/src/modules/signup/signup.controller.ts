import { Request, Response } from 'express';
import { signupValidationSchema } from './signup.validation.js';
import { signup } from './signup.service.js';

export const signupController = async (req: Request, res: Response) => {
  try {
    const data = signupValidationSchema.parse(req.body);

    const result = await signup(
      data.email,
      data.mobileNo,
      data.firstName,
      data.lastName,
      data.password,
    );

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error. Due to ${error}`,
    });
  }
};
