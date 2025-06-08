# 🖥️ IT Management System

A full-stack web application for managing IT assets and personnel, built for DRDO.  
This project features a modern React + Vite frontend and a secure Express + MongoDB backend with JWT authentication.

---

## 🚀 Features

- **User Management** (Admins & IT Personnel)
- **PC Inventory Management**
- **Role-Based Access Control**
- **Request/Approval Workflow** for PC changes
- **Secure Authentication** (JWT)
- **Detailed PC Information**
- **Responsive, Modern UI** (custom CSS or Tailwind CSS)

---

## 🏗️ Project Structure

```
it-management-system/
  ├── src/
  │   ├── assets/           # Images (e.g., DRDO logo)
  │   ├── components/       # React components
  │   ├── pages/            # Page components (Home, Login, Dashboards)
  │   ├── services/         # API service (Axios)
  │   ├── styles/           # Global styles (if using Tailwind)
  │   ├── App.jsx
  │   ├── main.jsx
  │   └── ...
  ├── public/
  ├── package.json
  ├── vite.config.js
  ├── tailwind.config.js (if using Tailwind)
  └── ...
PC-INVENTORY-APP-BACKEN/
  ├── models/               # Mongoose schemas
  ├── routes/               # Express routes
  ├── middlewares/          # Auth middleware
  ├── index.js              # Server entry point
  ├── .env                  # Environment variables
  └── ...
```

---

## ⚙️ Setup Instructions

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/it-management-system.git
cd it-management-system
```

### 2. **Backend Setup**

```bash
cd PC-INVENTORY-APP-BACKEN
npm install
# Configure your .env file (MongoDB URI, JWT secret, etc.)
npm run dev
```

- The backend runs on **http://localhost:3000** by default.

### 3. **Frontend Setup**

```bash
cd ../it-management-system
npm install
npm run dev
```

- The frontend runs on **http://localhost:5173** by default.

---

## 🔑 Authentication & Roles

- **IT_Admin**:  
  - Can create users (Admins & Personnel)
  - Can directly add, update, or delete PCs
  - Can approve/reject PC requests

- **IT_Personnel**:  
  - Can submit requests to add, update, or delete PCs (pending admin approval)

---

## 📋 API Overview

- **User Registration/Login:**  
  - `POST /api/users` (Admin only)
  - `POST /api/users/login`

- **PC Management:**  
  - `POST /api/pcs` (Add PC)
  - `PUT /api/pcs/:id` (Update PC)
  - `DELETE /api/pcs/:id` (Delete PC)
  - `PATCH /api/pcs/:id/approve` (Admin approve)
  - `PATCH /api/pcs/:id/reject` (Admin reject)
  - `GET /api/pcs` (List all PCs)

- **All routes except `/api/users/login` require JWT authentication.**

---

## 🖼️ UI Preview

- **Home Page:**  
  - DRDO logo as background
  - Features list
  - Login form

- **Dashboards:**  
  - Admin and User dashboards with role-based access

---

## 🛡️ Security

- Passwords are hashed using bcrypt.
- JWT is used for authentication.
- Role-based access control on all sensitive routes.

---

## 📦 Tech Stack

- **Frontend:** React, Vite, Axios, React Router, Custom CSS (or Tailwind CSS)
- **Backend:** Express.js, MongoDB, Mongoose, JWT, bcrypt

---

## 👤 Authors

- [Your Name](https://github.com/your-username)
- [Contributors...]

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- DRDO for the use case and logo
- [Vite](https://vitejs.dev/), [React](https://react.dev/), [Express](https://expressjs.com/), [MongoDB](https://www.mongodb.com/)

---

**For any issues or contributions, please open an issue or pull request!**
