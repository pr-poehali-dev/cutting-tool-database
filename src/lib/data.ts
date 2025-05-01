
export interface Tool {
  id: string;
  name: string;
  type: string;
  diameter: string;
  length: string;
  material: string;
  description: string;
  imageUrl: string;
}

// Имитация базы данных (в реальном приложении здесь был бы API)
const toolsData: Record<string, Tool> = {
  "1": {
    id: "1",
    name: "Фреза концевая",
    type: "Фреза",
    diameter: "10",
    length: "75",
    material: "Быстрорежущая сталь",
    description: "Высокоточная концевая фреза для обработки металлических поверхностей. Обеспечивает качественную чистовую обработку.",
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  "2": {
    id: "2",
    name: "Сверло спиральное",
    type: "Сверло",
    diameter: "8",
    length: "120",
    material: "Твердый сплав",
    description: "Спиральное сверло с твердосплавными напайками для сверления отверстий в металле.",
    imageUrl: "https://images.unsplash.com/photo-1591972676324-790c500b9f66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
};

let nextId = 3;

// Функции для работы с "базой данных"
export const getAllTools = (): Tool[] => {
  return Object.values(toolsData);
};

export const getTool = (id: string): Tool | null => {
  return toolsData[id] || null;
};

export const addTool = (tool: Omit<Tool, "id">): Tool => {
  const id = String(nextId++);
  const newTool = { ...tool, id };
  toolsData[id] = newTool;
  return newTool;
};

export const deleteTool = (id: string): boolean => {
  if (toolsData[id]) {
    delete toolsData[id];
    return true;
  }
  return false;
};
