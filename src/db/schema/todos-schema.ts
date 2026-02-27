import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  isCompleted: boolean().notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
})
