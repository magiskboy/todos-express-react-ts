import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  strict: true,
  verbose: true,
  dbCredentials: {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,
  },
});
