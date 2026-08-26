import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdEdit, MdDelete, MdArrowBack, MdEmail, MdPhone, MdWork, MdDateRange, MdBusiness } from 'react-icons/md';
import employeeService from '../services/employeeService';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import './EmployeeDetails.css';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await employeeService.getEmployee(id);
        setEmployee(data);
      } catch (err) {
        setError('Employee not found');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await employeeService.deleteEmployee(id);
      toast.success('Employee deleted successfully');
      navigate('/employees');
    } catch (err) {
      toast.error('Failed to delete employee');
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) return <Loading />;
  if (error || !employee) return <div className="card text-center p-4 error-text">{error || 'Error loading employee'}</div>;

  return (
    <div className="employee-details-page">
      <div className="flex justify-between items-center mb-4">
        <button className="btn btn-outline" onClick={() => navigate('/employees')}>
          <MdArrowBack /> Back to Employees
        </button>
        <div className="flex gap-2">
          <button className="btn btn-warning flex items-center gap-2" onClick={() => navigate(`/employees/edit/${id}`)} style={{backgroundColor: 'var(--warning-color)', color: 'white'}}>
            <MdEdit /> Edit
          </button>
          <button className="btn btn-danger flex items-center gap-2" onClick={() => setShowDeleteModal(true)}>
            <MdDelete /> Delete
          </button>
        </div>
      </div>

      <div className="profile-card card">
        <div className="profile-header">
          <div className="profile-avatar">
            {employee.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-title-info">
            <h2>{employee.name}</h2>
            <p className="text-muted">{employee.role}</p>
            <span className={`badge badge-${employee.status.toLowerCase()} mt-2`}>
              {employee.status}
            </span>
          </div>
        </div>
        
        <div className="profile-details-grid mt-4">
          <div className="detail-item">
            <div className="detail-icon"><MdBusiness /></div>
            <div>
              <span className="detail-label">Employee ID</span>
              <p className="detail-value">{employee.employeeId}</p>
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-icon"><MdEmail /></div>
            <div>
              <span className="detail-label">Email</span>
              <p className="detail-value">{employee.email}</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon"><MdPhone /></div>
            <div>
              <span className="detail-label">Phone</span>
              <p className="detail-value">{employee.phone}</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon"><MdWork /></div>
            <div>
              <span className="detail-label">Department</span>
              <p className="detail-value">{employee.department}</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon">₹</div>
            <div>
              <span className="detail-label">Salary</span>
              <p className="detail-value">₹{employee.salary.toLocaleString()}</p>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon"><MdDateRange /></div>
            <div>
              <span className="detail-label">Joining Date</span>
              <p className="detail-value">{new Date(employee.joiningDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <h3>Delete Employee</h3>
            <p className="mt-2 mb-4">Are you sure you want to delete <strong>{employee.name}</strong>? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button className="btn btn-outline" onClick={() => setShowDeleteModal(false)} disabled={deleteLoading}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
