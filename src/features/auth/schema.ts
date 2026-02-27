import z from 'zod';

export const SignUpFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})


export const LoginFormSchema = z.object({
  email: z.email().min(1, 'Email is required').max(255, 'Email must be less than 255 characters'),
  password: z.string().min(6),
});
