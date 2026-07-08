import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { showToast } from './Toast';

export default function Header() {
  useLocation(); // trigger re-render on route change
  const navigate = useNavigate();
  const userRole = localStorage.getItem('tramhy_user_role');

  const getAccountInfo = () => {
    if (userRole === 'admin') return { name: 'Admin', path: '/admin' };
    if (userRole === 'vendor') return { name: 'Đối tác', path: '/vendor-dashboard' };
    return { name: 'Khách hàng', path: '/user-dashboard' };
  };

  const account = userRole ? getAccountInfo() : null;

  const handleLogout = () => {
    localStorage.removeItem('tramhy_user_role');
    navigate('/login');
  };

  return (
    <header className="frosted-nav-bar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', maxWidth: 'var(--page-max-width)' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1px solid var(--color-almost-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-near-black)'
          }}>
            <img src="/logo.png" alt="Trạm Hỷ Logo" style={{ width: '120%', height: '120%', objectFit: 'cover', objectPosition: 'center 20%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ 
              fontFamily: 'var(--font-grandslang)', 
              fontSize: '22px', 
              fontWeight: 500, 
              fontStyle: 'italic',
              color: 'var(--color-almost-white)',
              lineHeight: 1,
              letterSpacing: '1px'
            }}>Trạm Hỷ</span>
            <span style={{
              fontFamily: 'var(--font-grandslang)',
              fontSize: '14px',
              fontStyle: 'italic',
              color: 'var(--color-signal-violet)',
              marginTop: '0px'
            }}>Kết duyên cát hỷ</span>
          </div>
        </Link>
        
        <nav style={{ display: 'flex', gap: '32px' }}>
          {[
            { name: 'TRANG CHỦ', path: '/' },
            { name: 'DỊCH VỤ', path: '/marketplace' },
            { name: 'KẾ HOẠCH', path: '/planning' },
            { name: 'THIỆP CƯỚI', path: '/e-invitation' }
          ].map((item) => (
            <Link key={item.name} to={item.path} style={{ 
              fontFamily: 'var(--font-whyte-inktrap)', 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.07em', 
              color: 'var(--color-steel)', 
              textDecoration: 'none' 
            }}>
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {account ? (
            <>
              <Link to={account.path} className="filled-action-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-signal-violet)', color: '#fff' }}>
                <User size={16} /> {account.name}
              </Link>
              <button 
                onClick={handleLogout}
                style={{ background: 'transparent', border: 'none', color: 'var(--color-steel)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                title="Đăng xuất"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ 
                fontFamily: 'var(--font-whyte-inktrap)', 
                fontSize: '16px', 
                color: 'var(--color-almost-white)', 
                textDecoration: 'none' 
              }}>
                Log In
              </Link>
              <button 
                onClick={() => showToast('Chức năng đặt lịch (Book a Demo) đang được bảo trì!', 'info')}
                className="filled-action-btn" 
                style={{ textDecoration: 'none', border: 'none', cursor: 'pointer' }}
              >
                Book a Demo
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
