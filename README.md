# Syntecxhub Employee Management System

This project was developed as part of the Syntecxhub Web Development Internship. 
**Project: Project 3 – Employee Management System**

## 1. Project Overview
This is a full-stack MERN (MongoDB, Express, React, Node.js) application. It serves as a professional, responsive HR management dashboard for managing employee records, satisfying all the requirements of Syntecxhub Project 3 without unnecessary bloat.

## 2. Features
- **Employee CRUD**: Complete Create, Read, Update, and Delete functionality.
- **Search & Filter**: Search employees by name, ID, email, etc., and filter by department or status.
- **Dashboard Statistics**: Dynamic calculation of total, active, and inactive employees.
- **Form Validation**: Robust frontend and backend validation for all inputs (e.g., proper email format, positive salary, 10-digit phone number).
- **Responsive Design**: fully functional across mobile, tablet, and desktop views.
- **Employee Details View**: A dedicated, clean profile view for each employee.
- **Error Handling**: Clean error UI with Toast notifications and robust backend API error handling.
- **Safe Deletion**: Delete confirmation modal prevents accidental data loss.

## 3. Technology Stack
- **Frontend**: React.js (Vite), React Router, Axios, React Icons, React Hot Toast, Vanilla CSS
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB

## 4. Project Structure
```text
Syntecxhub_Employee_Management_System/
│
├── client/          # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
│
├── server/          # Node.js backend (Express)
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## 5. Screenshots

### Dashboard
![Dashboard Overview](./screenshots/dashboard.png)

### Employees Directory
![Employees Directory](./screenshots/employees.png)

### Add New Employee
![Add New Employee](./screenshots/add-employee.png)

*(Note: Add remaining screenshots like edit-employee.png, employee-details.png, delete-confirmation.png, mobile-view.png to the screenshots folder to see them here)*

## 6. Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or a MongoDB Atlas URI)

## 7. Installation

1. Clone the repository or navigate to the project directory.

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

## 8. Environment Variables

### Backend Environment Variables (`server/.env`)
Create a `.env` file in the `server` directory using `.env.example` as a template:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee-management
NODE_ENV=development
```

### Frontend Environment Variables (`client/.env`)
Create a `.env` file in the `client` directory using `.env.example` as a template:
```env
VITE_API_URL=http://localhost:5000/api
```

## 9. Running the Backend
From the `server` directory:
```bash
npm run dev
```
*(The server runs with nodemon on port 5000).*

## 10. Running the Frontend
From the `client` directory (in a separate terminal):
```bash
npm run dev
```
*(The application will typically be available at `http://localhost:5173/`).*

## 11. API Endpoints
- `GET    /api/employees` - Get all employees (supports `?search=`, `?department=`, `?status=` queries)
- `GET    /api/employees/:id` - Get a single employee by MongoDB ID
- `POST   /api/employees` - Create a new employee
- `PUT    /api/employees/:id` - Update an existing employee
- `DELETE /api/employees/:id` - Delete an employee

## 12. Employee Fields
The system tracks the following fields for each employee:
- `Employee ID`: Unique identifier (e.g., EMP001).
- `Name`: Full name of the employee.
- `Email`: Unique email address.
- `Phone`: 10-digit contact number.
- `Department`: Assigned department (e.g., Engineering, HR).
- `Role`: Job title.
- `Salary`: Numeric value greater than 0.
- `Joining Date`: Date of joining.
- `Status`: Active or Inactive.

## 13. Validation
- **Frontend**: Inline validation errors appear below fields. Prevents submission of invalid data.
- **Backend**: Mongoose schema strictly enforces uniqueness (Email, Employee ID), type checking, minimum values (Salary > 0), and regex matching (Phone number, Email).
- Conflict errors (like duplicate IDs) return a `409 Conflict` HTTP status code.
- Malformed MongoDB IDs return a `400 Bad Request`.

## 14. Responsive Design
The UI is fully responsive:
- **Desktop (1920x1080, 1366x768)**: Standard sidebar layout and full data tables.
- **Tablet (768px)**: Adjusted margins and filter arrangements.
- **Mobile (430px, 375px)**: The Sidebar moves to the top/bottom, and the Data Table converts to a vertical card-based layout to prevent horizontal scrolling overflow.

## 15. Future Improvements
- Authentication (Admin Login / JWT)
- Role-based access control
- Payroll and Leave management modules
- Employee attendance tracking
- Export reports to CSV/PDF

## 16. Author
Developed by Gurusaiprasadreddy.
