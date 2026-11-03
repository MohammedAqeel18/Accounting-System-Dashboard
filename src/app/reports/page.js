
"use client";

import { useState } from "react";
import Header from "@/components/Header";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Receipt,
  Download,
} from "lucide-react";

// Sample monthly financial data
const monthlyData = [
  { month: "May", revenue: 18000, expenses: 9000 },
  { month: "Jun", revenue: 22000, expenses: 12000 },
  { month: "Jul", revenue: 19000, expenses: 11000 },
  { month: "Aug", revenue: 26000, expenses: 14000 },
  { month: "Sep", revenue: 23000, expenses: 13000 },
  { month: "Oct", revenue: 30000, expenses: 16000 },
  { month: "Nov", revenue: 35000, expenses: 19000 },
];

// Sample expense categories
const expenseData = [
  { name: "Office Rent", value: 12000 },
  { name: "Salaries", value: 18000 },
  { name: "Marketing", value: 7500 },
  { name: "Software", value: 3500 },
  { name: "Other", value: 7500 },
];

const COLORS = [
  "#059669",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#fb7185",
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("This Year");

  // Calculate financial totals
  const totalRevenue = monthlyData.reduce(
    (total, item) => total + item.revenue,
    0
  );

  const totalExpenses = monthlyData.reduce(
    (total, item) => total + item.expenses,
    0
  );

  const netProfit = totalRevenue - totalExpenses;

  const totalExpenseCategories = expenseData.reduce(
    (total, item) => total + item.value,
    0
  );

  const profitMargin =
    totalRevenue > 0
      ? ((netProfit / totalRevenue) * 100).toFixed(1)
      : "0.0";

  function handleExport() {
    const rows = [
      ["Month", "Revenue (QAR)", "Expenses (QAR)", "Net Profit (QAR)"],
      ...monthlyData.map((item) => [
        item.month,
        item.revenue,
        item.expenses,
        item.revenue - item.expenses,
      ]),
    ];

    const csvContent = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "finora-financial-report.csv";

    link.click();

    URL.revokeObjectURL(url);
  }

  const cardStyle =
    "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900";

  const headingStyle =
    "font-bold text-slate-900 dark:text-slate-100";

  const descriptionStyle =
    "text-slate-500 dark:text-slate-400";

  return (
    <main className="min-h-screen min-w-0 w-full bg-slate-50 dark:bg-slate-950">
      <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">

        <Header
          title="Reports"
          subtitle="Understand your business financial performance."
        />

        <div className="mt-8">

          {/* Page Introduction */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Financial Reports
              </h1>

              <p className={`mt-2 text-sm ${descriptionStyle}`}>
                Analyze revenue, expenses, and business profitability.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <option>This Year</option>
                <option>Last 7 Months</option>
              </select>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <Download size={17} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

            <div className={cardStyle}>
              <div className="flex items-center justify-between">
                <p className={`text-sm ${descriptionStyle}`}>
                  Total Revenue
                </p>
                <Wallet size={22} className="text-emerald-600" />
              </div>

              <h2 className={`mt-4 text-2xl ${headingStyle}`}>
                QAR {totalRevenue.toLocaleString()}
              </h2>

              <p className={`mt-2 text-xs ${descriptionStyle}`}>
                Revenue across all displayed months
              </p>
            </div>

            <div className={cardStyle}>
              <div className="flex items-center justify-between">
                <p className={`text-sm ${descriptionStyle}`}>
                  Total Expenses
                </p>
                <TrendingDown size={22} className="text-rose-600" />
              </div>

              <h2 className={`mt-4 text-2xl ${headingStyle}`}>
                QAR {totalExpenses.toLocaleString()}
              </h2>

              <p className={`mt-2 text-xs ${descriptionStyle}`}>
                Expenses across all displayed months
              </p>
            </div>

            <div className={cardStyle}>
              <div className="flex items-center justify-between">
                <p className={`text-sm ${descriptionStyle}`}>
                  Net Profit
                </p>
                <TrendingUp size={22} className="text-blue-600" />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-blue-600">
                QAR {netProfit.toLocaleString()}
              </h2>

              <p className={`mt-2 text-xs ${descriptionStyle}`}>
                Revenue minus expenses
              </p>
            </div>

            <div className={cardStyle}>
              <div className="flex items-center justify-between">
                <p className={`text-sm ${descriptionStyle}`}>
                  Profit Margin
                </p>
                <Receipt size={22} className="text-amber-600" />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-amber-600">
                {profitMargin}%
              </h2>

              <p className={`mt-2 text-xs ${descriptionStyle}`}>
                Net profit as a percentage of revenue
              </p>
            </div>
          </div>

          {/* Revenue vs Expenses Chart */}
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
              <h2 className={`text-lg ${headingStyle}`}>
                Revenue vs Expenses
              </h2>

              <p className={`mt-1 text-sm ${descriptionStyle}`}>
                Monthly comparison of business income and spending.
              </p>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#64748b"
                    opacity={0.3}
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />

                  <Tooltip
                    formatter={(value) =>
                      `QAR ${Number(value).toLocaleString()}`
                    }
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #334155",
                      backgroundColor: "#0f172a",
                      color: "#f8fafc",
                    }}
                    labelStyle={{ color: "#f8fafc" }}
                  />

                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ color: "#94a3b8" }}
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

          {/* Expense Breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
              <h2 className={`text-lg ${headingStyle}`}>
                Expense Breakdown
              </h2>

              <p className={`mt-1 text-sm ${descriptionStyle}`}>
                Understand where your business money is being spent.
              </p>
            </div>

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={105}
                      innerRadius={65}
                      paddingAngle={3}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value) =>
                        `QAR ${Number(value).toLocaleString()}`
                      }
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #334155",
                        backgroundColor: "#0f172a",
                        color: "#f8fafc",
                      }}
                      labelStyle={{ color: "#f8fafc" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-5">
                <div>
                  <p className={`text-sm ${descriptionStyle}`}>
                    Total categorized expenses
                  </p>

                  <h3 className={`mt-2 text-3xl ${headingStyle}`}>
                    QAR {totalExpenseCategories.toLocaleString()}
                  </h3>
                </div>

                {expenseData.map((item, index) => {
                  const percentage =
                    (item.value / totalExpenseCategories) * 100;

                  return (
                    <div key={item.name}>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{
                              backgroundColor: COLORS[index],
                            }}
                          />

                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {item.name}
                          </span>
                        </div>

                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          QAR {item.value.toLocaleString()}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: COLORS[index],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Demo Data Notice */}
          <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">
            Note: These reports use demonstration data and are not connected
            to live accounting records.
          </p>

        </div>
      </div>
    </main>
  );
}
