
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { getTool, deleteTool, getAllCategories, Category } from "@/lib/data";

const ToolDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tool, setTool] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    const loadToolAndCategories = () => {
      if (id) {
        const fetchedTool = getTool(id);
        setTool(fetchedTool);
        
        const allCategories = getAllCategories();
        setCategories(allCategories);
      }
      setLoading(false);
    };
    
    loadToolAndCategories();
  }, [id]);
  
  const handleDelete = () => {
    if (!tool) return;
    
    if (window.confirm(`Вы уверены, что хотите удалить инструмент "${tool.name}"?`)) {
      const success = deleteTool(tool.id);
      if (success) {
        toast({
          title: "Инструмент удален",
          description: "Инструмент успешно удален из базы данных",
        });
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Не удалось удалить инструмент",
        });
      }
    }
  };

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return "Без категории";
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : "Неизвестная категория";
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="animate-spin mx-auto text-blue-600 mb-4" size={36} />
          <p className="text-gray-500">Загрузка информации об инструменте...</p>
        </div>
      </div>
    );
  }
  
  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <Icon name="AlertCircle" className="mx-auto text-orange-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-2">Инструмент не найден</h2>
            <p className="text-gray-600 mb-4">Запрашиваемый инструмент не существует или был удален</p>
            <Link to="/">
              <Button>Вернуться к списку</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm">
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              К списку
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
          <Badge className="ml-3" variant="outline">
            {getCategoryName(tool.categoryId)}
          </Badge>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                  <Icon 
                    name={tool.type.toLowerCase().includes('фреза') ? "CircleOff" : 
                          tool.type.toLowerCase().includes('сверло') ? "BarChartHorizontalBig" : "Tool"} 
                    className="mr-3 text-blue-600" 
                    size={24} 
                  />
                  {tool.name}
                </h2>
                <p className="text-sm text-gray-500">
                  ID: {tool.id}
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Тип инструмента</h3>
                  <p className="mt-1 text-lg text-gray-900">{tool.type}</p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Диаметр</h3>
                    <p className="mt-1 text-lg text-gray-900">{tool.diameter} мм</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Длина</h3>
                    <p className="mt-1 text-lg text-gray-900">{tool.length} мм</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Материал</h3>
                  <p className="mt-1 text-lg text-gray-900">{tool.material}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Категория</h3>
                  <p className="mt-1 text-lg text-gray-900">{getCategoryName(tool.categoryId)}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Описание</h3>
                  <p className="mt-1 text-base text-gray-900">{tool.description}</p>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button variant="destructive" onClick={handleDelete}>
                    <Icon name="Trash2" className="mr-2" size={16} />
                    Удалить инструмент
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-gray-50">
              <div className="h-full flex items-center justify-center p-6">
                {tool.imageUrl ? (
                  <img 
                    src={tool.imageUrl} 
                    alt={tool.name} 
                    className="max-w-full max-h-[500px] object-contain rounded-lg shadow-md"
                  />
                ) : (
                  <div className="text-center">
                    <Icon name="Image" className="mx-auto text-gray-300 mb-4" size={96} />
                    <p className="text-gray-500">Изображение отсутствует</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="outline">
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              Вернуться к списку инструментов
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ToolDetails;
