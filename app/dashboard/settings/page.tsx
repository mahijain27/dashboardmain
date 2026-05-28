import { BentoCard } from "@/components/ui/BentoCard";
import { Settings, User, Bell, Shield, Database, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <section className="p-5 lg:p-8 max-w-4xl mx-auto" aria-label="Settings">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-tight">
          Settings
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Manage your account preferences, system configurations, and security.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <BentoCard className="p-6">
          <h3 className="font-display font-semibold text-lg text-text-primary flex items-center gap-2.5 mb-4">
            <User className="w-5 h-5 text-accent-violet" />
            Profile Information
          </h3>
          <p className="text-text-secondary text-xs mb-6">Manage how you look and feel on the dashboard.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-text-secondary font-medium">Full Name</label>
              <input
                type="text"
                defaultValue="Alex Chen"
                className="w-full px-4 py-2.5 rounded-xl bg-bg-elevated/40 border border-border-subtle text-text-primary text-xs focus:outline-none focus:border-border-glow transition-all duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-text-secondary font-medium">Email Address</label>
              <input
                type="email"
                defaultValue="alex.chen@horizon.dev"
                disabled
                className="w-full px-4 py-2.5 rounded-xl bg-bg-elevated/20 border border-border-subtle/50 text-text-muted text-xs cursor-not-allowed"
              />
            </div>
          </div>
        </BentoCard>

        {/* Notifications & Preferences Card */}
        <BentoCard className="p-6">
          <h3 className="font-display font-semibold text-lg text-text-primary flex items-center gap-2.5 mb-4">
            <Bell className="w-5 h-5 text-accent-blue" />
            Notification Preferences
          </h3>
          <p className="text-text-secondary text-xs mb-6">Control when and how you receive alerts from Horizon.</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border-subtle/45">
              <div>
                <p className="text-xs font-semibold text-text-primary">Weekly Summary Emails</p>
                <p className="text-text-muted text-[10px] mt-0.5">Receive a detailed digest of your study stats every Monday.</p>
              </div>
              <div className="w-9 h-5 rounded-full bg-accent-violet p-0.5 cursor-pointer flex justify-end">
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border-subtle/45">
              <div>
                <p className="text-xs font-semibold text-text-primary">Course Milestones</p>
                <p className="text-text-muted text-[10px] mt-0.5">Get notified when you unlock a new course achievement.</p>
              </div>
              <div className="w-9 h-5 rounded-full bg-accent-violet p-0.5 cursor-pointer flex justify-end">
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-xs font-semibold text-text-primary">Streak Reminders</p>
                <p className="text-text-muted text-[10px] mt-0.5">Receive browser alerts if you are close to losing your 12-day streak.</p>
              </div>
              <div className="w-9 h-5 rounded-full bg-bg-elevated border border-border-subtle p-0.5 cursor-pointer flex justify-start">
                <div className="w-4 h-4 rounded-full bg-text-muted/65 shadow-sm" />
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Database & Security Card */}
        <BentoCard className="p-6">
          <h3 className="font-display font-semibold text-lg text-text-primary flex items-center gap-2.5 mb-4">
            <Database className="w-5 h-5 text-accent-emerald" />
            Database Settings (Supabase)
          </h3>
          <p className="text-text-secondary text-xs mb-6">Database configuration status parsed from your secure env files.</p>

          <div className="p-4 bg-bg-elevated/30 border border-border-subtle rounded-xl space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-secondary">Project URL</span>
              <span className="font-mono text-accent-emerald font-medium">https://nzppswngghnbjxowxbxu.supabase.co</span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-secondary">Connection Status</span>
              <span className="flex items-center gap-1.5 text-accent-emerald font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-emerald animate-pulse" />
                Active
              </span>
            </div>
          </div>
        </BentoCard>

        {/* Save Options */}
        <div className="flex justify-end gap-3 pt-2">
          <button className="px-5 py-2.5 rounded-xl border border-border-subtle bg-bg-elevated/20 text-text-primary text-xs font-bold shadow-sm hover:bg-bg-elevated/40 transition-colors duration-150">
            Cancel
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-blue text-white text-xs font-bold shadow-glow hover:brightness-110 active:scale-[0.98] transition-all duration-150">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}
