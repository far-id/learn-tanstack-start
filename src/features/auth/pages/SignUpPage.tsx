import { ListTodo } from 'lucide-react';
import { SignUpForm } from '../components/SignUpForm';

export const SignUpPage = () => {
	return (
		<div className='flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
			<div className='flex w-full max-w-sm flex-col gap-6'>
				<button className='flex items-center gap-2 self-center font-medium'>
					<div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
						<ListTodo className='size-4' />
					</div>
					Acme Inc.
				</button>
				<SignUpForm />
			</div>
		</div>
	);
};
