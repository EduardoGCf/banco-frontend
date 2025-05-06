import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../application/auth/logout';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>BancoApp</h3>
      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/beneficiarios" style={styles.link}>Beneficiarios</Link>
        <button onClick={handleLogout} style={styles.logout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#222',
    color: '#fff'
  },
  logo: {
    margin: 0
  },
  links: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  link: {
    color: '#fff',
    textDecoration: 'none'
  },
  logout: {
    backgroundColor: '#ff4d4d',
    border: 'none',
    color: '#fff',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px'
  }
} as const;
