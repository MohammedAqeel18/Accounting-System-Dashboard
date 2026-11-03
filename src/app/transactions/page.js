
"use client";

import { useState } from "react";
import Header from "@/components/Header";

import {
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
} from "lucide-react";

const initialTransactions = [
  {
    id: 1,
    description: "Website Development",
    category: "Services",
    date: "2026-11-03",
    type: "Income",
    amount: 8500,
    status: "Completed",
  },
  {
    id: 2,
    description: "Office Rent",
    category: "Rent",
    date: "2026-11-02",
    type: "Expense",
    amount: 4200,
    status: "Completed",
  },
  {
    id: 3,
    description: "Client Payment",
    category: "Sales",
    date: "2026-11-01",
    type: "Income",
    amount: 6200,
    status: "Completed",
  },
  {
    id: 4,
    description: "Software Subscription",
    category: "Software",
    date: "2026-10-30",
    type: "Expense",
    amount: 350,
    status: "Pending",
  },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(initialTransactions);

  const [formData, setFormData] = useState({
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    type: "Income",
    amount: "",
  });

  const [filter, setFilter] = useState("All");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const amount = Number(formData.amount);

    if (
      !formData.description.trim() ||
      !formData.category.trim() ||
      !formData.date ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      alert("Please enter valid transaction details.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      date: formData.date,
      type: formData.type,
      amount,
      status: "Completed",
    };

    setTransactions((previousTransactions) => [
      newTransaction,
      ...previousTransactions,
    ]);

    setFormData({
      description: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      type: "Income",
      amount: "",
    });
  }

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.type === filter
        );

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const cardStyle =
    "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900";

  const labelStyle =
    "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";

  const inputStyle =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-emerald-900";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="min-w-0 w-full">
        <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">

          <Header
            title="Transactions"
            subtitle="Manage and monitor your business transactions."
          />

          <div className="mt-8">

            {/* Page Introduction */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Transaction Management
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Record income and expenses and keep track of your finances.
              </p>
            </div>

            {/* Financial Summary */}
            <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

              <div className={cardStyle}>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Total Transactions
                  </p>
                  <Receipt className="text-blue-600" size={22} />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {transactions.length}
                </h2>
              </div>

              <div className={cardStyle}>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Total Income
                  </p>
                  <ArrowDownLeft className="text-emerald-600" size={22} />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-emerald-600">
                  QAR {totalIncome.toLocaleString()}
                </h2>
              </div>

              <div className={cardStyle}>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Total Expenses
                  </p>
                  <ArrowUpRight className="text-rose-600" size={22} />
                </div>

                <h2 className="mt-4 text-2xl font-bold text-rose-600">
                  QAR {totalExpenses.toLocaleString()}
                </h2>
              </div>
            </div>

            {/* Add Transaction Form */}
            <div className={`mb-8 ${cardStyle}`}>
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <Plus size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Add New Transaction
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Enter the details of your income or expense.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                  <div>
                    <label className={labelStyle}>Description</label>

                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="e.g. Office rent"
                      className={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelStyle}>Category</label>

                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="e.g. Rent, Sales, Services"
                      className={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelStyle}>Amount (QAR)</label>

                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      min="0.01"
                      step="0.01"
                      className={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelStyle}>Transaction Date</label>

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelStyle}>Transaction Type</label>

                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <Plus size={18} />
                    Add Transaction
                  </button>
                </div>
              </form>
            </div>

            {/* Transactions Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    All Transactions
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    View your recorded financial activities.
                  </p>
                </div>

                <select
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  <option value="All">All Transactions</option>
                  <option value="Income">Income Only</option>
                  <option value="Expense">Expenses Only</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">

                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
                    <tr>
                      <th className="whitespace-nowrap px-6 py-4">Description</th>
                      <th className="whitespace-nowrap px-6 py-4">Category</th>
                      <th className="whitespace-nowrap px-6 py-4">Date</th>
                      <th className="whitespace-nowrap px-6 py-4">Type</th>
                      <th className="whitespace-nowrap px-6 py-4 text-right">Amount</th>
                      <th className="whitespace-nowrap px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">
                          {transaction.description}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
                          {transaction.category}
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
                          {formatDate(transaction.date)}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              transaction.type === "Income"
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                                : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </td>

                        <td
                          className={`whitespace-nowrap px-6 py-4 text-right font-bold ${
                            transaction.type === "Income"
                              ? "text-emerald-600"
                              : "text-rose-600"
                          }`}
                        >
                          {transaction.type === "Income" ? "+" : "-"} QAR{" "}
                          {transaction.amount.toLocaleString()}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {filteredTransactions.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-10 text-center text-slate-500 dark:text-slate-400"
                        >
                          No transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
