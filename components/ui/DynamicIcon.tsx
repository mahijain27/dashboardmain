"use client";

import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

type IconComponent = React.ComponentType<LucideProps>;

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = (LucideIcons as unknown as Record<string, IconComponent>)[name];

  if (!Icon) {
    const FallbackIcon = LucideIcons.BookOpen;
    return <FallbackIcon {...props} />;
  }

  return <Icon {...props} />;
}
