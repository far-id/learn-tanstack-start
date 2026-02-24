import { createFileRoute } from '@tanstack/react-router';
import { TodoPage } from '@/features/todos/pages/TodoPage';
import { fetchTodosFn } from '@/features/todos/functions';

export const Route = createFileRoute('/')({
	component: App,
	loader: () => {
		return fetchTodosFn();
	},
});

function App() {
	const todos = Route.useLoaderData();
	return <TodoPage todos={todos} />;
}
