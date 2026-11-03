
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const chartData = [
  { month: "May", revenue: 18000, expenses: 9000 },
  { month: "Jun", revenue: 22000, expenses: 12000 },
  { month: "Jul", revenue: 19000, expenses: 11000 },
  { month: "Aug", revenue: 26000, expenses: 14000 },
  { month: "Sep", revenue: 23000, expenses: 13000 },
  { month: "Oct", revenue: 30000, expenses: 16000 },
  { month: "Nov", revenue: 35000, expenses: 19000 },
];

export default function RevenueExpenseChart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const axisColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "#334155" : "#e2e8f0";

  return (
    <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">

      {/* Chart heading */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Revenue & Expenses
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Monthly financial performance
        </p>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            barGap={8}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={gridColor}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: axisColor, fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: axisColor, fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => [
                `QAR ${Number(value).toLocaleString()}`,
                undefined,
              ]}
              contentStyle={{
                backgroundColor: isDark ? "#0f172a" : "#ffffff",
                borderRadius: "12px",
                border: `1px solid ${gridColor}`,
                color: isDark ? "#f8fafc" : "#0f172a",
              }}
              itemStyle={{
                color: isDark ? "#f8fafc" : "#0f172a",
              }}
              labelStyle={{
                color: isDark ? "#cbd5e1" : "#475569",
                fontWeight: 600,
              }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{
                color: axisColor,
                fontSize: "12px",
              }}
            />

            <Bar
              dataKey="revenue"
              name="Revenue"
              fill="#059669"
              radius={[5, 5, 0, 0]}
              maxBarSize={35}
            />

            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#fb7185"
              radius={[5, 5, 0, 0]}
              maxBarSize={35}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
