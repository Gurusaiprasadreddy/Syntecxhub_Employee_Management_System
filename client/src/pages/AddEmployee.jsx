import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import employeeService from '../services/employeeService';
import { MdArrowBack } from 'react-icons/md';

const AddEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await employeeService.createEmployee(formData);
      // Optional: Add a success toast notification here
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-employee-page">
      <div className="flex items-center gap-2 mb-4">
        <button className="btn btn-outline" onClick={() => navigate('/employees')} style={{padding: '0.25rem 0.5rem'}}>
          <MdArrowBack />
        </button>
        <h1 className="page-title" style={{marginBottom: 0}}>Add New Employee</h1>
      </div>
      
      <EmployeeForm 
        onSubmit={handleSubmit} 
        isLoading={loading} 
        serverError={error} 
      />
    </div>
  );
};

export default AddEmployee;
