import { uuid, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hashPassword: varchar("hash_password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const Task = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  isCompleted: boolean("is_completed").notNull().default(false),
  userId: uuid("user_id")
    .notNull()
    .references(() => User.id),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});
