import {
  LayoutDashboard,
  FileText,
  Brain,
  Code2,
  BarChart3,
  Settings,
  CreditCard,
} from "lucide-react";

export const dashboardLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Resume",
    icon: FileText,
    path: "/resume",
  },
  {
    title: "AI Interview",
    icon: Brain,
    path: "/interview",
  },
  {
    title: "Coding",
    icon: Code2,
    path: "/coding",
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    title: "Billing",
    icon: CreditCard,
    path: "/billing",
    
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

import { FileCheck, BrainCircuit, Trophy, Target } from "lucide-react";

export const stats = [
  {
    title: "ATS Score",
    value: "92%",
    change: "+8% this week",
    icon: Target,
  },
  {
    title: "Resume Score",
    value: "89%",
    change: "+5 points",
    icon: FileCheck,
  },
  {
    title: "AI Interviews",
    value: "18",
    change: "+3 today",
    icon: BrainCircuit,
  },
  {
    title: "Success Rate",
    value: "94%",
    change: "+2%",
    icon: Trophy,
  },
];
