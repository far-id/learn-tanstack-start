import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { TodoListTable } from '../components/TodoTable';

export const TodoPage = ({
	todos,
}: {
	todos: {
		isCompleted: boolean;
		name: string;
		id: string;
		createdAt: Date | null;
		updatedAt: Date | null;
	}[];
}) => {
	const completedCount = todos.filter((t) => t.isCompleted).length;

	return (
		<div className='min-h-screen container mx-auto py-10'>
			<div className='flex justify-between items-center mb-10'>
				<div>
					<h1 className='text-3xl font-bold'>Todo App</h1>
					<Badge variant='outline'>
						{completedCount} of {todos.length} completed
					</Badge>
				</div>
				<Button variant='outline'>
					<Link to='/todos/new' className='w-full flex gap-x-2 justify-center items-center h-full'>
						<PlusIcon /> Add Todo
					</Link>
				</Button>
			</div>
			<TodoListTable todos={todos} />
		</div>
	);
};
