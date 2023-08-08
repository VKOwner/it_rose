// максимальный диапазон для x, y, z
const maxRange = 100;

// алфавит для валидации свойств (в объектах координат)
// а так же для возможного будущего масштабирования
const alphabet = "XYZABCDEFGHIJKLMNOPQRSTUVW";

// Генерируем произвольную точку r
// Для масштабируемого приложения нужно будет генерировать автоматически
// основываясь на алфавите XYZABCDEFGHIJKLMNOPQRSTUVW и количестве осей axisAmount;
let r = {
  x: Math.round(Math.random() * maxRange),
  y: Math.round(Math.random() * maxRange),
  z: Math.round(Math.random() * maxRange),
};

// Функция вычисления расстояния между точками
// Для масштабируемого приложения нужно будет генерировать автоматически
// Основываясь на алфавите XYZABCDEFGHIJKLMNOPQRSTUVW и количестве осей axisAmount;
const f = (s = {}) => {
  errors.validateNumEntries(r, "Для r невозможно высчитать дистанцию между точками", true);
  errors.validateNumEntries(s, "Для s невозможно высчитать дистанцию между точками", true);
  return Math.sqrt((s.x - r.x) ** 2 + (s.y - r.y) ** 2 + (s.z - r.z) ** 2);
};

// Функция поиска рандомной точки
const searchUnknownPoint = () => {
  const entryPointsArray = [];
  const vars = {
    minX: 0,
    minY: 0,
    minZ: 0,
    maxX: maxRange,
    maxY: maxRange,
    maxZ: maxRange,
  };
  let calls = 0;

  // Оставлен специально для нагладности при проверке
  console.log(r);

  // Выполняем бинарный поиск с помощью цикла while
  // выход будем определять через break, return и необходимые условия
  while (true) {
    // Определяем центральную точку от которой будет идти поиск на текущем шаге поиска и ее дистанцию до цели
    const point = createMidPoint(vars);
    const distance = f(point);

    //Делаем защиту от зацикленности, поскольку максимальным безопасным целым числом в js является 2**53 - 1
    //то количество шагов не превысит 53
    //протестировано на ренджах вплоть до Number.MAX_SAVE_INTEGER
    //на рендажах более 90000000 бывают исключения, для перекрытия этих случаев есть infinityLoop
    //на фикс потребуется больше времени, однако задача при рендже до 100 (да и гораздо больше) работает, как и требуется
    if (calls > 53) {
      throw new Error(errors.infinityLoop);
    }

    // Увеличивам счетчик вызовов на 1
    calls++;

    // Проверяем, вдруг мы угадали с первого раза и искомая точка состоит из координат середины диапазона
    if (!distance && calls) {
      return createResult([point], calls, point);
    }

    // Получаем всех возможных соседей опробуемой точки
    // Здесь и далее мы пытаемся понять в сторону каких трех граней нашего трехмерного куба нам идти
    const groupOfNeighboringPoints = getGroupOfNeighboringPoints(point);

    // Получаем дистанции от целевой точки до каждого соседа текущей центральной точки
    // и преобразуем в формат [[distance_number_1, neighboring_point_1], [distance_number_2 neighboring_point_2] etc.]
    const neighbourDistancies = groupOfNeighboringPoints.reduce((acc, item) => {
      return [...acc, [f(item), item]];
    }, []);

    // Вычисляем минимальную дистанцию до целевой точки
    // из дистанций каждой соседней точки текущего центрального положения диапазонов x, y, z
    const minimalNaighbourDistance = neighbourDistancies.reduce(
      (x, y) => Math.min(x, y[0]),
      maxRange
    );

    // Получаем координаты точки ближайшей к целевой точке
    const nearablePoint = neighbourDistancies.find(
      (item) => item[0] === minimalNaighbourDistance
    )[1];

    // Для каждого из x, y, z проверяем - в какую половину диапазона нужно двигаться и уменьшаем этот дипазон
    // меняя нижнюю или верхнюю границу
    if (nearablePoint.x >= point.x) {
      vars.minX = nearablePoint.x;
    } else {
      vars.maxX = nearablePoint.x;
    }

    if (nearablePoint.y >= point.y) {
      vars.minY = nearablePoint.y;
    } else {
      vars.maxY = nearablePoint.y;
    }

    if (nearablePoint.z >= point.z) {
      vars.minZ = nearablePoint.z;
    } else {
      vars.maxZ = nearablePoint.z;
    }

    // Если минимальная дистанция на каком-то шаге цикла становится равной нулю,
    // то выходим из функции и возвращаем результат, или же запоминаем точку,
    // которая была опробована на текущей итерации
    if (!minimalNaighbourDistance) {
      return createResult(entryPointsArray, calls, nearablePoint);
    } else {
      entryPointsArray.push(point);
    }
  }
};

// Функция вызова функции поиска целевой точки с отловом ошибок
const searchUnknownPointAndCatch = () => {
  try {
    return searchUnknownPoint();
  } catch (error) {
    return error;
  }
};
