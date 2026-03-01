import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { ListTodoIcon } from 'lucide-react';

export const InvalidToken = () => {
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
						<CardTitle className='text-xl'>Invalid Token</CardTitle>
						<CardDescription>Your token is Invalid or has expired.</CardDescription>
					</CardHeader>
					<CardContent>
						<Button asChild className='w-full'>
							<Link to='/login'>Back to Login</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
