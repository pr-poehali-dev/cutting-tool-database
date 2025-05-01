
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Название должно быть не менее 2 символов" }),
  type: z.string().min(2, { message: "Укажите тип инструмента" }),
  diameter: z.string().min(1, { message: "Укажите диаметр" }),
  length: z.string().min(1, { message: "Укажите длину" }),
  material: z.string().min(2, { message: "Укажите материал" }),
  description: z.string().optional(),
  imageUrl: z.string().optional()
});

const AddTool = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // В реальном приложении здесь был бы запрос к API
    console.log(values);
    // После успешного добавления перенаправляем на главную
    navigate("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setImagePreview(e.target.value);
      form.setValue("imageUrl", e.target.value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm">
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              Назад
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Добавление инструмента</h1>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                  control={form.control}
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
              </div>
              
              <div>
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
                      onError={() => setImagePreview("")} 
                    />
                  </div>
                )}
                
                <FormField
                  control={form.control}
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
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Link to="/">
                <Button variant="outline" type="button">Отмена</Button>
              </Link>
              <Button type="submit">Сохранить инструмент</Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default AddTool;
