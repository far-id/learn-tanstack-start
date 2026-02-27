import { CreateTodoPage } from '@/features/todos/pages/CreateTodoPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/todos/new')({
	component: CreateTodoPage,
});
