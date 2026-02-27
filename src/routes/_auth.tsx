import { getSession } from '@/lib/auth.server';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
	beforeLoad: async () => {
		const session = await getSession();
		if (session) {
			throw redirect({ to: '/' });
		}
	},
	component: () => <Outlet />,
});
