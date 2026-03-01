import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { SendVerificationEmail } from '@/features/auth/components/SendVerificationEmail';
import { useState } from 'react';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';

type Tab = 'login' | 'verification-email' | 'forgot-password';

export const LoginPage = () => {
	const [selectedTab, setSelectedTab] = useState<Tab>('login');
	const [email, setEmail] = useState('');

	const openVerificationEmailTab = (email: string) => {
		setSelectedTab('verification-email');
		setEmail(email);
	};

	return (
		<Tabs value={selectedTab}>
			<TabsContent value='login'>
				<div className='flex flex-col gap-6'>
					<Card>
						<CardHeader className='text-center'>
							<CardTitle className='text-xl'>Welcome back</CardTitle>
							<CardDescription>Login with your Apple or Google account</CardDescription>
						</CardHeader>
						<CardContent>
							<LoginForm
								openVerificationEmailTab={openVerificationEmailTab}
								openForgotPasswordTab={() => {
									setSelectedTab('forgot-password');
								}}
							/>
						</CardContent>
					</Card>
				</div>
			</TabsContent>
			<TabsContent value='verification-email'>
				<div className='flex flex-col gap-6'>
					<Card>
						<CardHeader className='text-center'>
							<CardTitle className='text-xl'>Verify Your Email</CardTitle>
							<CardDescription>
								We sent an email to {email} with a verification link. Please check your email and
								click the link to verify your account.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<SendVerificationEmail email={email} />
						</CardContent>
					</Card>
				</div>
			</TabsContent>
			<TabsContent value='forgot-password'>
				<div className='flex flex-col gap-6'>
					<Card>
						<CardHeader className='text-center'>
							<CardTitle className='text-xl'>Forgot Password</CardTitle>
						</CardHeader>
						<CardContent>
							<ForgotPasswordForm
								openLoginTab={() => {
									setSelectedTab('login');
								}}
							/>
						</CardContent>
					</Card>
				</div>
			</TabsContent>
		</Tabs>
	);
};
