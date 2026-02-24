import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon } from 'lucide-react';
import { TodoForm } from '../components/TodoForm';
import { Link } from '@tanstack/react-router';

export const EditTodoPage = ({
	todo,
}: {
	todo: {
		id: string;
		name: string;
		isCompleted: boolean;
		createdAt: Date | null;
		updatedAt: Date | null;
	};
}) => {
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
};
