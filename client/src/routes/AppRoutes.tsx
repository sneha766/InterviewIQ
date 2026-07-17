import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Resume from "../pages/Resume";
import Interview from "../pages/Interview";
import Coding from "../pages/Coding";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/resume" element={<Resume />} />

            <Route path="/interview" element={<Interview />} />

            <Route path="/coding" element={<Coding />} />

            <Route path="/reports" element={<Reports />} />

            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
