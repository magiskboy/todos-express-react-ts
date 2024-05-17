"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const helpers_1 = require("../services/helpers");
const user_1 = require("../services/user");
function currentUser(opts) {
    const required = opts?.required ?? false;
    return async (request, _, next) => {
        const authorizationHeader = request.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(" ")[1];
            if (token) {
                const payload = (0, helpers_1.getPayloadFromToken)(token);
                if (payload) {
                    const user = await (0, user_1.getUserById)(payload.id);
                    request.user = user;
                }
            }
        }
        if (request.user === undefined && required) {
            return next("Unauthorized");
        }
        next();
    };
}
exports.currentUser = currentUser;
//# sourceMappingURL=current-user.js.map