
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ToolFormValues } from "@/lib/schemas/tool-schema";

interface ToolBasicInfoFieldsProps {
  control: Control<ToolFormValues>;
}

export const ToolBasicInfoFields = ({ control }: ToolBasicInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Название инструмента</FormLabel>
            <FormControl>
              <Input placeholder="Фреза концевая" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel>Тип инструмента</FormLabel>
            <FormControl>
              <Input placeholder="Фреза" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <FormField
          control={control}
          name="diameter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Диаметр (мм)</FormLabel>
              <FormControl>
                <Input placeholder="10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="length"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Длина (мм)</FormLabel>
              <FormControl>
                <Input placeholder="75" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="material"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel>Материал</FormLabel>
            <FormControl>
              <Input placeholder="Быстрорежущая сталь" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
