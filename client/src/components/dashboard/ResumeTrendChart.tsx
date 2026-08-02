import LineChartCard from "./charts/LineChartCard";

import type { TrendPoint } from "../../types/analytics";

interface ResumeTrendChartProps {
  data: TrendPoint[];
}

export default function ResumeTrendChart({
  data,
}: ResumeTrendChartProps) {
  return (
    <LineChartCard
      title="Resume Trend"
      data={data}
      label="ATS Score"
    />
  );
}