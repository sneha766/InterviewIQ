import { useUser } from "@clerk/clerk-react";
import { User, Mail, Shield, BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ProfileSettings() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Card className="p-8 space-y-6 rounded-3xl">
      <div className="flex items-center gap-4 pb-6 border-b">
        <img
          src={user.imageUrl}
          alt={user.fullName || "User"}
          className="h-20 w-20 rounded-full border-2 border-blue-600 object-cover shadow-md"
        />
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            {user.fullName || user.username || "InterviewIQ User"}
            <BadgeCheck className="h-5 w-5 text-blue-600 fill-blue-100" />
          </h2>
          <p className="text-sm text-slate-500">{user.primaryEmailAddress?.emailAddress}</p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Authenticated via Clerk
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Account Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-blue-600" /> Full Name
            </span>
            <div className="text-sm font-bold text-slate-800">
              {user.fullName || "Not provided"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-blue-600" /> Primary Email
            </span>
            <div className="text-sm font-bold text-slate-800">
              {user.primaryEmailAddress?.emailAddress || "Not provided"}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 md:col-span-2">
            <span className="text-xs text-slate-400 font-semibold uppercase flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-blue-600" /> Clerk User Identifier
            </span>
            <div className="text-xs font-mono text-slate-600 select-all">
              {user.id}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
