
"use client";

import { useState } from "react";
import Header from "@/components/Header";

import {
  Users,
  UserPlus,
  Mail,
  Phone,
  Search,
  Building2,
} from "lucide-react";

const initialCustomers = [
  {
    id: 1,
    name: "Ahmed Mohammed",
    company: "ABC Technologies",
    email: "ahmed@abc.com",
    phone: "+974 5551 2345",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Williams",
    company: "Global Solutions",
    email: "sarah@global.com",
    phone: "+974 5552 3456",
    status: "Active",
  },
  {
    id: 3,
    name: "John Smith",
    company: "Creative Studio",
    email: "john@creative.com",
    phone: "+974 5553 4567",
    status: "Active",
  },
  {
    id: 4,
    name: "David Fernando",
    company: "Digital Marketing Co.",
    email: "david@digital.com",
    phone: "+974 5554 5678",
    status: "Inactive",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
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

    const email = formData.email.trim().toLowerCase();

    const emailExists = customers.some(
      (customer) => customer.email.toLowerCase() === email
    );

    if (emailExists) {
      alert("A customer with this email already exists.");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name: formData.name.trim(),
      company: formData.company.trim(),
      email,
      phone: formData.phone.trim(),
      status: "Active",
    };

    setCustomers((previousCustomers) => [
      newCustomer,
      ...previousCustomers,
    ]);

    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
    });
  }

  const filteredCustomers = customers.filter((customer) => {
    const searchTerm = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.company.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.phone.toLowerCase().includes(searchTerm)
    );
  });

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const cardStyle =
    "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900";

  const labelStyle =
    "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";

  const inputStyle =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-emerald-900";

  return (
    <main className="min-h-screen min-w-0 w-full bg-slate-50 dark:bg-slate-950">
      <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <Header
          title="Customers"
          subtitle="Manage your business customers and contact information."
        />

        <div className="mt-8">

          {/* Page Introduction */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Customer Management
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Organize your customer information in one place.
            </p>
          </div>

          {/* Customer Summary */}
          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">

            <div className={cardStyle}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total Customers
                </p>

                <Users size={22} className="text-blue-600" />
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
                {customers.length}
              </h2>

              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                All registered customers
              </p>
            </div>

            <div className={cardStyle}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Active Customers
                </p>

                <UserPlus size={22} className="text-emerald-600" />
              </div>

              <h2 className="mt-4 text-3xl font-bold text-emerald-600">
                {activeCustomers}
              </h2>

              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                Currently active customers
              </p>
            </div>
          </div>

          {/* Add Customer Form */}
          <div className={`mb-8 ${cardStyle}`}>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <UserPlus size={21} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Add New Customer
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Enter the customer's contact information.
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>
                    Company
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <label className={labelStyle}>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+974 XXXXXXXX"
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
                  <UserPlus size={18} />
                  Add Customer
                </button>
              </div>
            </form>
          </div>

          {/* Customer List */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  All Customers
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  View and search your registered customers.
                </p>
              </div>

              <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950 sm:w-72">
                <Search size={18} className="shrink-0 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search customers..."
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">

                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
                  <tr>
                    <th className="whitespace-nowrap px-6 py-4">Customer</th>
                    <th className="whitespace-nowrap px-6 py-4">Company</th>
                    <th className="whitespace-nowrap px-6 py-4">Email</th>
                    <th className="whitespace-nowrap px-6 py-4">Phone</th>
                    <th className="whitespace-nowrap px-6 py-4 text-center">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">
                        {customer.name}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-2">
                          <Building2 size={16} className="text-slate-400" />
                          {customer.company}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-2">
                          <Mail size={15} className="text-slate-400" />
                          {customer.email}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-2">
                          <Phone size={15} className="text-slate-400" />
                          {customer.phone}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            customer.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-10 text-center text-slate-500 dark:text-slate-400"
                      >
                        No customers found.
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
