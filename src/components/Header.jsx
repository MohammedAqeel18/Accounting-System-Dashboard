
import Link from "next/link";
import {
  Search,
  Bell,
  Plus,
  ChevronDown,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header({
  title = "Dashboard",
  subtitle = "Welcome back! Here's your financial overview.",
}) {
  return (
    <header className="mb-6 w-full min-w-0">
      {/* Page title */}
      <div className="mb-5 min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Finora Workspace
          </span>
        </div>

        <h1 className="break-words text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {title}
        </h1>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      </div>

      {/* Responsive actions */}
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">

        {/* Search */}
        <div className="flex h-11 w-full min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:w-auto sm:flex-1">
          <Search size={18} className="shrink-0 text-slate-400" />

          <input
            type="text"
            placeholder="Search anything..."
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
          />

          <span className="hidden shrink-0 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-400 dark:border-slate-700 dark:bg-slate-800 lg:block">
            Ctrl K
          </span>
        </div>

        {/* Buttons and profile */}
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:shrink-0">

          {/* Appearance selector */}
          <ThemeToggle />

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* New transaction */}
          <Link
            href="/transactions"
            className="flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:flex-none sm:px-4"
          >
            <Plus size={18} className="shrink-0" />
            <span className="truncate">New Transaction</span>
          </Link>

          {/* Admin profile */}
          <button
            type="button"
            aria-label="Admin profile"
            className="flex h-11 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 sm:px-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
              A
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Admin
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </p>
            </div>

            <ChevronDown size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      <div className="mt-6 border-b border-slate-200 dark:border-slate-800" />
    </header>
  );
}
