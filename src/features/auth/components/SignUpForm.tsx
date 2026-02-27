import { useForm } from '@tanstack/react-form-start';
import { SignUpFormSchema } from '../schema';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export const SignUpForm = () => {
	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validators: {
			onSubmit: SignUpFormSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.signUp.email(
				{
					name: value.name,
					email: value.email,
					password: value.password,
					callbackURL: '/todos',
				},
				{
					onSuccess: () => {
						toast.success('Logged in successfully!');
					},
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
				},
			);
		},
	});

	return (
		<div className='flex flex-col gap-6'>
			<Card>
				<CardHeader className='text-center'>
					<CardTitle className='text-xl'>Create your account</CardTitle>
					<CardDescription>Enter your email below to create your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.Field name='name'>
								{(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Name</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder='John Doe'
												autoComplete='off'
												type='text'
												required
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									);
								}}
							</form.Field>
							<form.Field name='email'>
								{(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Email</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder='m@example.com'
												autoComplete='off'
												type='email'
												required
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									);
								}}
							</form.Field>
							<Field>
								<Field className='grid grid-cols-2 gap-4'>
									<form.Field name='password'>
										{(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Password</FieldLabel>
													<PasswordInput
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder='********'
														autoComplete='off'
														required
													/>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											);
										}}
									</form.Field>
									<form.Field name='confirmPassword'>
										{(field) => {
											const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
													<PasswordInput
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder='********'
														autoComplete='off'
														required
													/>
													{isInvalid && <FieldError errors={field.state.meta.errors} />}
												</Field>
											);
										}}
									</form.Field>
								</Field>
							</Field>
							<Field>
								<form.Subscribe
									selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
								>
									{([canSubmit, isSubmitting]) => (
										<Button type='submit' className='mt-4 w-full' disabled={!canSubmit}>
											<LoadingSwap isLoading={isSubmitting}>Create Account</LoadingSwap>
										</Button>
									)}
								</form.Subscribe>
								<FieldDescription className='text-center'>
									Already have an account? <Link to='/login'>Login</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};
