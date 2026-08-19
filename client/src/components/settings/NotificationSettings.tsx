import { useState } from "react";
import { Bell, Mail, Sparkles, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function NotificationSettings() {
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [weeklyProgress, setWeeklyProgress] = useState(true);
  const [aiFeedbackAlerts, setAiFeedbackAlerts] = useState(true);

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter((prev) => {
      const next = !prev;
      toast.success("Notification preferences updated.");
      return next;
    });
  };

  return (
    <Card className="p-8 space-y-6 rounded-3xl">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
          <Bell className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Notification Preferences</h2>
          <p className="text-sm text-slate-500">Manage email alerts and product activity updates.</p>
        </div>
      </div>

      <div className="space-y-4 divide-y">
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" /> Interview Reminders
            </span>
            <p className="text-xs text-slate-500">Receive reminders to practice mock interviews consistently.</p>
          </div>
          <button
            onClick={() => handleToggle(setInterviewReminders)}
            className={`w-12 h-6 rounded-full transition-colors p-1 ${
              interviewReminders ? "bg-blue-600" : "bg-slate-300"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-white transition-transform ${
                interviewReminders ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="space-y-1">
            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" /> Weekly Performance Summaries
            </span>
            <p className="text-xs text-slate-500">Get weekly digest emails summarizing ATS score and coding streak progress.</p>
          </div>
          <button
            onClick={() => handleToggle(setWeeklyProgress)}
            className={`w-12 h-6 rounded-full transition-colors p-1 ${
              weeklyProgress ? "bg-blue-600" : "bg-slate-300"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-white transition-transform ${
                weeklyProgress ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="space-y-1">
            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> AI Code Review Notifications
            </span>
            <p className="text-xs text-slate-500">Alerts when detailed AI reviews are generated for submitted code solutions.</p>
          </div>
          <button
            onClick={() => handleToggle(setAiFeedbackAlerts)}
            className={`w-12 h-6 rounded-full transition-colors p-1 ${
              aiFeedbackAlerts ? "bg-blue-600" : "bg-slate-300"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-white transition-transform ${
                aiFeedbackAlerts ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </Card>
  );
}
