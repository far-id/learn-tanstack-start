import { TodoForm } from '@/components/todo-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';
import { todos } from '@/db/schema';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { eq } from 'drizzle-orm';
import { ArrowLeftIcon } from 'lucide-react';

const loaderFn = createServerFn({ method: 'GET' })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => {
		const todo = await db.query.todos.findFirst({
			where: eq(todos.id, data.id),
		});
		if (!todo) throw notFound();

		return todo;
	});

export const Route = createFileRoute('/todos/$id/edit')({
	component: RouteComponent,
	loader: async ({ params }) => {
		return await loaderFn({ data: { id: params.id } });
	},
});

function RouteComponent() {
	const todo = Route.useLoaderData();

	return (
		<div className='min-h-screen container mx-auto py-10'>
			<Button asChild variant='ghost' className='mb-5 text-muted-foreground' size={'sm'}>
				<Link to='/'>
					<ArrowLeftIcon className='inline mr-2' /> Back to Todos
				</Link>
			</Button>
			<Card className='p-10'>
				<CardHeader>
					<CardTitle className='text-2xl'>Edit Todo</CardTitle>
					<CardDescription>Edit existing task in your todos</CardDescription>
				</CardHeader>
				<CardContent>
					<TodoForm todo={todo} />
				</CardContent>
			</Card>
		</div>
	);
}
