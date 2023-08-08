// Функция создания объекта с высчитаными серединами указанных диапазонов для каждой из оси
// Для масштабируемого приложения нужно будет генерировать автоматически
const createMidPoint = (rangeValues = {}) => {
  errors.validateNumEntries(rangeValues, "Невозможно посчитать середину диапазонов");
  const x = Math.floor((rangeValues.minX + rangeValues.maxX) / 2);
  const y = Math.floor((rangeValues.minY + rangeValues.maxY) / 2);
  const z = Math.floor((rangeValues.minZ + rangeValues.maxZ) / 2);
  return { x, y, z };
};

// Функция создания объекта результата
const createResult = (entryPointsArray = [], calls = 0, randomPoint = {}) => {
  return {
    random_point: randomPoint,
    search_points: entryPointsArray,
    calls,
  };
};

// Функция возвращает всех возможных ближайших соседей центральной точки
// Поскольку задача масштабируемости не стояла, то я решил указать варианты для трех осей в лоб, по времени
// это быстрее, не нужно генерировать, по памяти одинаково
const getGroupOfNeighboringPoints = ({ x, y, z } = {}) => {
  errors.validateNumEntries({ x, y, z }, "Невозможно получить координаты соседей", true);

  return [
    { x, y, z: z - 1 },
    { x, y, z: z + 1 },
    { x, y: y - 1, z },
    { x, y: y - 1, z: z - 1 },
    { x, y: y - 1, z: z + 1 },
    { x, y: y + 1, z },
    { x, y: y + 1, z: z - 1 },
    { x, y: y + 1, z: z + 1 },
    { x: x - 1, y, z },
    { x: x - 1, y, z: z - 1 },
    { x: x - 1, y, z: z + 1 },
    { x: x - 1, y: y - 1, z },
    { x: x - 1, y: y - 1, z: z - 1 },
    { x: x - 1, y: y - 1, z: z + 1 },
    { x: x - 1, y: y + 1, z },
    { x: x - 1, y: y + 1, z: z - 1 },
    { x: x - 1, y: y + 1, z: z + 1 },
    { x: x + 1, y, z },
    { x: x + 1, y, z: z - 1 },
    { x: x + 1, y, z: z + 1 },
    { x: x + 1, y: y - 1, z },
    { x: x + 1, y: y - 1, z: z - 1 },
    { x: x + 1, y: y - 1, z: z + 1 },
    { x: x + 1, y: y + 1, z },
    { x: x + 1, y: y + 1, z: z - 1 },
    { x: x + 1, y: y + 1, z: z + 1 },
  ];
};
