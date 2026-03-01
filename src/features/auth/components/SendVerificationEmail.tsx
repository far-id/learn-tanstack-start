import { BetterAuthActionButton } from '@/components/auth/BetterAuthActionButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { useEffect, useRef, useState } from 'react';

export const SendVerificationEmail = ({ email }: { email: string }) => {
	const intervalRef = useRef<NodeJS.Timeout>(undefined);
	const [timeToResend, setTimeToResend] = useState<number>(30);

	const StartCountDownToResend = (time = 30) => {
		setTimeToResend(time);
		intervalRef.current = setInterval(() => {
			setTimeToResend((prev) => {
				const newTime = prev - 1;
				if (newTime <= 0) {
					clearInterval(intervalRef.current);
				}
				return newTime;
			});
		}, 1000);
	};

	const sendVerificationEmail = () => {
		return authClient.sendVerificationEmail({
			email,
			callbackURL: '/todos',
		});
	};

	useEffect(() => {
		sendVerificationEmail();
		StartCountDownToResend();
	}, []);

	return (
		<div className='flex flex-col gap-6'>
			<Card>
				<CardHeader className='text-center'>
					<CardTitle className='text-xl'>Verify Your Email</CardTitle>
					<CardDescription>
						We sent an email to {email} with a verification link. Please check your email and click
						the link to verify your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<BetterAuthActionButton
						variant='outline'
						className='w-full'
						disabled={timeToResend > 0}
						action={() => {
							StartCountDownToResend();
							return sendVerificationEmail();
						}}
					>
						Resend Email {timeToResend > 0 && `(${timeToResend}s)`}
					</BetterAuthActionButton>
				</CardContent>
			</Card>
		</div>
	);
};
