import {
  stats,
} from "../constants/dashboard";

import StatsCard from "../components/dashboard/StatsCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentInterviews from "../components/dashboard/RecentInterviews";
import AISuggestions from "../components/dashboard/AISuggestions";



export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Statistics */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatsCard
            key={item.title}
            {...item}
          />
        ))}
      </section>

      {/* Quick Actions */}

      <section>
        <h2 className="mb-5 text-2xl font-bold">
          Quick Actions
        </h2>

        <QuickActions />
      </section>

      {/* Bottom Grid */}

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentInterviews />
        </div>

        <AISuggestions />
      </section>
    </div>
  );
}