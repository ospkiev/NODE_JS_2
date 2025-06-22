layers/
├── controller.js # Handles HTTP requests
├── service.js # Business logic layer
├── model.js # Data access layer
└── index.js # Server entry point

Як запустити програму!

ДЗ №2. Зробити клон репозиторію, перейти в папку hw_2, встановити пакети командою npm i.
Запустити програму командою - npm start, в консолі повинно відобразитись повідомлення -
[nodemon] starting `node index.js`
Listening on http://localhost:3000
В браузері на localhost: 3000 повинно відображатись - {"message":"Hello, Student Pavlo Karpenko!","поточний час"}
В застосунку Postman зробити POST запит до серверу:
а) Вибрати метод POST url- http://localhost:3000/users
б) В хедерс додати Content-Type- application/json
в) в баді вибрати raw/JSON, в поле тіла запиту передати будь-які дані в форматі JSON, натиснути Send, повинна прийти відповід код-статус 201, у тілі відповіді ті данні що відправлялись!
В консолі теж повинні відобразитись данні що передавались в запиті!
Теж саме з методами PUT, DELETE.
