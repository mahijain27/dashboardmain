import type { ActivityDay } from "@/types/database";

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateActivityData(weeks = 20): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();

  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const seed = Number(date.toISOString().split("T")[0].replace(/-/g, ""));
    const rand = seededRandom(seed);
    const randSecondary = seededRandom(seed + 1);

    let count = 0;
    let level: ActivityDay["level"] = 0;

    if (rand > 0.45) {
      if (randSecondary > 0.85) {
        count = Math.floor(seededRandom(seed + 2) * 8) + 5;
        level = 4;
      } else if (randSecondary > 0.7) {
        count = Math.floor(seededRandom(seed + 3) * 4) + 3;
        level = 3;
      } else if (randSecondary > 0.55) {
        count = Math.floor(seededRandom(seed + 4) * 3) + 1;
        level = 2;
      } else {
        count = 1;
        level = 1;
      }
    }

    days.push({
      date: date.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return days;
}

export function getActivityColor(level: ActivityDay["level"]): string {
  const colors: Record<ActivityDay["level"], string> = {
    0: "bg-bg-elevated border border-border-subtle",
    1: "bg-accent-violet/20 border border-accent-violet/20",
    2: "bg-accent-violet/40 border border-accent-violet/30",
    3: "bg-accent-violet/65 border border-accent-violet/50",
    4: "bg-accent-violet border border-accent-violet/80",
  };
  return colors[level];
}
