
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { getAllTools, deleteTool, Tool, getAllCategories, Category, getToolsByCategory } from "@/lib/data";

const Index = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Загрузка категорий и инструментов при монтировании
    const loadCategoriesAndTools = () => {
      const allCategories = getAllCategories();
      setCategories(allCategories);
      
      // Проверяем параметры URL для выбора категории
      const params = new URLSearchParams(location.search);
      const categoryParam = params.get('category');
      
      if (categoryParam) {
        setSelectedCategory(categoryParam);
        const toolsInCategory = getToolsByCategory(categoryParam);
        setTools(toolsInCategory);
        setFilteredTools(toolsInCategory);
      } else {
        const allTools = getAllTools();
        setTools(allTools);
        setFilteredTools(allTools);
      }
    };
    
    loadCategoriesAndTools();
  }, [location.search]);

  useEffect(() => {
    // Фильтрация инструментов при изменении поискового запроса
    applyFilters();
  }, [searchQuery, selectedCategory, tools]);

  const applyFilters = () => {
    let filtered = tools;
    
    // Применяем поисковый запрос
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.type.toLowerCase().includes(query) ||
        tool.material.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredTools(filtered);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      const allTools = getAllTools();
      setTools(allTools);
    } else {
      const toolsInCategory = getToolsByCategory(categoryId);
      setTools(toolsInCategory);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот инструмент?")) {
      const success = deleteTool(id);
      if (success) {
        setTools(tools.filter(tool => tool.id !== id));
      }
    }
  };

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return "Без категории";
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : "Неизвестная категория";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">База режущего инструмента</h1>
          <div className="flex space-x-4">
            <Link to="/categories">
              <Button variant="outline">
                <Icon name="FolderOpen" className="mr-2" size={16} />
                Категории
              </Button>
            </Link>
            <Link to="/add-tool">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить инструмент
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-full md:w-1/2">
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
          
          <div className="w-full md:w-1/2 md:ml-4">
            <Select 
              value={selectedCategory || "all"} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="max-w-md">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Search" className="mx-auto text-gray-400" size={48} />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Инструменты не найдены</h3>
            <p className="mt-1 text-sm text-gray-500">
              Попробуйте изменить параметры поиска или добавить новый инструмент
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Icon 
                          name={tool.type.toLowerCase().includes('фреза') ? "CircleOff" : 
                                tool.type.toLowerCase().includes('сверло') ? "BarChartHorizontalBig" : "Tool"} 
                          className="mr-3 text-blue-600" 
                          size={24} 
                        />
                        <h3 className="text-lg font-medium">{tool.name}</h3>
                        <Badge className="ml-2" variant="outline">
                          {getCategoryName(tool.categoryId)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-2 text-sm text-gray-600">
                        <div><span className="font-semibold">Тип:</span> {tool.type}</div>
                        <div><span className="font-semibold">Материал:</span> {tool.material}</div>
                        <div><span className="font-semibold">Диаметр:</span> {tool.diameter} мм</div>
                        <div><span className="font-semibold">Длина:</span> {tool.length} мм</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
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
