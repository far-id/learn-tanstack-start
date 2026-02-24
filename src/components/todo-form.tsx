import { useRef, useState, type SubmitEventHandler } from 'react';
import { Input } from './ui/input';
import { createServerFn, useServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db } from '@/db';
import { todos } from '@/db/schema';
import { redirect } from '@tanstack/react-router';
import { Button } from './ui/button';
import { LoadingSwap } from './ui/loading-swap';
import { PlusIcon } from 'lucide-react';
import { eq } from 'drizzle-orm';

const addTodo = createServerFn({ method: 'POST' })
	.inputValidator(
		z.object({
			name: z.string().min(1, 'Please enter a name of your todo'),
		}),
	)
	.handler(async ({ data }) => {
		await db.insert(todos).values({ ...data });

		throw redirect({ to: '/' });
	});

const updateTodo = createServerFn({ method: 'POST' })
	.inputValidator(
		z.object({
			name: z.string().min(1, 'Please enter a name of your todo'),
			id: z.string().min(1),
		}),
	)
	.handler(async ({ data }) => {
		await db.update(todos).set({ name: data.name }).where(eq(todos.id, data.id));

		throw redirect({ to: '/' });
	});

export const TodoForm = ({
	todo,
}: {
	todo?: {
		name: string;
		id: string;
	};
}) => {
	const nameRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const addTodoFn = useServerFn(addTodo);
	const updateTodoFn = useServerFn(updateTodo);

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const name = nameRef.current?.value;
		if (!name) return;

		setIsLoading(true);
		if (todo) {
			await updateTodoFn({ data: { name, id: todo.id } });
		} else {
			await addTodoFn({ data: { name } });
		}
		setIsLoading(false);
	};

	return (
		<form onSubmit={handleSubmit} className='flex gap-4 justify-center items-center'>
			<Input
				type='text'
				ref={nameRef}
				autoFocus
				aria-label='name'
				placeholder='Enter your todo...'
				className='w-full'
				defaultValue={todo?.name}
			/>
			<Button type='submit' disabled={isLoading}>
				<LoadingSwap isLoading={isLoading}>
					{todo ? (
						'Update'
					) : (
						<>
							<PlusIcon className='inline mr-2' />
							Add Todo
						</>
					)}
				</LoadingSwap>
			</Button>
		</form>
	);
};
