import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from '@tanstack/react-form-start';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { ForgotPasswordFormSchema } from '../schema';

export function ForgotPasswordForm({ openLoginTab }: { openLoginTab: () => void }) {
	const form = useForm({
		defaultValues: {
			email: '',
		},
		validators: {
			onSubmit: ForgotPasswordFormSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.requestPasswordReset(
				{
					email: value.email,
					redirectTo: '/reset-password',
				},
				{
					onSuccess: () => {
						toast.success('Passowrd reset email sent');
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
						<FieldGroup>
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
								<form.Subscribe
									selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
								>
									{([canSubmit, isSubmitting]) => (
										<div className='flex w-full gap-x-3 flex-row-reverse'>
											<Button type='submit' className='flex-1' disabled={!canSubmit}>
												<LoadingSwap isLoading={isSubmitting}>Forgot Password</LoadingSwap>
											</Button>
											<Button variant={'outline'} onClick={openLoginTab}>
												Back
											</Button>
										</div>
									)}
								</form.Subscribe>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className='px-6 text-center'>
				By clicking continue, you agree to our Terms of Service and Privacy Policy
			</FieldDescription>
		</div>
	);
}
