/*
  Warnings:

  - You are about to drop the column `atsScore` on the `ResumeAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `missingKeywords` on the `ResumeAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `strengths` on the `ResumeAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `suggestions` on the `ResumeAnalysis` table. All the data in the column will be lost.
  - Added the required column `analysis` to the `ResumeAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overallScore` to the `ResumeAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResumeAnalysis" DROP COLUMN "atsScore",
DROP COLUMN "missingKeywords",
DROP COLUMN "strengths",
DROP COLUMN "suggestions",
ADD COLUMN     "analysis" JSONB NOT NULL,
ADD COLUMN     "overallScore" INTEGER NOT NULL;
