import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Badge } from "../ui/badge";

import type { RecentResume } from "../../types/dashboard";

interface Props {
  resumes: RecentResume[];
}

export default function RecentResumes({ resumes }: Props) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Recent Resumes</CardTitle>
      </CardHeader>

      <CardContent>
        {resumes.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No resumes analyzed yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{resume.fileName}</p>

                  <p className="text-xs text-muted-foreground">
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <Badge>
                  {resume.overallScore}%
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}