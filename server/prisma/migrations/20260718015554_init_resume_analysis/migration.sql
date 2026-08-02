-- CreateTable
CREATE TABLE "ResumeAnalysis" (
    "id" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "resumeUrl" TEXT NOT NULL,
    "atsScore" INTEGER NOT NULL,
    "strengths" JSONB NOT NULL,
    "missingKeywords" JSONB NOT NULL,
    "suggestions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumeAnalysis_pkey" PRIMARY KEY ("id")
);
