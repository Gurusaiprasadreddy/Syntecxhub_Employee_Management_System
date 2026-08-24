const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./models/Employee');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const employees = [
  {
    employeeId: 'EMP001',
    name: 'Rahul Kumar',
    email: 'rahul@gmail.com',
    phone: '9876543210',
    department: 'Engineering',
    role: 'Software Developer',
    salary: 65000,
    joiningDate: '2026-01-15',
    status: 'Active',
  },
  {
    employeeId: 'EMP002',
    name: 'Priya Singh',
    email: 'priya@gmail.com',
    phone: '9876543211',
    department: 'HR',
    role: 'HR Manager',
    salary: 75000,
    joiningDate: '2025-11-20',
    status: 'Active',
  },
  {
    employeeId: 'EMP003',
    name: 'Amit Sharma',
    email: 'amit@gmail.com',
    phone: '9876543212',
    department: 'Finance',
    role: 'Financial Analyst',
    salary: 60000,
    joiningDate: '2026-03-01',
    status: 'Active',
  },
  {
    employeeId: 'EMP004',
    name: 'Sneha Gupta',
    email: 'sneha@gmail.com',
    phone: '9876543213',
    department: 'Marketing',
    role: 'Marketing Executive',
    salary: 55000,
    joiningDate: '2026-05-10',
    status: 'Inactive',
  },
  {
    employeeId: 'EMP005',
    name: 'Vikram Singh',
    email: 'vikram@gmail.com',
    phone: '9876543214',
    department: 'Sales',
    role: 'Sales Lead',
    salary: 80000,
    joiningDate: '2024-08-12',
    status: 'Active',
  },
];

const importData = async () => {
  try {
    await Employee.deleteMany();
    await Employee.insertMany(employees);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
