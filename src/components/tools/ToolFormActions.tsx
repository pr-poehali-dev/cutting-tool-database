
import { Button } from "@/components/ui/button";

interface ToolFormActionsProps {
  isSubmitting?: boolean;
  onCancel?: () => void;
}

const ToolFormActions = ({ isSubmitting = false, onCancel }: ToolFormActionsProps) => {
  return (
    <div className="flex justify-end gap-3">
      <Button 
        variant="outline" 
        type="button" 
        onClick={onCancel}
      >
        Отмена
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Сохранение..." : "Сохранить инструмент"}
      </Button>
    </div>
  );
};

export default ToolFormActions;
