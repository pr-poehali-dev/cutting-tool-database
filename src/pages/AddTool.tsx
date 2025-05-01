
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import ToolFormHeader from "@/components/tools/ToolFormHeader";
import ToolBasicInfoFields from "@/components/tools/ToolBasicInfoFields";
import ToolMediaFields from "@/components/tools/ToolMediaFields";
import ToolFormActions from "@/components/tools/ToolFormActions";
import { toolFormSchema, ToolFormValues } from "@/lib/schemas/tool-schema";
import { addTool, getAllCategories, Category } from "@/lib/data";

const AddTool = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<ToolFormValues>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: {
      name: "",
      type: "",
      diameter: "",
      length: "",
      material: "",
      description: "",
      imageUrl: "",
      categoryId: undefined
    },
  });

  useEffect(() => {
    // Загрузить категории при монтировании компонента
    const loadCategories = () => {
      const allCategories = getAllCategories();
      setCategories(allCategories);
    };
    
    loadCategories();
  }, []);

  const onSubmit = async (data: ToolFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Здесь была бы логика отправки на сервер в реальном приложении
      const newTool = addTool(data);
      
      toast({
        title: "Инструмент добавлен",
        description: "Инструмент успешно добавлен в базу данных",
      });
      
      // Перенаправление на главную страницу
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось добавить инструмент. Попробуйте еще раз.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-6">
            <ToolFormHeader 
              title="Добавление нового инструмента" 
              description="Заполните информацию о новом режущем инструменте, который вы хотите добавить в базу данных."
            />
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
                <ToolBasicInfoFields form={form} categories={categories} />
                <ToolMediaFields form={form} />
                <ToolFormActions 
                  isSubmitting={isSubmitting} 
                  onCancel={() => navigate("/")}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddTool;
