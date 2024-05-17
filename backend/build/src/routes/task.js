"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const current_user_1 = require("../middlewares/current-user");
const task_1 = require("../services/task");
exports.router = (0, express_1.Router)();
exports.router.use((0, current_user_1.currentUser)({ required: true }));
// Get all tasks
exports.router.get("", async (request, response) => {
    const userId = request.user.id;
    const limit = Number(request.query.limit) || 10;
    const tasks = await (0, task_1.getAllTasksByUserId)({
        userId,
        limit,
    });
    response.status(200).json({
        data: tasks,
    });
});
// Create a new task
exports.router.post("", (0, express_validator_1.body)("name").isString().notEmpty(), async (request, response) => {
    const userId = request.user.id;
    const data = request.body;
    const task = await (0, task_1.createTask)({ ...data, userId });
    response.status(201).json({
        data: task,
    });
});
// Update a task
exports.router.put("/:id", (0, express_validator_1.body)().notEmpty(), (0, express_validator_1.param)("id").isString().notEmpty(), async (request, response) => {
    const data = request.body;
    const taskId = request.params.id;
    const task = await (0, task_1.updateTaskById)({
        id: taskId,
        ...data,
    });
    response.status(200).json({
        data: task,
    });
});
// Delete a task
exports.router.delete("/:id", (0, express_validator_1.param)("id").isString().notEmpty(), async (request, response) => {
    const taskId = request.params.id;
    await (0, task_1.deleteTask)(taskId);
    response.status(204).json({});
});
//# sourceMappingURL=task.js.map