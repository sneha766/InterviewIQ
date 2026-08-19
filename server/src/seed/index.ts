import prisma from "../lib/prisma";
import { codingProblems } from "./coding.seed";

async function seedCodingProblems() {
  console.log("🌱 Seeding coding problems and test cases...");

  for (const problem of codingProblems) {
    const createdProblem = await prisma.codingProblem.upsert({
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

        const existingTC = await prisma.codingTestCase.findFirst({
          where: {
            problemId: createdProblem.id,
            input: inputStr,
          },
        });

        if (!existingTC) {
          await prisma.codingTestCase.create({
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
    await prisma.$disconnect();
  });