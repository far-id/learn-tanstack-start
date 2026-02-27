import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import type { getSession } from '@/lib/auth.server';
import { Link, useNavigate } from '@tanstack/react-router';
import { BetterAuthActionButton } from './auth/BetterAuthActionButton';

export const Header = ({ session }: { session: Awaited<ReturnType<typeof getSession>> }) => {
	const navigate = useNavigate();

	const logout = () => {
		return authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					navigate({ to: '/login' });
				},
			},
		});
	};
	return (
		<div className='flex flex-1 flex-col'>
			<header className='bg-card sticky top-0 z-50 border-b'>
				<div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
					<div className='flex items-center gap-4'>
						<Breadcrumb className='hidden sm:block'>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink href='#'>Home</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink href='#'>Todos</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>Free</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<div className='flex items-center gap-1.5'>
						{session ? (
							<>
								<span>{session?.user?.name}</span>
								<BetterAuthActionButton variant='destructive' size='sm' action={logout}>
									Logout
								</BetterAuthActionButton>
							</>
						) : (
							<>
								<Button size='sm' asChild>
									<Link to='/login'>Login</Link>
								</Button>
								<Button size='sm' asChild>
									<Link to='/sign-up'>Sign up</Link>
								</Button>
							</>
						)}
					</div>
				</div>
			</header>
		</div>
	);
};
