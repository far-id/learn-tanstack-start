import '@tanstack/react-start/server-only';
import { db } from '@/db';
import { todos } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function getAllTodos() {
  return await db.select().from(todos).orderBy(desc(todos.createdAt))
}

export async function deleteTodo(id: string) {
  return await db.delete(todos).where(eq(todos.id, id))
}

export async function updateIsCompleted(id: string, isCompleted: boolean) {
  return await db.update(todos).set({ isCompleted }).where(eq(todos.id, id))
}

export async function insertTodo(name: string) {
  return await db.insert(todos).values({ name })
}

export async function updateTodo(id: string, name: string) {
  return await db.update(todos).set({ name }).where(eq(todos.id, id))
}

export async function getTodoById(id: string) {
  return await db.query.todos.findFirst({
    where: eq(todos.id, id),
  })
}
