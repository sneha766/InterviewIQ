"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunCodeSchema = void 0;
const zod_1 = require("zod");
exports.RunCodeSchema = zod_1.z.object({
    language: zod_1.z.string().min(1),
    code: zod_1.z.string().min(1),
    input: zod_1.z.string().optional(),
});
