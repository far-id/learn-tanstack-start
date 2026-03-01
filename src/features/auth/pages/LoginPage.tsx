import { ListTodoIcon } from 'lucide-react';
import { LoginForm } from '../components/LoginForm';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { SendVerificationEmail } from '../components/SendVerificationEmail';
import { useState } from 'react';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

type Tab = 'login' | 'verification-email' | 'forgot-password';

export const LoginPage = () => {
	const [selectedTab, setSelectedTab] = useState<Tab>('login');
	const [email, setEmail] = useState('');

	const openVerificationEmailTab = (email: string) => {
		setSelectedTab('verification-email');
		setEmail(email);
	};

	return (
		<div className='flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
			<div className='flex w-full max-w-sm flex-col gap-6'>
				<button className='flex items-center gap-2 self-center font-medium'>
					<div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
						<ListTodoIcon className='size-4' />
					</div>
					TodoIt
				</button>
				<Tabs value={selectedTab}>
					<TabsContent value='login'>
						<LoginForm
							openVerificationEmailTab={openVerificationEmailTab}
							openForgotPasswordTab={() => {
								setSelectedTab('forgot-password');
							}}
						/>
					</TabsContent>
					<TabsContent value='verification-email'>
						<SendVerificationEmail email={email} />
					</TabsContent>
					<TabsContent value='forgot-password'>
						<ForgotPasswordForm
							openLoginTab={() => {
								setSelectedTab('login');
							}}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};
