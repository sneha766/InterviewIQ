import LineChartCard from "./charts/LineChartCard";

import type { TrendPoint } from "../../types/analytics";

interface InterviewTrendChartProps {
  data: TrendPoint[];
}

export default function InterviewTrendChart({
  data,
}: InterviewTrendChartProps) {
  return (
    <LineChartCard
      title="Interview Trend"
      data={data}
      label="Interview Score"
    />
  );
}