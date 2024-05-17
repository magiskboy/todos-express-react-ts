"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const task_1 = require("./routes/task");
const user_1 = require("./routes/user");
const current_user_1 = require("./middlewares/current-user");
function main() {
    const app = (0, express_1.default)();
    // add middlewares
    app.use((0, cors_1.default)());
    app.use(express_1.default.static("web/dist"));
    app.use(express_1.default.json());
    app.use((0, current_user_1.currentUser)());
    // register routes
    app.use("/api/tasks", task_1.router);
    app.use("/api/users", user_1.router);
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}
main();
//# sourceMappingURL=main.js.map