
"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Monitor,
  Check,
  ChevronDown,
} from "lucide-react";

const themes = [
  {
    value: "light",
    label: "Light",
    description: "Bright and clean appearance",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    description: "Easy on the eyes",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    description: "Follow your device settings",
    icon: Monitor,
  },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-32 rounded-xl bg-slate-100 dark:bg-slate-800" />
    );
  }

  const selectedTheme =
    themes.find((item) => item.value === theme) || themes[2];

  const SelectedIcon = selectedTheme.icon;

  function handleThemeChange(value) {
    setTheme(value);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Appearance button */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
      >
        <SelectedIcon
          size={17}
          className="text-indigo-600 dark:text-indigo-400"
        />

        <span>Appearance</span>

        <ChevronDown
          size={15}
          className={`text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Custom dropdown menu */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30"
        >
          <div className="px-3 pb-2 pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Appearance
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Choose how Finora looks.
            </p>
          </div>

          <div className="space-y-1">
            {themes.map((item) => {
              const Icon = item.icon;
              const isSelected = theme === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isSelected}
                  onClick={() => handleThemeChange(item.value)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                    isSelected
                      ? "bg-indigo-50 dark:bg-indigo-500/10"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isSelected
                        ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    <Icon size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        isSelected
                          ? "text-indigo-700 dark:text-indigo-300"
                          : "text-slate-800 dark:text-slate-100"
                      }`}
                    >
                      {item.label}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>

                  {isSelected && (
                    <Check
                      size={18}
                      className="shrink-0 text-indigo-600 dark:text-indigo-400"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2 border-t border-slate-100 px-3 py-2 dark:border-slate-800">
            <p className="text-[11px] text-slate-400">
              Your preference is saved automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
