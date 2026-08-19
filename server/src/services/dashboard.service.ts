import prisma from "../lib/prisma";
import {
  DashboardOverview,
  DashboardResponse,
  RecentResume,
  RecentInterview,
  ScoreDistribution,
  DashboardCodingStats,
} from "../types/dashboard.types";

class DashboardService {
  private async getOverview(
    userId: string
  ): Promise<DashboardOverview> {
    const [totalResumes, aggregate, latestResume] =
      await Promise.all([
        prisma.resumeAnalysis.count({
          where: { userId },
        }),

        prisma.resumeAnalysis.aggregate({
          where: { userId },
          _avg: {
            overallScore: true,
          },
          _max: {
            overallScore: true,
          },
          _min: {
            overallScore: true,
          },
        }),

        prisma.resumeAnalysis.findFirst({
          where: {
            userId,
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            overallScore: true,
          },
        }),
      ]);

    return {
      totalResumes,

      averageATS:
        totalResumes === 0
          ? 0
          : Number(
              (aggregate._avg.overallScore ?? 0).toFixed(2)
            ),

      highestATS: aggregate._max.overallScore ?? 0,

      lowestATS: aggregate._min.overallScore ?? 0,

      latestATS: latestResume?.overallScore ?? 0,
    };
  }

  private async getRecentResumes(
    userId: string
  ): Promise<RecentResume[]> {
    return prisma.resumeAnalysis.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        fileName: true,
        overallScore: true,
        createdAt: true,
      },
    });
  }

  private async getRecentInterviews(
    userId: string
  ): Promise<RecentInterview[]> {
    return prisma.interview.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        role: true,
        type: true,
        difficulty: true,
        score: true,
        completed: true,
        createdAt: true,
      },
    });
  }

  private async getScoreDistribution(
    userId: string
  ): Promise<ScoreDistribution> {
    const resumes =
      await prisma.resumeAnalysis.findMany({
        where: {
          userId,
        },
        select: {
          overallScore: true,
        },
      });

    return resumes.reduce(
      (distribution, resume) => {
        const score = resume.overallScore;

        if (score >= 90) {
          distribution.excellent++;
        } else if (score >= 75) {
          distribution.good++;
        } else if (score >= 60) {
          distribution.average++;
        } else {
          distribution.poor++;
        }

        return distribution;
      },
      {
        excellent: 0,
        good: 0,
        average: 0,
        poor: 0,
      } as ScoreDistribution
    );
  }

  private async getCodingStats(userId: string): Promise<DashboardCodingStats> {
    const submissions = await prisma.codingSubmission.findMany({
      where: { userId },
      select: { problemId: true, status: true, createdAt: true },
    });

    const solvedSet = new Set<string>();
    let acceptedCount = 0;

    for (const sub of submissions) {
      if (sub.status === "Accepted") {
        solvedSet.add(sub.problemId);
        acceptedCount++;
      }
    }

    const acceptanceRate =
      submissions.length > 0
        ? Number(((acceptedCount / submissions.length) * 100).toFixed(1))
        : 0;

    return {
      problemsSolved: solvedSet.size,
      acceptanceRate,
      streak: submissions.length > 0 ? 1 : 0,
    };
  }

  async getDashboard(
    userId: string
  ): Promise<DashboardResponse> {
    const [
      overview,
      recentResumes,
      recentInterviews,
      scoreDistribution,
      codingStats,
    ] = await Promise.all([
      this.getOverview(userId),
      this.getRecentResumes(userId),
      this.getRecentInterviews(userId),
      this.getScoreDistribution(userId),
      this.getCodingStats(userId),
    ]);

    return {
      overview,
      recentResumes,
      recentInterviews,
      scoreDistribution,
      codingStats,
    };
  }
}

export default new DashboardService();