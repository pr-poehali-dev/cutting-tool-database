
export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Tool {
  id: string;
  name: string;
  type: string;
  diameter: string;
  length: string;
  material: string;
  description: string;
  imageUrl: string;
  categoryId?: string;
}

// Имитация базы данных (в реальном приложении здесь был бы API)
const categoriesData: Record<string, Category> = {
  "1": {
    id: "1",
    name: "Фрезы",
    description: "Фрезы для обработки металлических поверхностей"
  },
  "2": {
    id: "2",
    name: "Сверла",
    description: "Сверла для создания отверстий в различных материалах"
  },
  "3": {
    id: "3",
    name: "Резцы",
    description: "Резцы для токарной обработки"
  }
};

const toolsData: Record<string, Tool> = {
  "1": {
    id: "1",
    name: "Фреза концевая",
    type: "Фреза",
    diameter: "10",
    length: "75",
    material: "Быстрорежущая сталь",
    description: "Высокоточная концевая фреза для обработки металлических поверхностей. Обеспечивает качественную чистовую обработку.",
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categoryId: "1"
  },
  "2": {
    id: "2",
    name: "Сверло спиральное",
    type: "Сверло",
    diameter: "8",
    length: "120",
    material: "Твердый сплав",
    description: "Спиральное сверло с твердосплавными напайками для сверления отверстий в металле.",
    imageUrl: "https://images.unsplash.com/photo-1591972676324-790c500b9f66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categoryId: "2"
  }
};

let nextToolId = 3;
let nextCategoryId = 4;

// Функции для работы с инструментами
export const getAllTools = (): Tool[] => {
  return Object.values(toolsData);
};

export const getToolsByCategory = (categoryId: string): Tool[] => {
  return Object.values(toolsData).filter(tool => tool.categoryId === categoryId);
};

export const getTool = (id: string): Tool | null => {
  return toolsData[id] || null;
};

export const addTool = (tool: Omit<Tool, "id">): Tool => {
  const id = String(nextToolId++);
  const newTool = { ...tool, id };
  toolsData[id] = newTool;
  return newTool;
};

export const updateTool = (id: string, tool: Omit<Tool, "id">): Tool | null => {
  if (toolsData[id]) {
    const updatedTool = { ...tool, id };
    toolsData[id] = updatedTool;
    return updatedTool;
  }
  return null;
};

export const deleteTool = (id: string): boolean => {
  if (toolsData[id]) {
    delete toolsData[id];
    return true;
  }
  return false;
};

// Функции для работы с категориями
export const getAllCategories = (): Category[] => {
  return Object.values(categoriesData);
};

export const getCategory = (id: string): Category | null => {
  return categoriesData[id] || null;
};

export const addCategory = (category: Omit<Category, "id">): Category => {
  const id = String(nextCategoryId++);
  const newCategory = { ...category, id };
  categoriesData[id] = newCategory;
  return newCategory;
};

export const updateCategory = (id: string, category: Omit<Category, "id">): Category | null => {
  if (categoriesData[id]) {
    const updatedCategory = { ...category, id };
    categoriesData[id] = updatedCategory;
    return updatedCategory;
  }
  return null;
};

export const deleteCategory = (id: string): boolean => {
  if (categoriesData[id]) {
    // Проверяем, есть ли инструменты в этой категории
    const hasTools = Object.values(toolsData).some(tool => tool.categoryId === id);
    if (hasTools) {
      return false; // Нельзя удалить категорию с инструментами
    }
    
    delete categoriesData[id];
    return true;
  }
  return false;
};
