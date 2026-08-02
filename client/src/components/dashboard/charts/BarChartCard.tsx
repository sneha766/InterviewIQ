import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../ui/card";

import ChartEmptyState from "./ChartEmptyState";

import type { MonthlyActivity } from "../../../types/analytics";

interface Props {
  title: string;
  data: MonthlyActivity[];
}

export default function BarChartCard({
  title,
  data,
}: Props) {
  if (!data.length) {
    return (
      <ChartEmptyState
        title={`No ${title} Yet`}
      />
    );
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
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="4 4" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="resumes"
                radius={6}
              />

              <Bar
                dataKey="interviews"
                radius={6}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}