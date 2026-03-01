import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/reset-password')({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>) => ({
		token: String(search.token ?? ''),
	}),
});

function RouteComponent() {
	const { token } = Route.useSearch();
	return <ResetPasswordPage token={token} />;
}
