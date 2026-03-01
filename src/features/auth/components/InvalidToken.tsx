import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';

export const InvalidToken = () => {
	return (
		<Card>
			<CardHeader className='text-center'>
				<CardTitle className='text-xl'>Invalid Token</CardTitle>
				<CardDescription>Your token is Invalid or has expired.</CardDescription>
			</CardHeader>
			<CardContent>
				<Button asChild className='w-full'>
					<Link to='/login'>Back to Login</Link>
				</Button>
			</CardContent>
		</Card>
	);
};
