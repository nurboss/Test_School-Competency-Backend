"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSearchTerm = exports.USER_STATUS = exports.USER_ROLE = void 0;
exports.USER_ROLE = {
    user: "user",
    admin: "admin",
    supervisor: "supervisor",
};
exports.USER_STATUS = {
    active: "active",
    block: "block",
};
exports.userSearchTerm = ["name", "email", "role", "status"];
