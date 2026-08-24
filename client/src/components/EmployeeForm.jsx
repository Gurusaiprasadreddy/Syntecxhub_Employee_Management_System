import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeForm.css';

const EmployeeForm = ({ initialData, onSubmit, isLoading, serverError }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    salary: '',
    joiningDate: '',
    status: 'Active',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      // Format date for input type="date"
      let formattedDate = '';
      if (initialData.joiningDate) {
        formattedDate = new Date(initialData.joiningDate).toISOString().split('T')[0];
      }
      setFormData({
        ...initialData,
        joiningDate: formattedDate,
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    
    if (!formData.salary || isNaN(formData.salary)) {
      newErrors.salary = 'Valid salary is required';
    } else if (Number(formData.salary) < 0) {
      newErrors.salary = 'Salary cannot be negative';
    }

    if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="employee-form card" onSubmit={handleSubmit}>
      {serverError && <div className="form-error-banner">{serverError}</div>}
      
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Employee ID *</label>
          <input 
            type="text" 
            name="employeeId" 
            className="form-control" 
            value={formData.employeeId} 
            onChange={handleChange}
            placeholder="e.g. EMP001"
          />
          {errors.employeeId && <span className="error-text">{errors.employeeId}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input 
            type="text" 
            name="name" 
            className="form-control" 
            value={formData.name} 
            onChange={handleChange}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input 
            type="email" 
            name="email" 
            className="form-control" 
            value={formData.email} 
            onChange={handleChange}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input 
            type="text" 
            name="phone" 
            className="form-control" 
            value={formData.phone} 
            onChange={handleChange}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Department *</label>
          <select name="department" className="form-control" value={formData.department} onChange={handleChange}>
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
          </select>
          {errors.department && <span className="error-text">{errors.department}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Role / Job Title *</label>
          <input 
            type="text" 
            name="role" 
            className="form-control" 
            value={formData.role} 
            onChange={handleChange}
          />
          {errors.role && <span className="error-text">{errors.role}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Salary *</label>
          <input 
            type="number" 
            name="salary" 
            className="form-control" 
            value={formData.salary} 
            onChange={handleChange}
            min="0"
          />
          {errors.salary && <span className="error-text">{errors.salary}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Joining Date *</label>
          <input 
            type="date" 
            name="joiningDate" 
            className="form-control" 
            value={formData.joiningDate} 
            onChange={handleChange}
          />
          {errors.joiningDate && <span className="error-text">{errors.joiningDate}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Status *</label>
          <select name="status" className="form-control" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="form-actions mt-4 flex justify-end gap-2">
        <button type="button" className="btn btn-outline" onClick={() => navigate('/employees')} disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Employee'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
