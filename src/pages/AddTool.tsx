
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { ToolFormHeader } from "@/components/tools/ToolFormHeader";
import { ToolBasicInfoFields } from "@/components/tools/ToolBasicInfoFields";
import { ToolMediaFields } from "@/components/tools/ToolMediaFields";
import { ToolFormActions } from "@/components/tools/ToolFormActions";
import { toolFormSchema, ToolFormValues } from "@/lib/schemas/tool-schema";
import { addTool } from "@/lib/data";

const AddTool = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ToolFormValues>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: {
      name: "",
      type: "",
      diameter: "",
      length: "",
      material: "",
      description: "",
      imageUrl: ""
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setImagePreview(e.target.value);
      form.setValue("imageUrl", e.target.value);
    }
  };

  const onSubmit = async (values: ToolFormValues) => {
    try {
      setIsSubmitting(true);
      // В реальном приложении здесь был бы запрос к API
      console.log(values);
      addTool(values);
      // После успешного добавления перенаправляем на главную
      navigate("/");
    } catch (error) {
      console.error("Ошибка при сохранении инструмента:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToolFormHeader title="Добавление инструмента" />
      
      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <ToolBasicInfoFields control={form.control} />
              </div>
              
              <div>
                <ToolMediaFields 
                  control={form.control} 
                  imagePreview={imagePreview}
                  onImageChange={handleImageChange}
                />
              </div>
            </div>
            
            <ToolFormActions isSubmitting={isSubmitting} />
          </form>
        </Form>
      </main>
    </div>
  );
};

export default AddTool;
