
import * as React from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps {
  name: keyof typeof LucideIcons;
  fallback?: keyof typeof LucideIcons;
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
  onClick?: () => void;
}

const Icon = ({
  name,
  fallback = "CircleAlert",
  size = 24,
  className = "",
  color,
  strokeWidth = 2,
  onClick,
}: IconProps) => {
  // Проверяем, существует ли иконка с указанным именем
  const IconComponent = LucideIcons[name] || LucideIcons[fallback];

  return (
    <IconComponent
      size={size}
      className={cn("", className)}
      color={color}
      strokeWidth={strokeWidth}
      onClick={onClick}
    />
  );
};

export default Icon;
