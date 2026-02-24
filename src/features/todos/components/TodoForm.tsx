import { useRef, useState, type SubmitEventHandler } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { PlusIcon } from 'lucide-react';
import { updateTodoFn, insertTodoFn } from '../functions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingSwap } from '@/components/ui/loading-swap';

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
	const addTodo = useServerFn(insertTodoFn);
	const updateTodo = useServerFn(updateTodoFn);

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const name = nameRef.current?.value;
		if (!name) return;

		setIsLoading(true);
		if (todo) {
			await updateTodo({ data: { name, id: todo.id } });
		} else {
			await addTodo({ data: { name } });
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
