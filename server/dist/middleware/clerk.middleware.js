"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuth = exports.requireAuth = exports.clerkMiddleware = void 0;
const express_1 = require("@clerk/express");
Object.defineProperty(exports, "requireAuth", { enumerable: true, get: function () { return express_1.requireAuth; } });
Object.defineProperty(exports, "getAuth", { enumerable: true, get: function () { return express_1.getAuth; } });
Object.defineProperty(exports, "clerkMiddleware", { enumerable: true, get: function () { return express_1.clerkMiddleware; } });
