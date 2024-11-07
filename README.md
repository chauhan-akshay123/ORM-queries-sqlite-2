# Post Management API

This is a simple Express-based API for managing posts, allowing you to seed the database with initial data, fetch all posts, get posts by specific criteria, and sort posts by name. This API uses Sequelize as the ORM and a SQLite database for data storage.

## Features

- Seed the database with initial posts
- Fetch all posts
- Fetch post details by post ID
- Fetch all posts by a specific author
- Sort posts by name in ascending or descending order

## Prerequisites

- Node.js and npm installed on your system
- SQLite or any SQL-compatible database (modify Sequelize configuration for other databases)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/post-management-api.git
   cd post-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Sequelize configuration:
   Ensure `sequelize` is configured properly in the `lib/index.js` file to connect to your preferred database. By default, SQLite is used.

4. Start the server:
   ```bash
   node app.js
   ```

   The server will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### 1. Seed the Database

- **URL**: `/seed_db`
- **Method**: `GET`
- **Description**: Seeds the database with initial post data.
- **Response**:
  - `200 OK`: `{"message": "Database seeding successful."}`
  - `500 Internal Server Error`: `{"message": "Error seeding the database", "error": "error message"}`

### 2. Fetch All Posts

- **URL**: `/posts`
- **Method**: `GET`
- **Description**: Fetches all posts in the database.
- **Response**:
  - `200 OK`: `{ "posts": [ ... ] }`
  - `404 Not Found`: `{"message": "No posts found."}`
  - `500 Internal Server Error`: `{"message": "Error fetching the posts", "error": "error message"}`

### 3. Fetch Post by ID

- **URL**: `/posts/details/:id`
- **Method**: `GET`
- **Description**: Fetches a specific post by its ID.
- **Response**:
  - `200 OK`: `{ "post": { ... } }`
  - `404 Not Found`: `{"error": "Post not found."}`
  - `500 Internal Server Error`: `{"message": "Error fetching the post by ID", "error": "error message"}`

### 4. Fetch Posts by Author

- **URL**: `/posts/author/:author`
- **Method**: `GET`
- **Description**: Fetches all posts by a specific author.
- **Response**:
  - `200 OK`: `{ "posts": [ ... ] }`
  - `404 Not Found`: `{"message": "Posts not found."}`
  - `500 Internal Server Error`: `{"message": "Error fetching post by author", "error": "error message"}`

### 5. Sort Posts by Name

- **URL**: `/posts/sort/name`
- **Method**: `GET`
- **Description**: Sorts posts by their name in ascending or descending order.
- **Query Parameter**: `order` (values: `ASC` for ascending, `DESC` for descending)
- **Response**:
  - `200 OK`: `{ "posts": [ ... ] }`
  - `404 Not Found`: `{"message": "No post found."}`
  - `500 Internal Server Error`: `{"message": "Error sorting the posts", "error": "error message"}`

## Example Usage

1. **Seed the Database**
   ```bash
   curl http://localhost:3000/seed_db
   ```

2. **Fetch All Posts**
   ```bash
   curl http://localhost:3000/posts
   ```

3. **Fetch Post by ID**
   ```bash
   curl http://localhost:3000/posts/details/1
   ```

4. **Fetch Posts by Author**
   ```bash
   curl http://localhost:3000/posts/author/Author1
   ```

5. **Sort Posts by Name (Descending)**
   ```bash
   curl "http://localhost:3000/posts/sort/name?order=DESC"
   ```

## Technologies Used

- **Express** - For building the API
- **Sequelize** - ORM for managing the database
- **SQLite** - Default database (can be configured for other databases)
- **Cors** - Enables cross-origin requests
