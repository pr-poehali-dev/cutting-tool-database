
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

export interface Category {
  id: string;
  name: string;
  description?: string;
}

// Имитация базы данных категорий (в реальном приложении здесь был бы API)
let categoriesData: Record<string, Category> = {
  "1": {
    id: "1",
    name: "Фрезы",
    description: "Различные виды фрез для металлообработки"
  },
  "2": {
    id: "2",
    name: "Сверла",
    description: "Сверла для различных материалов"
  },
  "3": {
    id: "3",
    name: "Резцы",
    description: "Токарные резцы и держатели"
  }
};

// Имитация базы данных инструментов (в реальном приложении здесь был бы API)
let toolsData: Record<string, Tool> = {
  "1": {
    id: "1",
    name: "Фреза концевая",
    type: "Фреза",
    diameter: "10",
    length: "75",
    material: "Быстрорежущая сталь",
    description: "Высокоточная концевая фреза для обработки металлических поверхностей. Обеспечивает качественную чистовую обработку. Подходит для фрезерования пазов и контуров.",
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
    description: "Спиральное сверло с твердосплавными напайками для сверления отверстий в металле. Обеспечивает высокую точность и долгий срок службы.",
    imageUrl: "https://images.unsplash.com/photo-1591972676324-790c500b9f66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categoryId: "2"
  },
  "3": {
    id: "3",
    name: "Резец проходной",
    type: "Резец",
    diameter: "16",
    length: "100",
    material: "Твердый сплав Т15К6",
    description: "Токарный проходной резец для обработки внешних поверхностей деталей из стали и чугуна. Обеспечивает высокое качество обработки.",
    imageUrl: "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    categoryId: "3"
  }
};

let nextToolId = 4;
let nextCategoryId = 4;

// Функции для работы с "базой данных" инструментов
export const getAllTools = (): Tool[] => {
  return Object.values(toolsData);
};

export const getTool = (id: string): Tool | null => {
  return toolsData[id] || null;
};

export const getToolsByCategory = (categoryId: string): Tool[] => {
  return Object.values(toolsData).filter(tool => tool.categoryId === categoryId);
};

export const addTool = (tool: Omit<Tool, "id">): Tool => {
  const id = String(nextToolId++);
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

// Функции для работы с "базой данных" категорий
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

export const deleteCategory = (id: string): boolean => {
  // Проверяем, есть ли инструменты в этой категории
  const toolsInCategory = Object.values(toolsData).some(tool => tool.categoryId === id);
  
  // Если есть инструменты в категории, то не удаляем её
  if (toolsInCategory) {
    return false;
  }
  
  if (categoriesData[id]) {
    delete categoriesData[id];
    return true;
  }
  
  return false;
};
