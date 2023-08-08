const mockEntrySecondTask1 = {
  data: [
    { name: "John", email: "john2@mail.com" },
    { name: "John", email: "john1@mail.com" },
    { name: "Jane", email: "jane@mail.com" },
  ],
  condition: {
    include: [{ name: "John" }],
    sort_by: ["email"],
  },
};

const mockEntrySecondTask2 = {
  data: [
    { user: "mike@mail.com", rating: 20, disabled: false },
    { user: "greg@mail.com", rating: 14, disabled: false },
    { user: "john@mail.com", rating: 25, disabled: true },
  ],
  condition: {
    exclude: [{ disabled: true }],
    sort_by: ["rating"],
  },
};

const mockEntrySecondTask3 = {
  data: generateData(10000),
  condition: {
    include: [{ disabled: true }],
    exclude: [
      { user: "admin@mail.com" },
      { rating: 1 },
      { rating: 10 },
      { user: "guest@mail.com" },
    ],
    sort_by: ["user", "rating", "disabled", "foo", "descr"],
  },
};
