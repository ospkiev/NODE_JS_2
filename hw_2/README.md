# Node.js HTTP Server with Dynamic Router

## Project Structure

```
hw_2/
├── routes/                   
│   └── users/
│       ├── route.js          
│       └── [id].route.js     
├── services/
│   └── users.service.js      
├── lib/
│   └── router.js             
├── database.json             
├── index.js                  
├── package.json
└── README.md
```

## Installation

1.  Клонуйте або завантажуйте архів https://github.com/ospkiev/NODE_JS_2.git
2. Перейдіть в папку /hw_2
3. Встановити залежності: `npm install`
4. Запустити програми `npm start`

консолі повинно відобразитись повідомлення -
Server is running on http://localhost:3000
В застосунку Postman робити запити або через curl


#### Get all users:
```bash
curl http://localhost:3000/users
```

#### Get user by ID:
```bash
curl http://localhost:3000/users/1750588573546
```

#### Create a new user:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "New User", "email": "new@example.com", "age": 28}'
```

#### Update a user:
```bash
curl -X PUT http://localhost:3000/users/1750588573546 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'
```

#### Delete a user:
```bash
curl -X DELETE http://localhost:3000/users/1750588573546
```

### Using Postman

1. **GET all users:**
   - Method: `GET`
   - URL: `http://localhost:3000/users`

2. **GET user by ID:**
   - Method: `GET`
   - URL: `http://localhost:3000/users/{id}`

3. **POST create user:**
   - Method: `POST`
   - URL: `http://localhost:3000/users`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "name": "New User",
       "email": "new@example.com",
       "age": 28
     }
     ```

4. **PUT update user:**
   - Method: `PUT`
   - URL: `http://localhost:3000/users/{id}`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "name": "Updated Name"
     }
     ```

5. **DELETE user:**
   - Method: `DELETE`
   - URL: `http://localhost:3000/users/{id}`


