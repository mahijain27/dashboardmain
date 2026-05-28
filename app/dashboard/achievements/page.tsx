import { BentoCard } from "@/components/ui/BentoCard";
import { Trophy, Award, Zap, Code2, Heart, Shield, Lock } from "lucide-react";

export default function AchievementsPage() {
  const achievements = [
    {
      id: "react_master",
      title: "React Specialist",
      desc: "Reach 75%+ progress on Advanced React Patterns.",
      icon: Code2,
      color: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
      unlocked: true,
      badgeText: "Unlocked",
    },
    {
      id: "consistency",
      title: "Consistency Hero",
      desc: "Maintain a study streak of 10+ days.",
      icon: Zap,
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
      unlocked: true,
      badgeText: "Unlocked",
    },
    {
      id: "all_star",
      title: "A+ Performer",
      desc: "Score an average assessment grade of 85% or above.",
      icon: Trophy,
      color: "from-accent-violet/20 to-accent-blue/20 text-accent-violet border-accent-violet/30",
      unlocked: true,
      badgeText: "Unlocked",
    },
    {
      id: "early_adopter",
      title: "Pioneer",
      desc: "Join Horizon and configure your secure dashboard client.",
      icon: Award,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
      unlocked: true,
      badgeText: "Unlocked",
    },
    {
      id: "full_house",
      title: "Completionist",
      desc: "100% complete all enrolled learning modules.",
      icon: Shield,
      color: "from-purple-500/10 to-indigo-500/10 text-text-muted border-border-subtle",
      unlocked: false,
      badgeText: "Locked",
    },
    {
      id: "mentor",
      title: "Community Mentor",
      desc: "Help another student solve a database connection issue.",
      icon: Heart,
      color: "from-pink-500/10 to-rose-500/10 text-text-muted border-border-subtle",
      unlocked: false,
      badgeText: "Locked",
    },
  ];

  return (
    <section className="p-5 lg:p-8 max-w-7xl mx-auto" aria-label="Achievements">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-tight">
          My Achievements
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Milestones, professional certificates, and skill badges earned along your journey.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Badges Grid (spans 2 cols on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-text-primary">Badges ({achievements.filter(a => a.unlocked).length}/6)</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((a, i) => (
              <BentoCard key={a.id} className="p-5 flex flex-col justify-between h-auto gap-4 relative overflow-hidden group">
                {!a.unlocked && (
                  <div className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-bg-secondary border border-border-subtle">
                    <Lock className="w-3.5 h-3.5 text-text-muted" />
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br border flex items-center justify-center flex-shrink-0 shadow-sm ${a.color}`}>
                    <a.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${a.unlocked ? "text-text-primary" : "text-text-secondary"}`}>{a.title}</h3>
                    <p className="text-text-secondary text-xs mt-1 leading-relaxed">
                      {a.desc}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    a.unlocked 
                      ? "bg-accent-violet/10 text-accent-violet border-accent-violet/20" 
                      : "bg-bg-elevated/40 text-text-muted border-border-subtle"
                  }`}>
                    {a.badgeText}
                  </span>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>

        {/* Right Column: Professional Certificates (1 col) */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-text-primary font-display">Verified Certificates</h2>
          
          <BentoCard className="p-5 flex flex-col justify-between gap-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-accent-violet" />
              </div>
              <h3 className="font-display font-semibold text-base text-text-primary">React Frontend Architect</h3>
              <p className="text-text-muted text-[10px] font-mono mt-1 uppercase tracking-wide">ID: CERT-882-990-2A</p>
              
              <div className="mt-4 p-3 bg-bg-elevated/40 border border-border-subtle rounded-xl text-center">
                <p className="text-text-primary text-xs font-semibold">Earned on May 25, 2026</p>
                <p className="text-text-secondary text-[10px] mt-1">Verified via Supabase SSR</p>
              </div>
            </div>

            <button className="w-full mt-4 py-2.5 rounded-xl border border-border-subtle bg-bg-elevated/20 text-text-primary text-xs font-bold shadow-sm hover:bg-bg-elevated/40 transition-colors duration-150">
              Download PDF
            </button>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
