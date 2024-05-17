"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayloadFromToken = exports.createAccessToken = exports.comparePassword = exports.createHashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function createHashPassword(password) {
    return await bcrypt_1.default.hash(password, config_1.SALT_OR_ROUNDS);
}
exports.createHashPassword = createHashPassword;
async function comparePassword(password, hash) {
    return await bcrypt_1.default.compare(password, hash);
}
exports.comparePassword = comparePassword;
function createAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, config_1.JWT_SECRET, {
        expiresIn: config_1.JWT_EXPIRES_IN,
        algorithm: config_1.JWT_ALGORITHM,
    });
}
exports.createAccessToken = createAccessToken;
function getPayloadFromToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET, {
            algorithms: [config_1.JWT_ALGORITHM],
            ignoreExpiration: false,
        });
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
exports.getPayloadFromToken = getPayloadFromToken;
//# sourceMappingURL=helpers.js.map