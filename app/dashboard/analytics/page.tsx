import { BentoCard } from "@/components/ui/BentoCard";
import { BarChart3, Clock, Flame, Award, ArrowUpRight, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  // Mock data for weekly study hours
  const weeklyHours = [
    { day: "Mon", hours: 2.5, height: "40%" },
    { day: "Tue", hours: 4.2, height: "70%" },
    { day: "Wed", hours: 1.8, height: "30%" },
    { day: "Thu", hours: 5.5, height: "90%" },
    { day: "Fri", hours: 3.0, height: "50%" },
    { day: "Sat", hours: 6.2, height: "100%" },
    { day: "Sun", hours: 2.0, height: "35%" },
  ];

  return (
    <section className="p-5 lg:p-8 max-w-7xl mx-auto" aria-label="Analytics">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary tracking-tight">
          Learning Analytics
        </h1>
        <p className="text-text-secondary text-sm mt-1">
          Detailed insights into your study habits, progress, and performance trends.
        </p>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <BentoCard className="p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-9 h-9 rounded-xl bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent-violet" />
            </div>
            <span className="flex items-center gap-0.5 text-accent-emerald text-xs font-semibold bg-accent-emerald/10 border border-accent-emerald/20 px-2 py-0.5 rounded-lg">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-text-muted text-[10px] font-mono uppercase tracking-wider">Total Study Time</p>
            <h2 className="text-text-primary text-2xl font-bold mt-1">142.5 hrs</h2>
            <p className="text-text-muted text-[10px] mt-1">v.s. last month 127 hrs</p>
          </div>
        </BentoCard>

        <BentoCard className="p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-9 h-9 rounded-xl bg-accent-rose/10 border border-accent-rose/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-accent-rose" />
            </div>
            <span className="flex items-center gap-0.5 text-accent-rose text-xs font-semibold bg-accent-rose/10 border border-accent-rose/20 px-2 py-0.5 rounded-lg">
              Active
            </span>
          </div>
          <div className="mt-4">
            <p className="text-text-muted text-[10px] font-mono uppercase tracking-wider">Current Streak</p>
            <h2 className="text-text-primary text-2xl font-bold mt-1">12 Days</h2>
            <p className="text-text-muted text-[10px] mt-1">Personal record: 18 days</p>
          </div>
        </BentoCard>

        <BentoCard className="p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-9 h-9 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-accent-blue" />
            </div>
            <span className="flex items-center gap-0.5 text-accent-blue text-xs font-semibold bg-accent-blue/10 border border-accent-blue/20 px-2 py-0.5 rounded-lg">
              Top 5%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-text-muted text-[10px] font-mono uppercase tracking-wider">Avg. Assessment Score</p>
            <h2 className="text-text-primary text-2xl font-bold mt-1">89.4%</h2>
            <p className="text-text-muted text-[10px] mt-1">Global average: 74.2%</p>
          </div>
        </BentoCard>

        <BentoCard className="p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-9 h-9 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-accent-emerald" />
            </div>
            <span className="flex items-center gap-0.5 text-accent-emerald text-xs font-semibold bg-accent-emerald/10 border border-accent-emerald/20 px-2 py-0.5 rounded-lg">
              Earned
            </span>
          </div>
          <div className="mt-4">
            <p className="text-text-muted text-[10px] font-mono uppercase tracking-wider">Certificates</p>
            <h2 className="text-text-primary text-2xl font-bold mt-1">3 Earned</h2>
            <p className="text-text-muted text-[10px] mt-1">Next milestone at 5</p>
          </div>
        </BentoCard>
      </div>

      {/* Visual Analytics Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Weekly Activity Chart (spans 2 cols) */}
        <BentoCard className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-display font-semibold text-lg text-text-primary flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent-violet" />
                Weekly Study Time
              </h3>
              <p className="text-text-secondary text-xs mt-0.5">Average 3.6 hours per day</p>
            </div>
          </div>
          
          {/* Custom SVG/CSS Bar Chart */}
          <div className="flex items-end justify-between h-56 pt-6 px-4 bg-bg-elevated/20 border border-border-subtle rounded-2xl">
            {weeklyHours.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2.5 w-1/8 group">
                <div className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-semibold mb-1">
                  {d.hours}h
                </div>
                <div 
                  style={{ height: d.height }} 
                  className="w-8 rounded-t-lg bg-gradient-to-t from-accent-violet/30 to-accent-violet border-t border-accent-violet shadow-glow-sm transition-all duration-300 group-hover:brightness-125"
                />
                <span className="text-text-secondary text-[10px] font-medium uppercase py-2">{d.day}</span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Right Card: Performance breakdown */}
        <BentoCard className="p-6">
          <h3 className="font-display font-semibold text-lg text-text-primary mb-4">Subject Strengths</h3>
          <p className="text-text-secondary text-xs mb-6">Course score distributions by primary skills.</p>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-text-primary">React & Frontend</span>
                <span className="text-accent-violet">94%</span>
              </div>
              <div className="h-2 rounded-full bg-bg-elevated border border-border-subtle overflow-hidden">
                <div className="h-full w-[94%] bg-accent-violet rounded-full shadow-glow-sm" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-text-primary">System Architecture</span>
                <span className="text-accent-blue">82%</span>
              </div>
              <div className="h-2 rounded-full bg-bg-elevated border border-border-subtle overflow-hidden">
                <div className="h-full w-[82%] bg-accent-blue rounded-full shadow-glow-sm" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-text-primary">TypeScript Mastery</span>
                <span className="text-accent-emerald">78%</span>
              </div>
              <div className="h-2 rounded-full bg-bg-elevated border border-border-subtle overflow-hidden">
                <div className="h-full w-[78%] bg-accent-emerald rounded-full shadow-glow-sm" />
              </div>
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
}
