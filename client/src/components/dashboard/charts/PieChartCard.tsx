import { motion } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../ui/card";

interface Props {
  title: string;

  data: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
  };
}

export default function PieChartCard({
  title,
  data,
}: Props) {
  const chartData = [
    {
      name: "Excellent",
      value: data.excellent,
    },
    {
      name: "Good",
      value: data.good,
    },
    {
      name: "Average",
      value: data.average,
    },
    {
      name: "Poor",
      value: data.poor,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent className="h-[350px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}