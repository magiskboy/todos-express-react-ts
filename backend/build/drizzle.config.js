"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: "postgresql",
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations",
    strict: true,
    verbose: true,
    dbCredentials: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || "5432"),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    },
});
//# sourceMappingURL=drizzle.config.js.map