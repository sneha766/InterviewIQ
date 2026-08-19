"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HintsSchema = void 0;
const zod_1 = require("zod");
exports.HintsSchema = zod_1.z.object({
    hints: zod_1.z.array(zod_1.z.string()).min(1),
});
