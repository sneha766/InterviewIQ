import { motion } from "framer-motion";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";

import ChartEmptyState from "./ChartEmptyState";

import type { TrendPoint } from "../../../types/analytics";

interface LineChartCardProps {
  title: string;
  data: TrendPoint[];
  label: string;
}

export default function LineChartCard({
  title,
  data,
  label,
}: LineChartCardProps) {
  if (!data.length) {
    return <ChartEmptyState title={`No ${title} Yet`} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="4 4" />

              <XAxis dataKey="date" />

              <YAxis domain={[0, 100]} />

              <Tooltip
                formatter={(value) => [
                  `${Number(value)}%`,
                  label,
                ]}
              />

              <Line
                type="monotone"
                dataKey="score"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}