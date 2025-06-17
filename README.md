# Node Users Service

This project is a simple HTTP server built with Node.js. It exposes REST endpoints to manage users stored in a small JSON file. All source code lives in the `hw_1` directory.

## Prerequisites

- **Node.js** (version 18 or higher is recommended). You can download it from [nodejs.org](https://nodejs.org/).

## Installation

1. Navigate to the project directory and install dependencies:

   ```bash
   cd hw_1
   npm install
   ```

2. (Optional) Set the `PORT` environment variable if you want the server to listen on a port other than `3000`.

## Running the server

Start the HTTP server with:

```bash
npm start
```

The server will start on `http://localhost:<PORT>` where `<PORT>` defaults to `3000` if the `PORT` environment variable is not specified.

## Users API

The API exposes a single `/users` resource.

### List users

```
GET /users
```

Returns an array of users.

### Get a user

```
GET /users/{id}
```

Returns a single user object or `404` if the user does not exist.

### Create a user

```
POST /users
Content-Type: application/json

{
  "name": "Bob"
}
```

Returns the created user (with generated `id`).

### Update a user

```
PATCH /users/{id}
Content-Type: application/json

{
  "name": "Bob Updated"
}
```

Returns the updated user object or `404` if not found.

### Delete a user

```
DELETE /users/{id}
```

Returns `204` on success or `404` if not found.

### Example user JSON

```json
{
  "id": "1749653783005",
  "name": "Alice"
}
```

Users are stored in `hw_1/database.json` in this format.

