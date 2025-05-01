
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ToolFormActionsProps {
  isSubmitting?: boolean;
}

export const ToolFormActions = ({ isSubmitting = false }: ToolFormActionsProps) => {
  return (
    <div className="flex justify-end gap-3">
      <Link to="/">
        <Button variant="outline" type="button">Отмена</Button>
      </Link>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Сохранение..." : "Сохранить инструмент"}
      </Button>
    </div>
  );
};
