import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const client = new Pool({
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,
});

export const db = drizzle(client, { schema });