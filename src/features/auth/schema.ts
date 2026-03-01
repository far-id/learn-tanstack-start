import z from 'zod';

export const passwordWithConfirmationFormSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const SignUpFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.email(),
}).and(passwordWithConfirmationFormSchema);

export const LoginFormSchema = z.object({
  email: z.email().min(1, 'Email is required').max(255, 'Email must be less than 255 characters'),
  password: z.string().min(6),
});

export const ForgotPasswordFormSchema = z.object({
  email: z.email(),
});
