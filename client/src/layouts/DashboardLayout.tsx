import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}