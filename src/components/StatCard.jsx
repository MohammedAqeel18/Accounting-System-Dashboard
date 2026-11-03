
export default function StatCard({
  title,
  amount,
  description,
  icon: Icon,
  color,
}) {
  const darkColor =
    {
      "Total Revenue": "dark:bg-emerald-950 dark:text-emerald-400",
      "Total Expenses": "dark:bg-rose-950 dark:text-rose-400",
      "Net Profit": "dark:bg-blue-950 dark:text-blue-400",
      Outstanding: "dark:bg-amber-950 dark:text-amber-400",
    }[title] || "dark:bg-slate-800 dark:text-slate-300";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>

        <div className={`rounded-xl p-3 ${color} ${darkColor}`}>
          <Icon size={21} />
        </div>
      </div>

      <h3 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {amount}
      </h3>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>

    </div>
  );
}
