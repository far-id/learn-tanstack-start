import { ListTodoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useForm } from '@tanstack/react-form-start';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { toast } from 'sonner';
import { passwordWithConfirmationFormSchema } from '../schema';
import { PasswordInput } from '@/components/ui/password-input';
import { InvalidToken } from '../components/invalidToken';
import { authClient } from '@/lib/auth-client';
import { useNavigate } from '@tanstack/react-router';

export const ResetPasswordPage = ({ token }: { token: string }) => {
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
		validators: {
			onSubmit: passwordWithConfirmationFormSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.resetPassword(
				{
					token,
					newPassword: value.password,
				},
				{
					onSuccess: () => {
						toast.success('Password reset successfully!');
						navigate({
							to: '/login',
						});
					},
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
				},
			);
		},
	});

	if (!token) {
		return <InvalidToken />;
	}

	return (
		<div className='flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
			<div className='flex w-full max-w-sm flex-col gap-6'>
				<button className='flex items-center gap-2 self-center font-medium'>
					<div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
						<ListTodoIcon className='size-4' />
					</div>
					TodoIt
				</button>
				<Card>
					<CardHeader className='text-center'>
						<CardTitle className='text-xl'>Forgot Password</CardTitle>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
						>
							<FieldGroup className='gap-4'>
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
								<Field>
									<form.Subscribe
										selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
									>
										{([canSubmit, isSubmitting]) => (
											<Button type='submit' className='flex-1' disabled={!canSubmit}>
												<LoadingSwap isLoading={isSubmitting}>Reset Passowrd</LoadingSwap>
											</Button>
										)}
									</form.Subscribe>
								</Field>
							</FieldGroup>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
