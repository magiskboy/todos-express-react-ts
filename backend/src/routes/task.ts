import { Router } from "express";
import { body, param, query } from "express-validator";
import { currentUser } from "../middlewares/current-user";
import {
  createTask,
  deleteTask,
  getAllTasksByUserId,
  updateTaskById,
} from "../services/task";

export const router = Router();
router.use(currentUser({ required: true }));

// Get all tasks
router.get("", async (request, response) => {
  const userId = request.user.id;
  const limit = Number(request.query.limit) || 10;
  const tasks = await getAllTasksByUserId({
    userId,
    limit,
  });
  response.status(200).json({
    data: tasks,
  });
});

// Create a new task
router.post(
  "",
  body("name").isString().notEmpty(),
  async (request, response) => {
    const userId = request.user.id;
    const data = request.body;
    const task = await createTask({ ...data, userId });
    response.status(201).json({
      data: task,
    });
  }
);

// Update a task
router.put(
  "/:id",
  body().notEmpty(),
  param("id").isString().notEmpty(),
  async (request, response) => {
    const data = request.body;
    const taskId = request.params!.id;
    const task = await updateTaskById({
      id: taskId,
      ...data,
    });
    response.status(200).json({
      data: task,
    });
  }
);

// Delete a task
router.delete(
  "/:id",
  param("id").isString().notEmpty(),
  async (request, response) => {
    const taskId = request.params!.id;
    await deleteTask(taskId);
    response.status(204).json({});
  }
);
