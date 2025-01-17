"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.updateUser = exports.getUserById = exports.createUser = void 0;
const schema_1 = require("../drizzle/schema");
const db_1 = require("../drizzle/db");
const sql_1 = require("drizzle-orm/sql");
const helpers_1 = require("./helpers");
async function createUser(data) {
    try {
        const hashPassword = await (0, helpers_1.createHashPassword)(data.password);
        const user = await db_1.db
            .insert(schema_1.User)
            .values({
            email: data.email,
            name: data.name,
            hashPassword,
        })
            .returning()
            .execute();
        return user[0];
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
}
exports.createUser = createUser;
async function getUserById(id) {
    try {
        const user = await db_1.db.query.User.findFirst({
            where: (0, sql_1.eq)(schema_1.User.id, id),
        }).execute();
        const returnedUser = user
            ? {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            }
            : undefined;
        return returnedUser;
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
}
exports.getUserById = getUserById;
async function updateUser(id, data) {
    const newDataToUpdate = {};
    if (data.password) {
        newDataToUpdate.hashPassword = await (0, helpers_1.createHashPassword)(data.password);
    }
    if (data.name) {
        newDataToUpdate.name = data.name;
    }
    try {
        const user = await db_1.db
            .update(schema_1.User)
            .set(newDataToUpdate)
            .where((0, sql_1.eq)(schema_1.User.id, id))
            .returning()
            .execute();
        return user[0];
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
}
exports.updateUser = updateUser;
async function loginUser(email, password) {
    try {
        const user = await db_1.db.query.User.findFirst({
            where: (0, sql_1.eq)(schema_1.User.email, email),
        }).execute();
        if (!user) {
            return undefined;
        }
        const verified = await (0, helpers_1.comparePassword)(password, user.hashPassword);
        if (!verified) {
            return undefined;
        }
        const token = (0, helpers_1.createAccessToken)({
            id: user.id,
            email: user.email,
            name: user.name,
        });
        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            },
        };
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
}
exports.loginUser = loginUser;
//# sourceMappingURL=user.js.map