import { Navigate, Outlet } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export default function ProtectedRoute() {
  return (
    <>
      <SignedIn>
        <Outlet />
      </SignedIn>

      <SignedOut>
        <Navigate to="/login" replace />
      </SignedOut>
    </>
  );
}