import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import AppRoutes from "./routes/AppRoutes";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const  queryClient = new QueryClient(); 
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ClerkProvider publishableKey={clerkPubKey}>
      <AppRoutes />
      <Toaster richColors position="top-right" />
    </ClerkProvider>
    </QueryClientProvider>
  </React.StrictMode>
);