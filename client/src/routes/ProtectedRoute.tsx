import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import {
  Navigate,
  Outlet,
} from "react-router-dom";

export default function ProtectedRoute() {
  return (
    <>
      <ClerkLoading>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <SignedIn>
          <Outlet />
        </SignedIn>

        <SignedOut>
          <Navigate
            to="/login"
            replace
          />
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}