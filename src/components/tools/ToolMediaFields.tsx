
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ToolFormValues } from "@/lib/schemas/tool-schema";

interface ToolMediaFieldsProps {
  form: UseFormReturn<ToolFormValues>;
}

const ToolMediaFields = ({ form }: ToolMediaFieldsProps) => {
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setImagePreview(value);
    form.setValue("imageUrl", value);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ссылка на изображение</FormLabel>
            <FormControl>
              <Input 
                placeholder="https://example.com/image.jpg" 
                onChange={handleImageChange}
                value={field.value || ""}
              />
            </FormControl>
            <FormDescription>
              URL-адрес изображения инструмента
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {imagePreview && (
        <div className="mt-2 border rounded-md overflow-hidden">
          <img 
            src={imagePreview} 
            alt="Предпросмотр" 
            className="w-full h-40 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              setImagePreview("");
            }} 
          />
        </div>
      )}
    </div>
  );
};

export default ToolMediaFields;
