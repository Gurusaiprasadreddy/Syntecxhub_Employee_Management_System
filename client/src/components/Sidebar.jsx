import { NavLink } from 'react-router-dom';
import { MdDashboard, MdPeople, MdAddCircle } from 'react-icons/md';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <span className="logo-icon">S</span>
          <h2>Syntecxhub</h2>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <MdDashboard className="nav-icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/employees" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <MdPeople className="nav-icon" />
              <span>Employees</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/employees/new" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <MdAddCircle className="nav-icon" />
              <span>Add Employee</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
