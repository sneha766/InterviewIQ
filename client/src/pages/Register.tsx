import { SignUp } from "@clerk/clerk-react";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <SignUp
        routing="path"
        path="/register"
        signInUrl="/login"
      />
    </div>
  );
}