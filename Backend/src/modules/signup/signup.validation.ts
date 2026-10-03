import { z } from 'zod';

export const signupValidationSchema = z.object({
  uuid: z.string(),
  email: z.email(),
  password: z.string().min(8).max(15),
  mobileNo: z.string().regex(/^[6-9]\d{9}/, 'Invalid Mobile Number'),
  firstName: z.string().trim().min(3).max(50),
  lastName: z.string().trim().min(3).max(50),
});
