import { createServerFn } from '@tanstack/react-start';
import { deleteTodo, getAllTodos, getTodoById, insertTodo, updateIsCompleted, updateTodo } from './server';
import z from 'zod';
import { notFound, redirect } from '@tanstack/react-router';

export const fetchTodosFn = createServerFn({ method: 'GET' }).handler(async () => {
  return await getAllTodos();
})

export const deleteTodoFn = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      id: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    await deleteTodo(data.id)

    return { error: false };
  });

export const toggleTodoFn = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      id: z.string().min(1),
      isCompleted: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    await updateIsCompleted(data.id, data.isCompleted)

    return { error: false };
  });

export const insertTodoFn = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      name: z.string().min(1, 'Please enter a name of your todo'),
    }),
  )
  .handler(async ({ data }) => {
    await insertTodo(data.name)

    throw redirect({ to: '/' });
  });

export const updateTodoFn = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      name: z.string().min(1, 'Please enter a name of your todo'),
      id: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    await updateTodo(data.id, data.name)

    throw redirect({ to: '/' });
  });

export const getTodoByIdFn = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const todo = await getTodoById(data.id);
    if (!todo) throw notFound();

    return todo;
  });
