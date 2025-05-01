
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAllTools, deleteTool, Tool } from "@/lib/data";

const Index = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);

  useEffect(() => {
    // Загрузка инструментов при монтировании
    const loadTools = () => {
      const allTools = getAllTools();
      setTools(allTools);
      setFilteredTools(allTools);
    };
    
    loadTools();
  }, []);

  useEffect(() => {
    // Фильтрация инструментов при изменении поискового запроса
    if (searchQuery.trim() === "") {
      setFilteredTools(tools);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = tools.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.type.toLowerCase().includes(query) ||
        tool.material.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
      );
      setFilteredTools(filtered);
    }
  }, [searchQuery, tools]);

  const handleDelete = (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот инструмент?")) {
      const success = deleteTool(id);
      if (success) {
        setTools(tools.filter(tool => tool.id !== id));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">База режущего инструмента</h1>
          <Link to="/add-tool">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Plus" className="mr-2" size={16} />
              Добавить инструмент
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center max-w-md">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" className="text-gray-400" size={18} />
              </div>
              <Input
                type="text"
                placeholder="Поиск инструмента..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2" 
                onClick={() => setSearchQuery("")}
              >
                <Icon name="X" size={16} />
              </Button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-500">
              {filteredTools.length === 0 
                ? "Инструменты не найдены" 
                : `Найдено: ${filteredTools.length}`}
            </p>
          )}
        </div>

        {filteredTools.length === 0 && searchQuery ? (
          <div className="text-center py-12">
            <Icon name="Search" className="mx-auto text-gray-400" size={48} />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Инструменты не найдены</h3>
            <p className="mt-1 text-sm text-gray-500">
              Попробуйте изменить параметры поиска или добавить новый инструмент
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <img 
                    src={tool.imageUrl} 
                    alt={tool.name} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{tool.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Диаметр: {tool.diameter} мм, Длина: {tool.length} мм
                    </p>
                    <div className="flex justify-between mt-4">
                      <Link to={`/tool/${tool.id}`}>
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" className="mr-1" size={14} />
                          Детали
                        </Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(tool.id)}
                      >
                        <Icon name="Trash2" className="mr-1" size={14} />
                        Удалить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
