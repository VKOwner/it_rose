Первое задание - папка first_task

Использование:
В глобальной области видимости браузера доступен метод convertAndCatch(), а так же аргумент для него из задания в переменной mockEntryFirstTask 
и объект с метриками jsonMetrics
Для простоты для консоли: convertAndCatch(mockEntryFirstTask, jsonMetrics);



Второе задание - папка second_task

Использование:
В глобальной области видимости браузера доступены методы filterSortingDataAndCatch() и filterSortingDataAndCatchDS().
В качестве аргументов доступны переменные: mockEntrySecondTask1, mockEntrySecondTask2, mockEntrySecondTask3.
Первые два - примеры из задачи, третий - кастомный полу-динамически генерируемый.
filterSortingDataAndCatch(mockEntrySecondTask1)
filterSortingDataAndCatch(mockEntrySecondTask2)
filterSortingDataAndCatch(mockEntrySecondTask3)
filterSortingDataAndCatchDS(mockEntrySecondTask3)
filterSortingDataAndCatchDS(mockEntrySecondTask3)
filterSortingDataAndCatchDS(mockEntrySecondTask3)

Примечание:
Выполнено две версии:
1. [second_task.js] Осуществляет сортировку по первому дескриптору переданному в массиве свойства sort_by, 
в примере это были ['email'], ['rating'], берется первый все остальные игнорируются.
Реализация основана на отсутствии в примере двух или более дескрипторов в sort_by.
2. [second_task_deep_sorting.js] Осуществляет глубокую сортировку по указанным в массиве дескрипторам. По порядку как они указаны. 
Важно, чтобы порядок следования дескрипторов совпадал с порядком следования свойств в сортируемых объектах.
Реализация основана на том факте, что в примерах дескриптор находится в массиве и что массив может указывать на наличие нескольких дескрипторов для сортировки.



Третье задание - папка third_task

Использование:
В глобальной области видимости браузера доступен метод searchUnknownPointAndCatch()