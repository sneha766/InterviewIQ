import prisma from "../lib/prisma";
import {
  DashboardOverview,
  DashboardResponse,
  RecentResume,
  ScoreDistribution,
} from "../types/dashboard.types";

class DashboardService {
  private async getOverview(userId: string): Promise<DashboardOverview> {
    const [totalResumes, aggregate, latestResume] = await Promise.all([
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
        where: { userId },
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
          : Number((aggregate._avg.overallScore ?? 0).toFixed(2)),
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

  private async getScoreDistribution(
    userId: string
  ): Promise<ScoreDistribution> {
    const resumes = await prisma.resumeAnalysis.findMany({
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

        if (score >= 90) distribution.excellent++;
        else if (score >= 75) distribution.good++;
        else if (score >= 60) distribution.average++;
        else distribution.poor++;

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

  async getDashboard(userId: string): Promise<DashboardResponse> {
    const [overview, recentResumes, scoreDistribution] =
      await Promise.all([
        this.getOverview(userId),
        this.getRecentResumes(userId),
        this.getScoreDistribution(userId),
      ]);

    return {
      overview,
      recentResumes,
      scoreDistribution,
    };
  }
}

export default new DashboardService();