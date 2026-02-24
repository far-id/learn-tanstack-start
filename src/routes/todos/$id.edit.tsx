import { getTodoByIdFn } from '@/features/todos/functions';
import { EditTodoPage } from '@/features/todos/pages/EditTodoPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/todos/$id/edit')({
	component: RouteComponent,
	loader: async ({ params }) => {
		return await getTodoByIdFn({ data: { id: params.id } });
	},
});

function RouteComponent() {
	const todo = Route.useLoaderData();

	return <EditTodoPage todo={todo} />;
}
