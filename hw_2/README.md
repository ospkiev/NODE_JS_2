# Node.js HTTP Server with Dynamic Router

A RESTful HTTP server built with Node.js featuring a dynamic router that automatically scans and dispatches routes based on the file system structure.

## Project Structure

```
hw_2/
├── routes/                    # Route handlers (required)
│   └── users/
│       ├── route.js          # GET /users, POST /users
│       └── [id].route.js     # GET, PUT, DELETE /users/:id
├── services/
│   └── users.service.js      # Business logic for user operations
├── lib/
│   └── router.js             # Scanner + dispatcher router
├── database.json             # JSON file database
├── index.js                  # Entry point, http.createServer
├── package.json
└── README.md
```

## Features

- **Dynamic Router**: Automatically scans the `routes/` directory and maps file paths to HTTP routes
- **File-based Routing**: Routes are defined by the file system structure
- **Dynamic Parameters**: Support for dynamic routes like `/users/:id` using `[id].route.js` files
- **JSON Database**: Simple file-based JSON storage
- **RESTful API**: Full CRUD operations for users

## Installation

1. Clone the repository
2. Navigate to the project directory: `cd hw_2`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

The server will start on `http://localhost:3000`

## API Endpoints

### Users

#### Get All Users
```http
GET /users
```

**Response:**
```json
[
  {
    "id": "1703123456789",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
]
```

#### Create User
```http
POST /users
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "age": 25
}
```

**Response:** `201 Created`
```json
{
  "id": "1703123456790",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "age": 25
}
```

#### Get User by ID
```http
GET /users/{id}
```

**Response:** `200 OK`
```json
{
  "id": "1703123456789",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "User Not Found"
}
```

#### Update User
```http
PUT /users/{id}
Content-Type: application/json

{
  "name": "Updated Name",
  "age": 31
}
```

**Response:** `200 OK`
```json
{
  "id": "1703123456789",
  "name": "Updated Name",
  "email": "john@example.com",
  "age": 31
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "User Not Found"
}
```

#### Delete User
```http
DELETE /users/{id}
```

**Response:** `204 No Content`

**Error Response:** `404 Not Found`
```json
{
  "error": "User Not Found"
}
```

## How to Make Requests

### Using cURL

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

## Router Architecture

The router automatically scans the `routes/` directory and creates route mappings:

- `routes/users/route.js` → `/users` (GET, POST)
- `routes/users/[id].route.js` → `/users/:id` (GET, PUT, DELETE)

The router supports both static and dynamic routes, with dynamic parameters extracted from the URL and passed to the route handlers.

## Development

- **Entry Point**: `index.js` creates the HTTP server and uses the router
- **Router**: `lib/router.js` handles route scanning and dispatching
- **Services**: `services/users.service.js` contains business logic
- **Routes**: Individual route files handle HTTP methods
- **Database**: `database.json` stores user data in JSON format

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `204` - No Content (for DELETE)
- `400` - Bad Request
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error
