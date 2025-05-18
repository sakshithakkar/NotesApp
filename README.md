# Todo App (MERN Stack)

This is a full-stack Todo application built using the MERN stack (MongoDB, Express, React, Node.js). It includes user authentication and task management features.

---

## 📁 Folder Structure

├── backend # Express.js + MongoDB (Mongoose) + JWT Auth
└── frontend # React.js frontend using Vite


---

## 🚀 Features

### 🔐 Authentication
- User registration and login
- JWT-based auth with protected routes

### ✅ Task Management
- Create, update, delete, and list tasks
- Tasks are user-specific

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Other**: dotenv, cors, http-status-codes

---

## 🔧 Setup Instructions

### 1. Clone the Repository


git clone https://github.com/sakshithakkar/NotesApp.git
cd todo-app

---

## Setup Backend

cd backend
npm install
npm start

## Setup Frontend

cd ../frontend
npm install
npm run dev


## API Endpoints (Protected with JWT)
Auth (/api/auth)

POST /register
POST /login

Tasks (/api/tasks)
GET / - List tasks

POST / - Create task

PUT /:id - Update task

DELETE /:id - Delete task

## Contributors

- **Sakshi Thakkar** - Developer.
