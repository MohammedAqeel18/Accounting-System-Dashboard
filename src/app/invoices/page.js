
"use client";

import { useState } from "react";
import Header from "@/components/Header";

import {
  FileText,
  CheckCircle,
  Clock,
  Plus,
} from "lucide-react";

const initialInvoices = [
  {
    id: 1,
    invoiceNumber: "INV-1001",
    customer: "ABC Technologies",
    issueDate: "2026-11-01",
    dueDate: "2026-11-15",
    amount: 8500,
    status: "Paid",
  },
  {
    id: 2,
    invoiceNumber: "INV-1002",
    customer: "Global Solutions",
    issueDate: "2026-11-02",
    dueDate: "2026-11-16",
    amount: 6200,
    status: "Unpaid",
  },
  {
    id: 3,
    invoiceNumber: "INV-1003",
    customer: "Creative Studio",
    issueDate: "2026-10-10",
    dueDate: "2026-10-25",
    amount: 4200,
    status: "Overdue",
  },
  {
    id: 4,
    invoiceNumber: "INV-1004",
    customer: "Digital Marketing Co.",
    issueDate: "2026-10-28",
    dueDate: "2026-11-12",
    amount: 3500,
    status: "Paid",
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [filter, setFilter] = useState("All");

  const [formData, setFormData] = useState({
    customer: "",
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    amount: "",
  });

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
      !formData.customer.trim() ||
      !formData.issueDate ||
      !formData.dueDate ||
      formData.dueDate < formData.issueDate ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      alert(
        "Please enter valid invoice details. The due date cannot be before the issue date."
      );
      return;
    }

    const nextNumber =
      1001 + invoices.length;

    const newInvoice = {
      id: Date.now(),
      invoiceNumber: `INV-${nextNumber}`,
      customer: formData.customer.trim(),
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      amount,
      status: "Unpaid",
    };

    setInvoices((previousInvoices) => [
      newInvoice,
      ...previousInvoices,
    ]);

    setFormData({
      customer: "",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: "",
      amount: "",
    });
  }

  function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const totalInvoiced = invoices.reduce(
    (total, invoice) => total + invoice.amount,
    0
  );

  const totalPaid = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((total, invoice) => total + invoice.amount, 0);

  const outstanding = invoices
    .filter((invoice) => invoice.status !== "Paid")
    .reduce((total, invoice) => total + invoice.amount, 0);

  const filteredInvoices =
    filter === "All"
      ? invoices
      : invoices.filter((invoice) => invoice.status === filter);

  const cardStyle =
    "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900";

  const labelStyle =
    "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";

  const inputStyle =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-emerald-900";

  return (
    <main className="min-h-screen min-w-0 w-full bg-slate-50 dark:bg-slate-950">
      <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <Header
          title="Invoices"
          subtitle="Create and manage customer invoices."
        />

        <div className="mt-8">

          {/* Page Introduction */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Invoice Management
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Track customer payments and outstanding invoices.
            </p>
          </div>

          {/* Invoice Summary Cards */}
          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

            <div className={cardStyle}>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Invoiced
                </p>
                <FileText size={22} className="text-blue-600" />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
                QAR {totalInvoiced.toLocaleString()}
              </h2>

              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                All recorded invoices
              </p>
            </div>

            <div className={cardStyle}>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Paid
                </p>
                <CheckCircle size={22} className="text-emerald-600" />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-emerald-600">
                QAR {totalPaid.toLocaleString()}
              </h2>

              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                Payments received
              </p>
            </div>

            <div className={cardStyle}>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Outstanding
                </p>
                <Clock size={22} className="text-amber-600" />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-amber-600">
                QAR {outstanding.toLocaleString()}
              </h2>

              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                Unpaid and overdue invoices
              </p>
            </div>
          </div>

          {/* Create Invoice Form */}
          <div className={`mb-8 ${cardStyle}`}>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Plus size={21} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Create New Invoice
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Enter customer and payment details.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                <div>
                  <label className={labelStyle}>
                    Customer Name
                  </label>

                  <input
                    type="text"
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    placeholder="Enter customer name"
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>
                    Invoice Amount (QAR)
                  </label>

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
                  <label className={labelStyle}>
                    Issue Date
                  </label>

                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    min={formData.issueDate}
                    className={inputStyle}
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <Plus size={18} />
                  Create Invoice
                </button>
              </div>
            </form>
          </div>

          {/* Invoice List */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  All Invoices
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Monitor your customer invoices and payments.
                </p>
              </div>

              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                <option value="All">All Invoices</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
                  <tr>
                    <th className="whitespace-nowrap px-6 py-4">Invoice ID</th>
                    <th className="whitespace-nowrap px-6 py-4">Customer</th>
                    <th className="whitespace-nowrap px-6 py-4">Issue Date</th>
                    <th className="whitespace-nowrap px-6 py-4">Due Date</th>
                    <th className="whitespace-nowrap px-6 py-4 text-right">Amount</th>
                    <th className="whitespace-nowrap px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">
                        {invoice.invoiceNumber}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-slate-700 dark:text-slate-300">
                        {invoice.customer}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
                        {formatDate(invoice.issueDate)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
                        {formatDate(invoice.dueDate)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right font-bold text-slate-800 dark:text-slate-200">
                        QAR {invoice.amount.toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            invoice.status === "Paid"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                              : invoice.status === "Overdue"
                              ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredInvoices.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-slate-500 dark:text-slate-400"
                      >
                        No invoices found.
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
  );
}
