import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignUpForm } from '@/features/auth/components/SignUpForm';

export const SignUpPage = () => {
	return (
		<div className='flex flex-col gap-6'>
			<Card>
				<CardHeader className='text-center'>
					<CardTitle className='text-xl'>Create your account</CardTitle>
					<CardDescription>Enter your email below to create your account</CardDescription>
				</CardHeader>
				<CardContent>
					<SignUpForm />
				</CardContent>
			</Card>
		</div>
	);
};
