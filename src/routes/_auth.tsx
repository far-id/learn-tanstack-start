import { getSession } from '@/lib/auth.server';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { ListTodo } from 'lucide-react';

export const Route = createFileRoute('/_auth')({
	beforeLoad: async () => {
		const session = await getSession();
		if (session) {
			throw redirect({ to: '/' });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
			<div className='flex w-full max-w-sm flex-col gap-6'>
				<button className='flex items-center gap-2 self-center font-medium'>
					<div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
						<ListTodo className='size-4' />
					</div>
					TodoIt
				</button>
				<Outlet />
			</div>
		</div>
	);
}
