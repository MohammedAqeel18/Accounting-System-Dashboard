
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import RevenueExpenseChart from "@/components/RevenueExpenseChart";
import RecentTransactions from "@/components/RecentTransactions";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      <main className="min-w-0 w-full">
        <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">

          {/* Header */}
          <Header
            title="Dashboard"
            subtitle="Welcome back! Here's your financial overview."
          />

          {/* Page Introduction */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Financial Overview
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Monitor your business performance and financial health.
            </p>
          </div>

          {/* Financial Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Revenue"
              amount="QAR 125,000"
              description="Income recorded this month"
              icon={Wallet}
              color="bg-emerald-50 text-emerald-600"
            />

            <StatCard
              title="Total Expenses"
              amount="QAR 48,500"
              description="Expenses recorded this month"
              icon={TrendingDown}
              color="bg-rose-50 text-rose-600"
            />

            <StatCard
              title="Net Profit"
              amount="QAR 76,500"
              description="Revenue minus expenses"
              icon={TrendingUp}
              color="bg-blue-50 text-blue-600"
            />

            <StatCard
              title="Outstanding"
              amount="QAR 18,200"
              description="Unpaid customer invoices"
              icon={Clock}
              color="bg-amber-50 text-amber-600"
            />

          </div>

          {/* Revenue and Expenses Chart */}
          <div className="mt-8 w-full min-w-0">
            <RevenueExpenseChart />
          </div>

          {/* Recent Transactions */}
          <div className="mt-8 w-full min-w-0">
            <RecentTransactions />
          </div>

        </div>
      </main>

    </div>
  );
}
