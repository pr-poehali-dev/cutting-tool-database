
import * as React from "react";
import { LucideProps, icons } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof icons;
  fallback?: keyof typeof icons;
}

const Icon = ({ name, fallback = "CircleAlert", className, ...props }: IconProps) => {
  const IconComponent = icons[name] || icons[fallback];
  return <IconComponent className={cn("", className)} {...props} />;
};

export default Icon;
