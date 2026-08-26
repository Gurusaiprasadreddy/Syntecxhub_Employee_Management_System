import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdEdit, MdDelete, MdVisibility } from 'react-icons/md';
import employeeService from '../services/employeeService';
import toast from 'react-hot-toast';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import './Employees.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  
  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await employeeService.getEmployees({ search, department, status });
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees');
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [department, status]);

  const handleSearch = () => {
    fetchEmployees();
  };

  const confirmDelete = (emp) => {
    setEmployeeToDelete(emp);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!employeeToDelete) return;
    setDeleteLoading(true);
    try {
      await employeeService.deleteEmployee(employeeToDelete._id);
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
      fetchEmployees();
      toast.success('Employee deleted successfully');
    } catch (err) {
      toast.error('Failed to delete employee');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="employees-page">
      <div className="page-header flex justify-between items-center mb-4">
        <h1 className="page-title" style={{marginBottom: 0}}>Employees Directory</h1>
        <button className="btn btn-primary" onClick={() => navigate('/employees/new')}>
          <MdAdd /> Add Employee
        </button>
      </div>

      <div className="filters-section card mb-4">
        <SearchBar search={search} setSearch={setSearch} onSearch={handleSearch} />
        
        <div className="filters-group">
          <select 
            className="form-control filter-select" 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
          </select>

          <select 
            className="form-control filter-select" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {error && <div className="error-text mb-4">{error}</div>}

      {loading ? (
        <Loading />
      ) : employees.length === 0 ? (
        <div className="card text-center p-4">
          <h3>No employees found.</h3>
          <p className="text-muted mt-2">Try adjusting your filters or add a new employee.</p>
          <button className="btn btn-primary mt-4" onClick={() => navigate('/employees/new')}>
            Add First Employee
          </button>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Info</th>
                <th>Department & Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp._id}>
                  <td>{emp.employeeId}</td>
                  <td>
                    <div className="emp-name">{emp.name}</div>
                    <div className="emp-email text-muted text-sm">{emp.email}</div>
                    <div className="emp-phone text-muted text-sm">{emp.phone}</div>
                  </td>
                  <td>
                    <div className="font-medium">{emp.department}</div>
                    <div className="text-muted text-sm">{emp.role}</div>
                  </td>
                  <td>
                    <span className={`badge badge-${emp.status.toLowerCase()}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="icon-action-btn view-btn" title="View Details" onClick={() => navigate(`/employees/${emp._id}`)}>
                        <MdVisibility />
                      </button>
                      <button className="icon-action-btn edit-btn" title="Edit" onClick={() => navigate(`/employees/edit/${emp._id}`)}>
                        <MdEdit />
                      </button>
                      <button className="icon-action-btn delete-btn" title="Delete" onClick={() => confirmDelete(emp)}>
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <h3>Delete Employee</h3>
            <p className="mt-2 mb-4">Are you sure you want to delete <strong>{employeeToDelete?.name}</strong>? This action cannot be undone.</p>
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

export default Employees;
