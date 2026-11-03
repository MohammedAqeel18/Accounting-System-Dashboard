
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Receipt,
  Wallet,
  Users,
  ChartNoAxesCombined,
  Settings,
  HelpCircle,
  Landmark,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Transactions", icon: Receipt, href: "/transactions" },
  { name: "Invoices", icon: Wallet, href: "/invoices" },
  { name: "Customers", icon: Users, href: "/customers" },
  { name: "Reports", icon: ChartNoAxesCombined, href: "/reports" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="mb-10 flex items-center gap-3 px-1 pt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <Landmark size={22} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Finora
          </h1>
          <p className="text-xs text-slate-400">Accounting Suite</p>
        </div>
      </div>

      {/* Navigation */}
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Workspace
      </p>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              <Icon size={19} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto space-y-2">
        <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
          <Settings size={19} />
          Settings
        </div>

        <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
          <HelpCircle size={19} />
          Help Center
        </div>

        <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Finora Business
          </p>

          <p className="text-xs text-slate-400">Premium Workspace</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Landmark size={20} />
          </div>

          <span className="text-lg font-bold text-slate-900 dark:text-white">
            Finora
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="rounded-lg border border-slate-200 p-2 text-slate-700 dark:border-slate-700 dark:text-slate-200"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white px-5 py-7 dark:border-slate-800 dark:bg-slate-900 lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={closeMobileMenu}
            className="absolute inset-0 bg-slate-950/40"
          />

          <aside className="absolute bottom-0 left-0 top-0 flex w-72 max-w-[85vw] flex-col bg-white px-5 py-6 shadow-2xl dark:bg-slate-900">
            <div className="mb-5 flex justify-end">
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
