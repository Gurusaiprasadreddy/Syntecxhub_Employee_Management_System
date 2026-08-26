import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/employees`;

// Get all employees
const getEmployees = async (filters = {}) => {
  const { search, department, status } = filters;
  let query = '?';
  if (search) query += `search=${search}&`;
  if (department) query += `department=${department}&`;
  if (status) query += `status=${status}&`;

  const response = await axios.get(API_URL + query);
  return response.data;
};

// Get single employee
const getEmployee = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create new employee
const createEmployee = async (employeeData) => {
  const response = await axios.post(API_URL, employeeData);
  return response.data;
};

// Update employee
const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(`${API_URL}/${id}`, employeeData);
  return response.data;
};

// Delete employee
const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const employeeService = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

export default employeeService;
