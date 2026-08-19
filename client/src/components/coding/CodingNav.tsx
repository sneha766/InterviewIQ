import { NavLink } from "react-router-dom";
import { Code2, History, Sparkles, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CodingNav() {
  const navItems = [
    {
      to: "/coding",
      label: "Problems",
      icon: Code2,
      end: true,
    },
    {
      to: "/coding/submissions",
      label: "Submissions",
      icon: History,
      end: false,
    },
    {
      to: "/coding/reviews",
      label: "AI Reviews",
      icon: Sparkles,
      end: false,
    },
    {
      to: "/coding/reports",
      label: "Reports & Analytics",
      icon: BarChart3,
      end: false,
    },
  ];

  return (
    <div className="flex items-center justify-between border-b bg-slate-900 px-6 py-2.5 text-white shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            IQ
          </div>
          <span className="font-semibold text-lg tracking-tight">Coding Platform</span>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-800 text-blue-400 font-semibold shadow-inner"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Real Code Execution Active
        </span>
      </div>
    </div>
  );
}
