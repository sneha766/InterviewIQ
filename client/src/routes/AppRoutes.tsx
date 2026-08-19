import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Resume from "../pages/Resume";
import Interview from "../pages/Interview";

import CodingProblemList from "../pages/coding/CodingProblemList";
import CodingProblemWorkspace from "../pages/coding/CodingProblemWorkspace";
import CodingSubmissions from "../pages/coding/CodingSubmissions";
import CodingSubmissionDetail from "../pages/CodingSubmissionDetail";
import CodingReviews from "../pages/coding/CodingReviews";
import CodingReports from "../pages/coding/CodingReports";

import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Billing from "../pages/Billing";

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

            {/* Coding Module Routes */}
            <Route path="/coding" element={<CodingProblemList />} />
            <Route path="/coding/submissions" element={<CodingSubmissions />} />
            <Route
              path="/coding/submissions/:id"
              element={<CodingSubmissionDetail />}
            />
            <Route path="/coding/reviews" element={<CodingReviews />} />
            <Route path="/coding/reports" element={<CodingReports />} />

            <Route path="/reports" element={<Reports />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Dedicated Full-Screen LeetCode IDE Workspace Route */}
          <Route
            path="/coding/problems/:slug"
            element={<CodingProblemWorkspace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
