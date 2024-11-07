# Blog Post API

This project is a simple RESTful API for managing blog posts using Node.js, Express, Sequelize, and SQLite. It provides endpoints for creating, retrieving, updating, and deleting blog posts and includes additional filtering options.

## Features

- **Database Seeding**: Populate the database with initial blog posts data.
- **CRUD Operations**: Create, Read, Update, Delete blog posts.
- **Filtering and Sorting**: Retrieve posts by author and sort posts by title.
- **Express**: Lightweight server for handling requests.
- **Sequelize**: ORM for managing database operations.
- **SQLite**: Lightweight database for storing blog posts.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- SQLite (if not using the in-memory SQLite setup in Sequelize)

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   node app.js
   ```
   Server runs on `http://localhost:3000`.

## API Endpoints

### Seed Database

- **URL**: `/seed_db`
- **Method**: `GET`
- **Description**: Clears and seeds the database with initial data.

### Retrieve All Posts

- **URL**: `/posts`
- **Method**: `GET`
- **Description**: Fetches all blog posts.
- **Response**: List of all posts.

### Retrieve Post by ID

- **URL**: `/posts/details/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific post by its ID.

### Retrieve Posts by Author

- **URL**: `/posts/author/:author`
- **Method**: `GET`
- **Description**: Fetches all posts by a specific author.

### Sort Posts by Title

- **URL**: `/posts/sort/name`
- **Method**: `GET`
- **Query Parameter**: `order` (asc or desc)
- **Description**: Sorts posts by title in ascending or descending order.

### Create a New Post

- **URL**: `/posts/new`
- **Method**: `POST`
- **Description**: Adds a new post to the database.
- **Body**:
  ```json
  {
    "newPost": {
      "title": "Post Title",
      "content": "Post content",
      "author": "Author Name"
    }
  }
  ```

### Update a Post

- **URL**: `/posts/update/:id`
- **Method**: `POST`
- **Description**: Updates a post by its ID.
- **Body**:
  ```json
  {
    "title": "Updated Title",
    "content": "Updated Content"
  }
  ```

### Delete a Post

- **URL**: `/posts/delete`
- **Method**: `POST`
- **Description**: Deletes a post by its ID.
- **Body**:
  ```json
  {
    "id": postId
  }
  ```

## Error Handling

The API returns appropriate HTTP status codes and error messages for different scenarios, such as missing resources or invalid inputs.

## Dependencies

- `express`: Web server framework.
- `cors`: Middleware for enabling CORS.
- `sequelize`: ORM for database management.
- `sqlite3`: Database used for local development.


