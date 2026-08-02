/*
  Warnings:

  - You are about to drop the column `originalFileName` on the `ResumeAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `resumeUrl` on the `ResumeAnalysis` table. All the data in the column will be lost.
  - The `strengths` column on the `ResumeAnalysis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `missingKeywords` column on the `ResumeAnalysis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `suggestions` column on the `ResumeAnalysis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `fileName` to the `ResumeAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileUrl` to the `ResumeAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResumeAnalysis" DROP COLUMN "originalFileName",
DROP COLUMN "resumeUrl",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "fileUrl" TEXT NOT NULL,
DROP COLUMN "strengths",
ADD COLUMN     "strengths" TEXT[],
DROP COLUMN "missingKeywords",
ADD COLUMN     "missingKeywords" TEXT[],
DROP COLUMN "suggestions",
ADD COLUMN     "suggestions" TEXT[];
