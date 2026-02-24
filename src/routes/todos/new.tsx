import { TodoForm } from '@/components/todo-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

export const Route = createFileRoute('/todos/new')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='min-h-screen container mx-auto py-10'>
			<Button asChild variant='ghost' className='mb-5 text-muted-foreground' size={'sm'}>
				<Link to='/'>
					<ArrowLeftIcon className='inline mr-2' /> Back to Todos
				</Link>
			</Button>
			<Card className='p-10'>
				<CardHeader>
					<CardTitle className='text-2xl'>Add New Todo</CardTitle>
					<CardDescription>Create new task to your todos</CardDescription>
				</CardHeader>
				<CardContent>
					<TodoForm />
				</CardContent>
			</Card>
		</div>
	);
}
