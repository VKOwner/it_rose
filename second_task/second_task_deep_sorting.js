// Это дополнительный функционал который мог подразумеваться, поскольку sort_by является массивом, а не строкой
// Под глубокой сортировкой подразумевается сортировка по нескольким свойствам указанным в sort_by
// Сейчас корректно работает только если порядок свойств соблюден как и в сортируемых объектах
// что странно, ведь порядок в объектах отсутствует как таковой.

const filterDataDS = (data, { include = [], exclude = [] }) => {
  return data.filter((item) => {
    const doInclude = include.every((include) => {
      return Object.entries(include).every(([key, value]) => {
        return item[key] === value;
      });
    });

    const doExclude = exclude.some((exclude) => {
      return Object.entries(exclude).some(([key, value]) => {
        return item[key] === value;
      });
    });

    return doInclude && !doExclude;
  });
};

const getPropertiesValidationDS = (array, properties) => {
  const notValidProperties = [];

  const validProperties = properties.filter((property) => {
    const result = array.every((item) => item.hasOwnProperty(property));

    if (!result) {
      notValidProperties.push(property);
    }
    return result;
  });

  return { validProperties, notValidProperties };
};

const deepSorting = (array, properties) => {
  if (!properties.length) {
    return array;
  }

  const { validProperties, notValidProperties } = getPropertiesValidationDS(array, properties);

  if (notValidProperties.length) {
    throw new Error(
      "Невозможно найти следующие свойства у некоторых сортируемых объектов: " +
        notValidProperties.join(", ")
    );
  }

  const sortedByFirstProp = sortFunctionDS(array, validProperties[0]);

  if (validProperties.length === 1) {
    return sortedByFirstProp;
  }

  let chunks = getChunksByProp(sortedByFirstProp, validProperties[0]);

  for (let i = 1; i < validProperties.length; i++) {
    const sortedArray = sortChunks(chunks, validProperties[i]).flat();
    chunks = getChunksByProp(sortedArray, validProperties[i]);
    if (i === validProperties.length - 1) {
      return chunks.flat();
    }
  }
};

const getChunksByProp = (array, property) => {
  let chunks = [];
  let startIndex = 0;
  const lastIndex = array.length - 1;

  for (let i = 1; i < array.length; i++) {
    if (array[i][property] === array[i - 1][property]) {
      if (i === lastIndex) {
        if (startIndex) {
          chunks.push(array.slice(startIndex, lastIndex + 1));
        } else {
          return [array];
        }
      }
    } else {
      chunks.push(array.slice(startIndex, i));
      startIndex = i;
      if (i === lastIndex) {
        chunks.push(array.slice(startIndex, i + 1));
      }
    }
  }

  return chunks;
};

const sortChunks = (array, property) => {
  const sortedChunks = [];

  for (const chunk of array) {
    sortedChunks.push(sortFunctionDS(chunk, property));
  }

  return sortedChunks;
};

const sortFunctionDS = (array, property) => {
  return array.toSorted((a, b) => {
    if (typeof a[property] === "string" || typeof b[property] === "string") {
      return a[property].toString().localeCompare(b[property].toString());
    } else {
      return a[property] - b[property];
    }
  });
};

const filterAndSortDataDS = (entries) => {
  const { data, condition } = entries;

  if (!Object.keys(data)) throw new Error("Data приходит пустой");
  if (!Object.keys(condition)) throw new Error("Не заданы параметры выборки и сортировки");

  const sortedData = deepSorting(data, condition.sort_by);
  const result = filterDataDS(sortedData, condition);

  return { result };
};

const filterSortingDataAndCatchDS = (entries) => {
  try {
    return filterAndSortDataDS(entries);
  } catch (error) {
    return error;
  }
};
