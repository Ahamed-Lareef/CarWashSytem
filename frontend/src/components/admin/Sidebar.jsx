import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          {/* Dashboard */}
          <li>
            <Link to="/admin/dashboard">
              <i className="fas fa-tachometer-alt me-2"></i> Dashboard
            </Link>
          </li>

          {/* Services */}
          <li>
            <NavDropdown title={<><i className="fa fa-cogs me-2"></i> Services</>} id="services-dropdown">
              <NavDropdown.Item onClick={() => navigate('/admin/services')}>
                <i className="fa fa-list me-2"></i> All Services
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/admin/services/create')}>
                <i className="fa fa-plus-circle me-2"></i> Create Service
              </NavDropdown.Item>
            </NavDropdown>
          </li>

          {/* Bookings */}
          <li>
            <Link to="/admin/bookings">
              <i className="fa fa-calendar-check me-2"></i> Bookings
            </Link>
          </li>

          {/* Users */}
          <li>
            <Link to="/admin/users">
              <i className="fa fa-users me-2"></i> Users
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
