## CLI-застосунок для керування звичками на Node.js.

## 📁 Структура проєкту

hw_1/
├── controllers/ # Обробники команд
│ └── habits.controller.js
├── models/ # Робота з файлом database.json
│ └── habits.model.js
├── router/ # Роутер команд
│ └── router.js
├── services/ # Бізнес-логіка
│ └── habits.service.js
├── database.json # JSON-файл для збереження звичок
├── index.js # Точка входу
├── .env # Змінні середовища
├── eslint.config.js # Конфіг ESLint
├── package.json

---

## Як запустити

1. Клонуйте або завантажуйте архів https://github.com/ospkiev/NODE_JS_2.git
2. Перейдіть в папку /hw_1
3. Встановити залежності:

```bash
npm install
```

Команди
node index.js add --name "Читати книгу"\
node index.js list\
node index.js done --id <id> (конкретне id можно знайти у елемента в файлі database.json !!!)\
node index.js delete --id <id>\
node index.js update --id <id> --name "Нова назва"\
node index.js stats

Після виконання команд, дані будуть збережені у файлі database.json.

Файл .env змінні середовища.

Запуск ESLint:
npm run lint

## Це пункт не виконано, не зрозумів як його зробити!

Використайте Змінні середовища для задання зміщення часу у днях(none/0 => сьогодні, 1 => завтра, 2=> післязавтра, etc), для перевірки роботи додатку.
