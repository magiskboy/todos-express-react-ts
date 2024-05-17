"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.User = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
exports.User = (0, pg_core_2.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom().notNull(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    hashPassword: (0, pg_core_1.varchar)("hash_password", { length: 255 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", {
        mode: "date",
        withTimezone: true,
    })
        .notNull()
        .defaultNow(),
});
exports.Task = (0, pg_core_2.pgTable)("tasks", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom().notNull(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    isCompleted: (0, pg_core_1.boolean)("is_completed").notNull().default(false),
    userId: (0, pg_core_1.uuid)("user_id")
        .notNull()
        .references(() => exports.User.id),
    createdAt: (0, pg_core_1.timestamp)("created_at", {
        withTimezone: true,
        mode: "date",
    }).defaultNow(),
});
//# sourceMappingURL=schema.js.map