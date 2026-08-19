import { useState } from "react";
import { User, Sliders, Bell, CreditCard } from "lucide-react";
import ProfileSettings from "@/components/settings/ProfileSettings";
import PreferencesSettings from "@/components/settings/PreferencesSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SubscriptionSettings from "@/components/settings/SubscriptionSettings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"profile" | "preferences" | "notifications" | "subscription">("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Sliders },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "subscription", label: "Subscription", icon: CreditCard },
  ] as const;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Account Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal profile, application defaults, notification preferences, and subscription status.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "preferences" && <PreferencesSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "subscription" && <SubscriptionSettings />}
      </div>
    </div>
  );
}
