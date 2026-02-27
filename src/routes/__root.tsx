import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import { getLocale } from '#/paraglide/runtime';

import appCss from '../styles.css?url';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/Header';
import { getSession } from '@/lib/auth.server';
import { session } from '../db/schema/auth-schema';

export const Route = createRootRoute({
	beforeLoad: async () => {
		// Other redirect strategies are possible; see
		// https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('lang', getLocale());
		}
	},

	notFoundComponent: () => <div>Not Found</div>,

	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'TanStack Start Starter',
			},
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
	loader: async () => {
		return {
			session: await getSession(),
		};
	},
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { session } = Route.useLoaderData();
	return (
		<html lang={getLocale()} className='dark'>
			<head>
				<HeadContent />
			</head>
			<body>
				<Header session={session} />
				{children}
				<Toaster position='top-right' />

				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
