import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  phone: z.string()
    .regex(/^\+?[0-9]\d{1,14}$/, 'Please enter a valid phone number')
});


export const loginSchema = z.object({
    email: z.string()
      .email('Please enter a valid email address'),
    password: z.string()
      .min(1, 'Password is required')
  });