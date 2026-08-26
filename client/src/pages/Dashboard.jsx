import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPeople, MdCheckCircle, MdCancel, MdBusiness } from 'react-icons/md';
import employeeService from '../services/employeeService';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import './Dashboard.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getEmployees();
        setEmployees(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        toast.error('Failed to load dashboard data');
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="error-text p-4">{error}</div>;

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const inactiveEmployees = employees.filter(e => e.status === 'Inactive').length;
  const departments = [...new Set(employees.map(e => e.department))].length;

  const recentEmployees = [...employees].slice(0, 5); // Assuming already sorted by createdAt descending

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard Overview</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper bg-blue">
            <MdPeople className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Total Employees</h3>
            <p className="stat-value">{totalEmployees}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper bg-green">
            <MdCheckCircle className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Active Employees</h3>
            <p className="stat-value">{activeEmployees}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper bg-red">
            <MdCancel className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Inactive Employees</h3>
            <p className="stat-value">{inactiveEmployees}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper bg-purple">
            <MdBusiness className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Departments</h3>
            <p className="stat-value">{departments}</p>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <div className="section-header flex justify-between items-center mb-4">
          <h2>Recently Added Employees</h2>
          <button className="btn btn-outline" onClick={() => navigate('/employees')}>View All</button>
        </div>
        
        {recentEmployees.length === 0 ? (
          <div className="card text-center p-4">No employees found.</div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEmployees.map(emp => (
                  <tr key={emp._id} onClick={() => navigate(`/employees/${emp._id}`)} className="clickable-row">
                    <td>{emp.employeeId}</td>
                    <td>
                      <div className="emp-name">{emp.name}</div>
                      <div className="emp-email text-muted text-sm">{emp.email}</div>
                    </td>
                    <td>{emp.role}</td>
                    <td>{emp.department}</td>
                    <td>
                      <span className={`badge badge-${emp.status.toLowerCase()}`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
