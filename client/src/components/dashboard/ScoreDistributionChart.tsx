import PieChartCard from "./charts/PieChartCard";

import type { ScoreDistribution } from "../../types/analytics";

interface Props {
  data: ScoreDistribution;
}

export default function ScoreDistributionChart({
  data,
}: Props) {
  return (
    <PieChartCard
      title="Score Distribution"
      data={data}
    />
  );
}