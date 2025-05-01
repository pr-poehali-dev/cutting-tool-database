
import { z } from "zod";

export const toolFormSchema = z.object({
  name: z.string().min(2, { message: "Название должно быть не менее 2 символов" }),
  type: z.string().min(2, { message: "Укажите тип инструмента" }),
  diameter: z.string().min(1, { message: "Укажите диаметр" }),
  length: z.string().min(1, { message: "Укажите длину" }),
  material: z.string().min(2, { message: "Укажите материал" }),
  description: z.string().optional(),
  imageUrl: z.string().optional()
});

export type ToolFormValues = z.infer<typeof toolFormSchema>;
