
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { getAllCategories, addCategory, deleteCategory, Category } from "@/lib/data";
import { categoryFormSchema, CategoryFormValues } from "@/lib/schemas/tool-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const navigate = useNavigate();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: ""
    },
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const allCategories = getAllCategories();
    setCategories(allCategories);
  };

  const handleAddCategory = (data: CategoryFormValues) => {
    try {
      const newCategory = addCategory(data);
      setCategories([...categories, newCategory]);
      toast({
        title: "Категория добавлена",
        description: `Категория '${newCategory.name}' успешно добавлена`,
      });
      setIsAddDialogOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось добавить категорию",
      });
    }
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить категорию '${name}'?`)) {
      const success = deleteCategory(id);
      if (success) {
        setCategories(categories.filter(category => category.id !== id));
        toast({
          title: "Категория удалена",
          description: `Категория '${name}' успешно удалена`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Не удалось удалить категорию",
          description: "Возможно, в категории есть инструменты. Сначала удалите все инструменты из категории.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Категории инструментов</h1>
          <div className="flex space-x-4">
            <Link to="/">
              <Button variant="outline">
                <Icon name="ArrowLeft" className="mr-2" size={16} />
                К списку инструментов
              </Button>
            </Link>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Plus" className="mr-2" size={16} />
                  Добавить категорию
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить новую категорию</DialogTitle>
                  <DialogDescription>
                    Заполните информацию о новой категории инструментов.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddCategory)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Название категории</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите название категории" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Описание (необязательно)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Введите описание категории" 
                              {...field} 
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Отмена
                      </Button>
                      <Button type="submit">Добавить</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Folder" className="mx-auto text-gray-400" size={48} />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Категории не найдены</h3>
            <p className="mt-1 text-sm text-gray-500">
              Начните с добавления новой категории инструментов
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  {category.description && (
                    <CardDescription>{category.description}</CardDescription>
                  )}
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/?category=${category.id}`)}
                  >
                    <Icon name="List" className="mr-1" size={14} />
                    Показать инструменты
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id, category.name)}
                  >
                    <Icon name="Trash2" className="mr-1" size={14} />
                    Удалить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Categories;
