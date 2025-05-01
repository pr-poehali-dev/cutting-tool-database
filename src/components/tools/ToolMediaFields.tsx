
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { ToolFormValues } from "@/lib/schemas/tool-schema";

interface ToolMediaFieldsProps {
  control: Control<ToolFormValues>;
  imagePreview: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToolMediaFields = ({ control, imagePreview, onImageChange }: ToolMediaFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ссылка на изображение</FormLabel>
            <FormControl>
              <Input 
                placeholder="https://example.com/image.jpg" 
                onChange={onImageChange}
                value={field.value}
              />
            </FormControl>
            <FormDescription>
              Укажите URL-адрес изображения
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
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </div>
      )}
      
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel>Описание</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Детальное описание инструмента..." 
                className="h-32"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
