import { createFileRoute } from '@tanstack/react-router';
import { fetchTodosFn } from '@/features/todos/functions';
import { TodoPage } from '@/features/todos/pages/TodoPage';

export const Route = createFileRoute('/_protected/todos/')({
	component: RouteComponent,
	loader: () => {
		return fetchTodosFn();
	},
});

function RouteComponent() {
	const todos = Route.useLoaderData();
	return <TodoPage todos={todos} />;
}
