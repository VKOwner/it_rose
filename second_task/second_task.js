// Здесь представлен обычный вариант сортировки только по одному параметру sort_by

const isValidProperty = (array, property) => {
  return array.every((item) => item.hasOwnProperty(property[0]));
};

const filterData = (data, { include = [], exclude = [] }) => {
  return data.filter((item) => {
    const doInclude = include.every((include) => {
      return Object.entries(include).every(([key, value]) => {
        return item[key] === value;
      });
    });

    const doExclude = !exclude.some((exclude) => {
      return Object.entries(exclude).some(([key, value]) => {
        return item[key] === value;
      });
    });

    return doInclude && doExclude;
  });
};

const sortData = (data, property) => {
  if (!isValidProperty(data, property)) {
    throw new Error(`Свойство "${property}" не найдено в одном или более сортируемом обьекте`);
  }

  return data.toSorted((a, b) => {
    if (typeof a[property] === "string" || typeof b[property] === "string") {
      return a[property].toString().localeCompare(b[property].toString());
    } else {
      return a[property] - b[property];
    }
  });
};

const filterAndSortData = (entries) => {
  const { data, condition } = entries;

  if (!Object.keys(data)) throw new Error(`Data приходит пустой`);
  if (!Object.keys(condition)) throw new Error(`Не заданы параметры выборки и сортировки`);

  return { result: sortData(filterData(data, condition), condition.sort_by) };
};

const filterSortingDataAndCatch = (entries) => {
  try {
    return filterAndSortData(entries);
  } catch (error) {
    return error;
  }
};
