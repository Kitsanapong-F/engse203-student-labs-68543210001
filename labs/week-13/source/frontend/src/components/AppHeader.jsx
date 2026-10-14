import { NavLink, useNavigate } from 'react-router-dom';

const links = [
  ['/', 'Dashboard'],
  ['/requests/new', 'New Request'],
  ['/about', 'About'],
];

function AppHeader() {
  const navigate = useNavigate();
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <p className="eyebrow">ENGSE203 • LAB 13</p>
          <p className="brand">Campus Service Request</p>
        </div>
        <nav aria-label="เมนูหลัก" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {links.map(([to, label]) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={to === '/'}
              key={to}
              to={to}
            >
              {label}
            </NavLink>
          ))}

          {token ? (
            <button
              onClick={handleLogout}
              className="button subtle inline"
              style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
            >
              ออกจากระบบ
            </button>
          ) : (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              to="/login"
            >
              Login (เจ้าหน้าที่)
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
