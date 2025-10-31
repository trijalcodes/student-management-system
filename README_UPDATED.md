# Student Management System

## 📌 Project Overview
The **Student Management System (SMS)** is a MERN stack-based web application designed to manage student records efficiently. 
It provides a secure login system for administrators to add, edit, delete, and search student data, along with dashboard statistics and reports.

---

## 🎯 Features
- Secure **Admin Login** (JWT Authentication)
- **Add, Edit, Delete Student Records** (Admin only)
- **Search Students**
- **Dashboard with Quick Stats**
- **Reports Page**
- Passwords stored securely (bcrypt hashed)
- Scalable and user-friendly Material UI frontend

---

## 🛠️ Technology Stack
- **Frontend**: React.js, Material UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Other Tools**: Axios, bcrypt

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (>=14)
- MongoDB installed and running locally or on cloud (MongoDB Atlas)

### Steps
1. Clone the repository  
   ```bash
   git clone https://github.com/yourusername/student-management-system.git
   cd student-management-system
   ```

2. Install dependencies for both backend and frontend  
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Configure environment variables  
   Create a `.env` file in `backend/` with the following:  
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/studentDB
   JWT_SECRET=your_jwt_secret
   ```

4. Run the backend  
   ```bash
   cd backend
   npm start
   ```

5. Run the frontend  
   ```bash
   cd frontend
   npm start
   ```

6. Open in browser  
   ```
   http://localhost:3000
   ```

---

## 👨‍💻 Default Admin Credentials
- **Username**: admin  
- **Password**: admin123  

(Admin login is required to add/edit/delete student records.)

---

## 📂 Project Structure
```
student-management-system/
│
├── backend/            # Express + MongoDB Backend
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Routes
│   ├── controllers/    # Business Logic
│   └── server.js       # Main Server Entry
│
├── frontend/           # React Frontend
│   ├── src/components/ # UI Components
│   ├── src/pages/      # Pages (Login, Dashboard, Reports, etc.)
│   └── App.js
│
├── README.md
└── package.json
```

---

## 📸 Screenshots (To Be Added)
1. Login Page  
2. Dashboard  
3. Student List  
4. Reports Page  

---

## 📖 Future Enhancements
- Attendance Management
- Fees Module
- Teacher/Staff Portal
- Export Reports as PDF/Excel

---

## 🏫 Submitted By
**Trijal Shukla**  
Diploma in Computer Science & Engineering (Final Year)  
Government Polytechnic Shahjahanpur  

---
