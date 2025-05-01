
import { FC } from "react";
import * as LucideIcons from "lucide-react";

// Определение типа свойств компонента Icon
interface IconProps {
  name: keyof typeof LucideIcons;
  fallback?: keyof typeof LucideIcons;
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
  onClick?: () => void;
}

// Компонент-обертка для иконок Lucide
const Icon: FC<IconProps> = ({
  name,
  fallback = "CircleAlert",
  size = 24,
  className = "",
  color,
  strokeWidth = 2,
  onClick,
}) => {
  // Проверяем, существует ли иконка с указанным именем
  const IconComponent = LucideIcons[name] || LucideIcons[fallback];

  return (
    <IconComponent
      size={size}
      className={className}
      color={color}
      strokeWidth={strokeWidth}
      onClick={onClick}
    />
  );
};

export default Icon;
