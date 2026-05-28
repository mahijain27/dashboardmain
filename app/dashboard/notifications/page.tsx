import { BentoCard } from "@/components/ui/BentoCard";
import { Bell, Flame, Award, BookOpen } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "Streak Maintained!",
      desc: "Outstanding work! You have logged in for 12 consecutive days. Keep the learning fire burning!",
      time: "2 hours ago",
      icon: Flame,
      color: "text-accent-rose bg-accent-rose/10 border-accent-rose/20",
    },
    {
      id: 2,
      title: "Course Completed",
      desc: "Congratulations! You completed the last lesson of 'Advanced React Patterns' and unlocked your React Architect certificate.",
      time: "1 day ago",
      icon: Award,
      color: "text-accent-violet bg-accent-violet/10 border-accent-violet/20",
    },
    {
      id: 3,
      title: "Database Connected Successfully",
      desc: "Your dashboard client has successfully authenticated with Supabase. Courses database synchronization is active.",
      time: "2 days ago",
      icon: BookOpen,
      color: "text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20",
    },
  ];

  return (
    <section className="p-5 lg:p-8 max-w-3xl mx-auto" aria-label="Notifications">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-tight">
          Notifications
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Stay updated with your course progresses, achievements, and account activities.
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <BentoCard key={n.id} className="p-5 flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 shadow-sm ${n.color}`}>
              <n.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-text-primary">{n.title}</h3>
                <span className="text-[10px] text-text-muted font-mono whitespace-nowrap">{n.time}</span>
              </div>
              <p className="text-text-secondary text-xs mt-1.5 leading-relaxed">
                {n.desc}
              </p>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
