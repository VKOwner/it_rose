// Позволяет сгенерировать моканные данные
// Используется в файле mockData.js
const generateData = (count) => {
  const data = [];
  const userTypes = ["user", "admin", "guest"];
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  for (let i = 0; i < count; i++) {
    const userIndex = userTypes[Math.floor(Math.random() * userTypes.length)];
    const ratingIndex = Math.floor(Math.random() * ratings.length);
    const disabled = Math.random() < 0.5;
    const foo = generateRandomString(3);
    const descr = generateRandomString(10);

    const user = {
      user: `${userIndex}@mail.com`,
      rating: ratings[ratingIndex],
      disabled,
      foo,
      descr,
    };

    data.push(user);
  }
  return data;
};

// Генерирует строку указанной длинны
const generateRandomString = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz ";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};
