import { BarChart3 } from "lucide-react";

interface ChartEmptyStateProps {
  title: string;
}

export default function ChartEmptyState({
  title,
}: ChartEmptyStateProps) {
  return (
    <div className="flex h-80 flex-col items-center justify-center rounded-xl border border-dashed">
      <BarChart3
        size={40}
        className="text-slate-400"
      />

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Data will appear after you complete
        more resume analyses.
      </p>
    </div>
  );
}