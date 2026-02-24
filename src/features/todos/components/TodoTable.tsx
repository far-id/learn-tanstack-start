import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty';
import { PlusIcon, ListTodoIcon, EditIcon, Trash2Icon } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { ActionButton } from '@/components/ui/action-button';
import { startTransition, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { deleteTodoFn, toggleTodoFn } from '../functions';

export const TodoListTable = ({
	todos,
}: {
	todos: {
		name: string;
		id: string;
		isCompleted: boolean;
		createdAt: Date | null;
		updatedAt: Date | null;
	}[];
}) => {
	if (todos.length === 0) {
		return (
			<Empty className='border border-dashed'>
				<EmptyHeader>
					<EmptyMedia variant={'icon'}>
						<ListTodoIcon />
					</EmptyMedia>
					<EmptyTitle>No Todos</EmptyTitle>
					<EmptyDescription>Looks like you haven't added any todos yet.</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button variant='outline'>
						<Link
							to='/todos/new'
							className='w-full flex gap-x-2 justify-center items-center h-full'
						>
							<PlusIcon /> Add Your First Todo
						</Link>
					</Button>
				</EmptyContent>
			</Empty>
		);
	}
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead></TableHead>
					<TableHead>Task</TableHead>
					<TableHead>Created At</TableHead>
					<TableHead className='w-0'></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{todos.map((todo) => (
					<TodoRow todo={todo} key={todo.id} />
				))}
			</TableBody>
		</Table>
	);
};

function TodoRow({
	todo,
}: {
	todo: {
		name: string;
		id: string;
		isCompleted: boolean;
		createdAt: Date | null;
		updatedAt: Date | null;
	};
}) {
	const deleteTodo = useServerFn(deleteTodoFn);
	const toggle = useServerFn(toggleTodoFn);
	const router = useRouter();
	const [isCompleted, setisCompleted] = useState<boolean>(todo.isCompleted);
	const [isPending, setIsPending] = useState(false);

	const handleToggle = useDebouncedCallback(async (newCompletedState: boolean) => {
		setIsPending(true);
		try {
			startTransition(async () => {
				await toggle({ data: { id: todo.id, isCompleted: newCompletedState } });
				router.invalidate();
			});
		} finally {
			setIsPending(false);
		}
	}, 300);

	return (
		<TableRow
			onClick={(e) => {
				const target = e.target as HTMLInputElement;
				if (target.closest('[data-action]')) return;
				if (isPending) return; // Prevent multiple clicks

				const newState = !isCompleted;
				setisCompleted(newState);
				handleToggle(newState);
			}}
			style={{ cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.6 : 1 }}
		>
			<TableCell>
				<Checkbox checked={isCompleted} disabled={isPending} />
			</TableCell>
			<TableCell className={cn(todo.isCompleted ? 'line-through' : '')}>{todo.name}</TableCell>
			<TableCell>{todo.createdAt?.toLocaleDateString('id-ID')}</TableCell>
			<TableCell data-action>
				<div className='flex gap-2 justify-center items-center'>
					<Button variant={'ghost'} size={'icon-sm'} asChild disabled={isPending}>
						<Link to='/todos/$id/edit' params={{ id: todo.id }}>
							<EditIcon />
						</Link>
					</Button>
					<ActionButton
						action={async () => {
							const res = await deleteTodo({ data: { id: todo.id } });
							router.invalidate();
							return res;
						}}
						variant={'destructiveGhost'}
						size={'icon-sm'}
						disabled={isPending}
					>
						<Trash2Icon />
					</ActionButton>
				</div>
			</TableCell>
		</TableRow>
	);
}
