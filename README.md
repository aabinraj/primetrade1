🚀 PrimeTrade — Full Stack Web App

PrimeTrade is a full-stack application built with Next.js and Node.js/Express, featuring user authentication, a personal dashboard, and task management.

⭐ Features

🔐 JWT Authentication (Register/Login/Logout)

👤 User Dashboard

📝 Tasks CRUD (create, edit, delete, toggle complete)

🔍 Search & Filter Tasks

Dark-mode UI Only (TailwindCSS)

⚙️ REST API integration (Axios + SWR)

🛠️ Tech Stack

Frontend

Next.js 14 (App Router)

TypeScript

TailwindCSS

Axios + SWR

Backend

Node.js

Express

MongoDB + Mongoose

JWT + Bcrypt

📁 Folder Structure
primetrade/
  frontend/   → Next.js UI (login, register, dashboard, tasks)
  backend/    → Express API (auth, tasks)
  README.md

🔧 Run Backend
cd backend
npm install


Create .env:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret


Start server:

npm start

Run Frontend
cd frontend
npm install
npm run dev


Open:
http://localhost:3000

API Endpoints

Auth

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

Tasks

GET /api/tasks

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id

Built by Abinraj for a Frontend Developer Internship Assignment.
