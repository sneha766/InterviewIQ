import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Badge } from "../ui/badge";

import type { RecentInterview } from "../../types/dashboard";

interface Props {
  interviews: RecentInterview[];
}

export default function RecentInterviews({
  interviews,
}: Props) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Recent Interviews</CardTitle>
      </CardHeader>

      <CardContent>
        {interviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No interviews completed yet.
          </p>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">
                    {interview.role}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {new Date(
                      interview.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <Badge>
                  {interview.score}%
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}