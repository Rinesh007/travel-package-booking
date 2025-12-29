# Travel Package Booking Platform

A full-stack Travel Package Booking Platform built using **Node.js, Express, MySQL, and React**.  
The project demonstrates secure authentication, clean backend architecture, and scalable frontend design.

---

## Features

### User Features
- User registration and login
- Browse travel packages
- View detailed package information
- Book travel packages
- View personal bookings

### Admin Features
- Create, update, and deactivate travel packages
- View all bookings
- Update booking status
- View admin statistics

### Security Features
- JWT authentication (Access Token + Refresh Token)
- Refresh tokens stored in **HttpOnly cookies**
- Access tokens stored **in memory (no localStorage)**
- Role-based authorization (User / Admin)
- Input validation using `express-validator`

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- JWT (jsonwebtoken)
- bcrypt
- express-validator
- cookie-parser

### Frontend
- React (Vite)
- Axios
- React Router
- Context API
- Tailwind CSS

---

## 🧱 Project Architecture

### Backend
- `routes/` – API routes
- `controllers/` – Request handling
- `services/` – Business logic
- `models/` – Database queries
- `middleware/` – Authentication & authorization
- `utils/` – Token utilities
- `config/` – Environment & DB configuration

### Frontend
- `pages/` – Application pages
- `components/` – Reusable UI components
- `context/` – Authentication state
- `api/` – Axios API handlers

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git

2️⃣ Backend Setup
cd backend
npm install

Create a .env file using the example:
cp .env.example .env

Update .env with:
MySQL credentials
JWT secrets

Start backend:
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Database Setup

This project uses MySQL.
Open MySQL Workbench or MySQL CLI
Run the SQL file located at:
backend/sql/schema.sql

Update database credentials inside .env

🔐 Environment Variables
Sensitive data is stored in .env
.env is not uploaded to GitHub
.env.example is provided as a template

🔁 Authentication Flow
Access tokens stored in memory
Refresh tokens stored in HttpOnly cookies
Access tokens are refreshed automatically on page reload
User session persists securely without localStorage

📌 Notes
Built with scalability and security in mind
Follows clean code and separation of concerns
Suitable for interview presentations and real-world demos