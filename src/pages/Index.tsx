
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <img 
                src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Фреза концевая" 
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium">Фреза концевая</h3>
                <p className="text-sm text-gray-600 mt-1">Диаметр: 10 мм, Длина: 75 мм</p>
                <div className="flex justify-between mt-4">
                  <Link to="/tool/1">
                    <Button variant="outline" size="sm">
                      <Icon name="Eye" className="mr-1" size={14} />
                      Детали
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm">
                    <Icon name="Trash2" className="mr-1" size={14} />
                    Удалить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <img 
                src="https://images.unsplash.com/photo-1591972676324-790c500b9f66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Сверло спиральное" 
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium">Сверло спиральное</h3>
                <p className="text-sm text-gray-600 mt-1">Диаметр: 8 мм, Длина: 120 мм</p>
                <div className="flex justify-between mt-4">
                  <Link to="/tool/2">
                    <Button variant="outline" size="sm">
                      <Icon name="Eye" className="mr-1" size={14} />
                      Детали
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm">
                    <Icon name="Trash2" className="mr-1" size={14} />
                    Удалить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
