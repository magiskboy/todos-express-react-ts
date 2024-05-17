"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.getAllTasksByUserId = exports.updateTaskById = exports.createTask = void 0;
const schema_1 = require("../drizzle/schema");
const db_1 = require("../drizzle/db");
const drizzle_orm_1 = require("drizzle-orm");
async function createTask(params) {
    const tasks = await db_1.db
        .insert(schema_1.Task)
        .values({
        ...params,
        isCompleted: false,
    })
        .returning()
        .execute();
    return tasks[0];
}
exports.createTask = createTask;
async function updateTaskById(params) {
    const tasks = await db_1.db
        .update(schema_1.Task)
        .set(params)
        .where((0, drizzle_orm_1.eq)(schema_1.Task.id, params.id))
        .returning()
        .execute();
    return tasks[0];
}
exports.updateTaskById = updateTaskById;
async function getAllTasksByUserId(params) {
    const tasks = await db_1.db
        .select()
        .from(schema_1.Task)
        .where((0, drizzle_orm_1.eq)(schema_1.Task.userId, params.userId))
        .limit(params.limit)
        .orderBy(schema_1.Task.isCompleted, (0, drizzle_orm_1.desc)(schema_1.Task.createdAt))
        .execute();
    return tasks;
}
exports.getAllTasksByUserId = getAllTasksByUserId;
async function deleteTask(id) {
    await db_1.db.delete(schema_1.Task).where((0, drizzle_orm_1.eq)(schema_1.Task.id, id)).execute();
}
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.js.map