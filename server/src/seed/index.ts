import prisma from "../lib/prisma";
import { codingProblems } from "./coding.seed";

async function seedCodingProblems() {
  console.log("🌱 Seeding coding problems...");

  for (const problem of codingProblems) {
    await prisma.codingProblem.upsert({
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
  }

  console.log("✅ Coding problems seeded.");
}

async function main() {
  await seedCodingProblems();
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });