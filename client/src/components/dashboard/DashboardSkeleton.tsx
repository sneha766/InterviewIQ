import { Skeleton } from "../ui/skeleton";

import {
  Card,
  CardContent,
  CardHeader,
} from "../ui/card";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-24" />

              <Skeleton className="h-8 w-20" />
            </CardHeader>

            <CardContent>
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Charts */}
      <section className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>

            <CardContent>
              <Skeleton className="h-[350px] w-full rounded-xl" />
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Analytics */}
      <section className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>

            <CardContent>
              <Skeleton className="h-[350px] w-full rounded-xl" />
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Bottom */}
      <section className="grid gap-6 xl:grid-cols-3">
        <Skeleton className="h-[320px] rounded-xl" />

        <Skeleton className="h-[320px] rounded-xl" />

        <Skeleton className="h-[320px] rounded-xl" />
      </section>
    </div>
  );
}