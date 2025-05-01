
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ToolFormHeaderProps {
  title: string;
}

export const ToolFormHeader = ({ title }: ToolFormHeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
        <Link to="/" className="mr-4">
          <Button variant="ghost" size="sm">
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            Назад
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
    </header>
  );
};
