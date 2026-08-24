import { MdAccountCircle, MdNotifications } from 'react-icons/md';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">HR Management System</h1>
        
        <div className="navbar-actions">
          <button className="icon-btn">
            <MdNotifications />
          </button>
          <div className="user-profile">
            <MdAccountCircle className="user-avatar" />
            <span className="user-name">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
