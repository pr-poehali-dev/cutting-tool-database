
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ToolFormHeaderProps {
  title: string;
  description?: string;
}

const ToolFormHeader = ({ title, description }: ToolFormHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <Link to="/" className="mr-4">
          <Button variant="ghost" size="sm">
            <Icon name="ArrowLeft" className="mr-2" size={16} />
            Назад
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default ToolFormHeader;
