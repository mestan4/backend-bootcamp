# 5-Day Node.js & Express Backend Bootcamp

A structured repository covering core backend principles, RESTful API architecture, routing, middleware patterns, modular project structure, and file-based data persistence with Node.js and Express.

---

## 📌 Curriculum Overview

| Day | Focus Area | Key Concepts & Technologies |
| :--- | :--- | :--- |
| **Day 01** | Architecture & Native Server | Client-Server Model, HTTP Protocol, Request/Response Lifecycle, Native `http` Module |
| **Day 02** | Node.js Runtime & Modules | V8 Engine, Script Execution, CommonJS (`require` / `module.exports`) |
| **Day 03** | Express.js & Postman | Express Initialization, Basic Routing, JSON Responses, Postman Testing |
| **Day 04** | RESTful CRUD API | `req.params`, `req.query`, `req.body`, HTTP Status Codes, Custom Middleware |
| **Day 05** | Production Architecture & Persistence | Modular Folder Structure (`src/routes`, `src/utils`), `fs` Module, JSON Storage, Nodemon, Validation |

---

## 📂 Repository Structure

* `day1/`: Native Node.js HTTP server.
* `day2/`: CommonJS module system demonstrations.
* `day3/`: Basic Express.js routing.
* `day4/`: In-memory CRUD operations with custom logger middleware.
* `day5/`: Production-ready modular Notes API with persistent JSON storage.
  * `src/server.js`: Server listener and initialization.
  * `src/app.js`: Express app instance and middleware configuration.
  * `src/routes/`: Route declarations using Express Router.
  * `src/middleware/`: Custom logging and validation middlewares.
  * `src/utils/`: Helper utilities for file I/O operations.
  * `data/notes.json`: Persistent file-based database.

---

## 🚀 Running the Projects

Each day contains an independent working environment.

### Running Day 1 or Day 2 (Native Node.js)
1. Navigate to the directory:
   cd day1
2. Run the script:
   node app.js

### Running Day 3 or Day 4 (Express.js In-Memory)
1. Navigate to the directory:
   cd day4
2. Install dependencies:
   npm install
3. Start the server:
   node app.js

### Running Day 5 (Modular Persistent Notes API)
1. Navigate to the directory:
   cd day5
2. Install dependencies:
   npm install
3. Start development server with live reload:
   npm run dev

Server runs at: http://localhost:3000

---

## 📡 API Reference (Day 5 Persistent API)

### Notes Endpoints

| Method | Endpoint | Description | Payload / Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/notes` | Retrieve all notes or filter by title | Query: `?search=keyword` |
| **GET** | `/notes/:id` | Retrieve a single note by ID | Param: `id` (integer) |
| **POST** | `/notes` | Create and store a new note | Body: `{"title": "...", "content": "..."}` |
| **PUT** | `/notes/:id` | Update note title and/or content | Param: `id`, Body: `{"title": "..."}` |
| **PATCH** | `/notes/:id/complete` | Mark a specific note as completed | Param: `id` (integer) |
| **DELETE** | `/notes/:id` | Remove a note permanently | Param: `id` (integer) |