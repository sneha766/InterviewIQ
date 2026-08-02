import BarChartCard from "./charts/BarChartCard";

import type { MonthlyActivity } from "../../types/analytics";

interface Props {
  data: MonthlyActivity[];
}

export default function MonthlyActivityChart({
  data,
}: Props) {
  return (
    <BarChartCard
      title="Monthly Activity"
      data={data}
    />
  );
}