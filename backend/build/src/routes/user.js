"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const current_user_1 = require("../middlewares/current-user");
const express_validator_1 = require("express-validator");
const user_1 = require("../services/user");
exports.router = (0, express_1.Router)();
// Get current user
exports.router.get("/me", (0, current_user_1.currentUser)({ required: true }), (request, response) => {
    response.status(200).json({
        data: request.user,
    });
});
// Register a new user
exports.router.post("", (0, express_validator_1.body)("email").notEmpty().isEmail(), (0, express_validator_1.body)("password").notEmpty().isString(), (0, express_validator_1.body)("name").notEmpty().isString(), async (request, response) => {
    const data = request.body;
    const newUser = await (0, user_1.createUser)(data);
    if (!newUser) {
        return response.status(400).json({
            error: "Failed to create user",
        });
    }
    return response.status(201).json({
        data: newUser,
    });
});
// Login a user
exports.router.post("/login", (0, express_validator_1.body)("email").notEmpty().isEmail(), (0, express_validator_1.body)("password").notEmpty().isString(), async (request, response) => {
    const { email, password } = request.body;
    const data = await (0, user_1.loginUser)(email, password);
    if (data) {
        return response.status(200).json({
            data: {
                accessToken: data.access_token,
                user: data.user,
            },
        });
    }
    return response.status(400).json({
        error: "Email or password is incorrect",
    });
});
// Update current user
exports.router.put("/me", (0, express_validator_1.body)().notEmpty(), (0, current_user_1.currentUser)({ required: true }), async (request, response) => {
    const data = request.body;
    const updatedUser = await (0, user_1.updateUser)(request.user.id, data);
    if (!updatedUser) {
        return response.status(400).json({
            error: "Failed to update user",
        });
    }
    return response.status(200).json({
        data: updatedUser,
    });
});
//# sourceMappingURL=user.js.map