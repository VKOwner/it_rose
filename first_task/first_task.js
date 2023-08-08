const convertParams = (params = {}, metrics = {}) => {
  // Проверка на верность параметров функции
  if (typeof params !== "object" || Array.isArray(params) || !params) {
    throw new Error("Неверный формат параметров или отсутствует");
  }
  if (typeof metrics !== "object" || Array.isArray(metrics) || !metrics) {
    throw new Error("Неверный формат систем измерения или отсутствует");
  }

  // Проверка на наличие необходимых свойств объекта параметров
  if (!params.distance) throw new Error("Отсутствует {distance}");
  if (!params.distance?.unit) throw new Error("Отсутствует {unit}");
  if (!params.distance?.value) throw new Error("Отсутствует {value}");
  if (!params.convert_to) throw new Error("Отсутствует {convert_to}.");

  // Проверка на число для конвертируемого значения
  if (isNaN(parseInt(params.distance.value))) {
    throw new Error(`Значение для перевода не является числом: ${params.distance.value}`);
  }

  // Проверка на существование зависимостей
  const metricsItem = metrics[params.distance.unit];
  if (!metricsItem) {
    throw new Error(`Невозможно найти указанную метрическию систему: ${params.distance.unit}`);
  }

  const convertableMultiplier = metricsItem[params.convert_to];

  if (!convertableMultiplier) {
    throw new Error(`Невозможно найти множитель перевода для convert_to: ${params.convert_to}`);
  }

  // Возвращаем результат если все хорошо
  return {
    unit: params.convert_to,
    value: (params.distance.value * convertableMultiplier).toFixed(2),
  };
};

const convertAndCatch = (jsonConvertParams = {}, jsonMetrics = {}) => {
  // Проверяем на исключения
  try {
    const { unit, value } = convertParams(jsonConvertParams, jsonMetrics);

    return { unit, value };
  } catch (error) {
    return error;
  }
};
