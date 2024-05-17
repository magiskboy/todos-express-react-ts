import { Task } from "../drizzle/schema";
import { db } from "../drizzle/db";
import { desc, eq } from "drizzle-orm";

type CreateTaskParams = {
  name: string;
  userId: string;
};
export async function createTask(params: CreateTaskParams) {
  const tasks = await db
    .insert(Task)
    .values({
      ...params,
      isCompleted: false,
    })
    .returning()
    .execute();
  return tasks[0];
}

type UpdateTaskParams = {
  id: string;
  name: string;
  isCompleted: boolean;
};
export async function updateTaskById(params: UpdateTaskParams) {
  const tasks = await db
    .update(Task)
    .set(params)
    .where(eq(Task.id, params.id))
    .returning()
    .execute();
  return tasks[0];
}

type GetTasksByUserIdParams = {
  userId: string;
  limit: number;
};
export async function getAllTasksByUserId(params: GetTasksByUserIdParams) {
  const tasks = await db
    .select()
    .from(Task)
    .where(eq(Task.userId, params.userId))
    .limit(params.limit)
    .orderBy(Task.isCompleted, desc(Task.createdAt))
    .execute();
  return tasks;
}

export async function deleteTask(id: string): Promise<void> {
  await db.delete(Task).where(eq(Task.id, id)).execute();
}