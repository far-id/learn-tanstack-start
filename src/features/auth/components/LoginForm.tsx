import { Button } from '@/components/ui/button';
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Link } from '@tanstack/react-router';
import { LoginFormSchema } from '../schema';
import { PasswordInput } from '@/components/ui/password-input';
import { useForm } from '@tanstack/react-form-start';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { SocialAuthButton } from './SocialAuthButton';

export function LoginForm({
	openVerificationEmailTab,
	openForgotPasswordTab,
}: {
	openVerificationEmailTab: (email: string) => void;
	openForgotPasswordTab: () => void;
}) {
	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		validators: {
			onSubmit: LoginFormSchema,
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
					callbackURL: '/todos',
				},
				{
					onSuccess: () => {
						toast.success('Logged in successfully!');
					},
					onError: (ctx) => {
						if (ctx.error.status === 403) {
							toast.error(ctx.error.message);
							openVerificationEmailTab(value.email);
						} else {
							toast.error(ctx.error.message);
						}
					},
				},
			);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<FieldGroup>
				<Field>
					<SocialAuthButton />
				</Field>
				<FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
					Or continue with
				</FieldSeparator>
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
				<form.Field name='password'>
					{(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field>
								<div className='flex items-center'>
									<FieldLabel htmlFor='password'>Password</FieldLabel>
									<Button
										type='button'
										variant={'link'}
										onClick={openForgotPasswordTab}
										className='ml-auto leading-none h-fit py-0 text-sm underline-offset-4 hover:underline'
									>
										Forgot your password?
									</Button>
								</div>
								<PasswordInput
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									placeholder='****'
									autoComplete='off'
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}{' '}
							</Field>
						);
					}}
				</form.Field>
				<Field>
					<form.Subscribe selector={(formState) => [formState.canSubmit, formState.isSubmitting]}>
						{([canSubmit, isSubmitting]) => (
							<Button type='submit' className='mt-4 w-full' disabled={!canSubmit}>
								<LoadingSwap isLoading={isSubmitting}>Login</LoadingSwap>
							</Button>
						)}
					</form.Subscribe>
					<FieldDescription className='text-center'>
						Don&apos;t have an account? <Link to='/sign-up'>Sign up</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
