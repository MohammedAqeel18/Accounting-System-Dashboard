
const transactions = [
  {
    id: 1,
    description: "Website Development",
    category: "Services",
    date: "Nov 03, 2026",
    type: "Income",
    amount: 8500,
    status: "Completed",
  },
  {
    id: 2,
    description: "Office Rent",
    category: "Rent",
    date: "Nov 02, 2026",
    type: "Expense",
    amount: 4200,
    status: "Completed",
  },
  {
    id: 3,
    description: "Client Payment",
    category: "Sales",
    date: "Nov 01, 2026",
    type: "Income",
    amount: 6200,
    status: "Completed",
  },
  {
    id: 4,
    description: "Software Subscription",
    category: "Software",
    date: "Oct 30, 2026",
    type: "Expense",
    amount: 350,
    status: "Pending",
  },
  {
    id: 5,
    description: "Marketing Campaign",
    category: "Marketing",
    date: "Oct 28, 2026",
    type: "Expense",
    amount: 1200,
    status: "Completed",
  },
];

export default function RecentTransactions() {
  return (
    <div className="mt-8 w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">

      {/* Heading */}
      <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your latest income and expenses
          </p>
        </div>

        <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
          View All
        </button>
      </div>

      {/* Transactions table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">

          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              <th className="px-6 py-4 font-semibold">Description</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Type</th>
              <th className="px-6 py-4 text-right font-semibold">Amount</th>
              <th className="px-6 py-4 text-center font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-800 dark:text-slate-100">
                  {transaction.description}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
                  {transaction.category}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
                  {transaction.date}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      transaction.type === "Income"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>

                <td
                  className={`whitespace-nowrap px-6 py-4 text-right font-bold ${
                    transaction.type === "Income"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {transaction.type === "Income" ? "+" : "-"} QAR{" "}
                  {transaction.amount.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      transaction.status === "Completed"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
