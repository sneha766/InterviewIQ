"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const coding_seed_1 = require("./coding.seed");
async function seedCodingProblems() {
    console.log("🌱 Seeding coding problems and test cases...");
    for (const problem of coding_seed_1.codingProblems) {
        const createdProblem = await prisma_1.default.codingProblem.upsert({
            where: {
                slug: problem.slug,
            },
            update: {
                title: problem.title,
                difficulty: problem.difficulty,
                description: problem.description,
                acceptanceRate: problem.acceptanceRate,
                constraints: problem.constraints,
                examples: problem.examples,
                hints: problem.hints,
                tags: problem.tags,
                starterCode: problem.starterCode,
            },
            create: problem,
        });
        // Seed test cases from examples
        if (Array.isArray(problem.examples)) {
            for (const ex of problem.examples) {
                const inputStr = ex.input || "";
                const outputStr = ex.output || "";
                const existingTC = await prisma_1.default.codingTestCase.findFirst({
                    where: {
                        problemId: createdProblem.id,
                        input: inputStr,
                    },
                });
                if (!existingTC) {
                    await prisma_1.default.codingTestCase.create({
                        data: {
                            problemId: createdProblem.id,
                            input: inputStr,
                            expectedOutput: outputStr,
                            isHidden: false,
                        },
                    });
                }
            }
        }
    }
    console.log("✅ Coding problems and test cases seeded successfully.");
}
async function main() {
    await seedCodingProblems();
}
main()
    .catch(console.error)
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
