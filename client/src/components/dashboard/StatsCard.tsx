import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";
interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>

          <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
            <TrendingUp size={16} />
            {subtitle}
          </div>
        </div>

        <div className="rounded-xl bg-blue-100 p-3">
          <Icon className="text-blue-600" size={24} />
        </div>
      </div>
    </div>
  );
}