import { Request, Response } from 'express';

export const getUser = (req: Request, res: Response) => {
  try {
    const user = req.user;
    return res.status(200).json({
      message: 'User Found',
      status: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error. Due to ${error}`,
      status: false,
    });
  }
};
