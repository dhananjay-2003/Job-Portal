import argon2 from 'argon2';

export const hashToken = (token: string): Promise<string> => {
  return argon2.hash(token);
};

export const verifyToken = (storedToken: string, passedToken: string): Promise<boolean> => {
  return argon2.verify(storedToken, passedToken);
};
