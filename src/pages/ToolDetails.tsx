
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Заглушка с данными для примера (в реальном приложении это будет API запрос)
const toolsData = {
  "1": {
    id: "1",
    name: "Фреза концевая",
    type: "Фреза",
    diameter: "10",
    length: "75",
    material: "Быстрорежущая сталь",
    description: "Высокоточная концевая фреза для обработки металлических поверхностей. Обеспечивает качественную чистовую обработку. Подходит для фрезерования пазов и контуров.",
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  "2": {
    id: "2",
    name: "Сверло спиральное",
    type: "Сверло",
    diameter: "8",
    length: "120",
    material: "Твердый сплав",
    description: "Спиральное сверло с твердосплавными напайками для сверления отверстий в металле. Обеспечивает высокую точность и долгий срок службы.",
    imageUrl: "https://images.unsplash.com/photo-1591972676324-790c500b9f66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
};

const ToolDetails = () => {
  const { id } = useParams<{ id: string }>();
  const tool = id ? toolsData[id as keyof typeof toolsData] : null;
  
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
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={tool.imageUrl} 
                alt={tool.name} 
                className="w-full h-80 md:h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:w-1/2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{tool.name}</h2>
              
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
                  <h3 className="text-sm font-medium text-gray-500">Описание</h3>
                  <p className="mt-1 text-base text-gray-900">{tool.description}</p>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button variant="destructive">
                    <Icon name="Trash2" className="mr-2" size={16} />
                    Удалить инструмент
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ToolDetails;
