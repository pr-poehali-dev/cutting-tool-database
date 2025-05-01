
import { z } from "zod";

// Схема для формы инструмента
export const toolFormSchema = z.object({
  name: z.string().min(2, { message: "Название должно содержать не менее 2 символов" }),
  type: z.string().min(2, { message: "Тип должен содержать не менее 2 символов" }),
  diameter: z.string().min(1, { message: "Укажите диаметр" }),
  length: z.string().min(1, { message: "Укажите длину" }),
  material: z.string().min(2, { message: "Укажите материал" }),
  description: z.string().min(10, { message: "Описание должно содержать не менее 10 символов" }),
  imageUrl: z.string().url({ message: "Введите корректный URL изображения" }),
  categoryId: z.string().optional()
});

// Тип для значений формы инструмента
export type ToolFormValues = z.infer<typeof toolFormSchema>;

// Схема для формы категории
export const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Название должно содержать не менее 2 символов" }),
  description: z.string().optional()
});

// Тип для значений формы категории
export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
