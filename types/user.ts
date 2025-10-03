import z from 'zod';

export const userSchema = z.object({
  email: z.email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const registerSchema = userSchema
  .extend({
    name: z.string().nonempty('Name is required'),
    repassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.repassword, {
    path: ['repassword'],
    message: 'Passwords do not match',
  });
