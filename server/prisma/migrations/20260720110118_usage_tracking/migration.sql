/*
  Warnings:

  - You are about to drop the column `date` on the `Usage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,usageDate]` on the table `Usage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Usage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usageDate` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usage_userId_date_key";

-- AlterTable
ALTER TABLE "Usage" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usageDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Usage_userId_idx" ON "Usage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Usage_userId_usageDate_key" ON "Usage"("userId", "usageDate");
