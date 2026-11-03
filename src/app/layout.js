
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata = {
  title: "Finora | Accounting Dashboard",
  description: "Manage your business finances with Finora.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider>
          <Sidebar />

          <main className="min-h-screen min-w-0 bg-slate-50 dark:bg-slate-950 lg:ml-64">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
