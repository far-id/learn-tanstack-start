import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InvalidToken } from '@/features/auth/components/invalidToken';
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';

export const ResetPasswordPage = ({ token }: { token: string }) => {
	if (!token) {
		return <InvalidToken />;
	}

	return (
		<Card>
			<CardHeader className='text-center'>
				<CardTitle className='text-xl'>Forgot Password</CardTitle>
			</CardHeader>
			<CardContent>
				<ResetPasswordForm token={token} />
			</CardContent>
		</Card>
	);
};
