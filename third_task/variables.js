// Список ошибок и методы для удобства
const errors = {
  nan: "{target}, один или более входных параметров не являются числом",
  type: "Невозможно продолжить: entries не является объеком",
  empty: "Невозможно продолжить: entries не имеет свойств",
  keys: "В объекте координат есть невалидные ключи",
  infinityLoop: "Непредвиденная ситуация, невозможно высчитать целевую точку",

  validateNumEntries(entries, errorText, isCoordinates) {
    if (typeof entries !== "object" || Array.isArray(entries)) {
      throw new Error(this.type);
    }

    const entryValues = Object.values(entries);
    if (!entryValues.length) {
      throw new Error(this.empty);
    }

    const isValidNums = entryValues.every((entry) => !isNaN(entry));
    if (!isValidNums) throw new Error(this.replacer(this.nan, errorText));

    if (isCoordinates) {
      // Можно было сделать просто поиск ключа подстрокой в строке, но будет фейл если ключ будет xy или ab например
      const entryKeys = Object.keys(entries);
      const alphabetKeys = alphabet.toLowerCase().split("");
      const isValidKeys = entryKeys.every((key) => alphabetKeys.includes(key));
      if (!isValidKeys) {
        throw new Error(this.keys);
      }
    }
  },

  replacer(template, errorText) {
    return template.replace("{target}", errorText);
  },
};
