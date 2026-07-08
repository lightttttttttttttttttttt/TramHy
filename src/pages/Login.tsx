import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Store } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'user' | 'vendor'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu (Demo)");
      return;
    }
    
    // Simulate API Call
    if (email === 'admin') {
      localStorage.setItem('tramhy_user_role', 'admin');
      navigate('/admin');
    } else if (role === 'user') {
      localStorage.setItem('tramhy_user_role', 'user');
      navigate('/user-dashboard');
    } else {
      localStorage.setItem('tramhy_user_role', 'vendor');
      navigate('/vendor-dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px' }}>
      
      <div style={{ background: 'rgba(255, 182, 193, 0.25)', backdropFilter: 'blur(30px)', padding: '40px', borderRadius: '19.2px', maxWidth: '500px', width: '100%', border: '1px solid rgba(255, 182, 193, 0.6)', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
        
        <h2 style={{ fontFamily: 'var(--font-whyte-inktrap-mono)', fontSize: '24px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-soft-white)', textAlign: 'center', marginBottom: '16px' }}>L O G I N</h2>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '36px', fontStyle: 'italic', fontWeight: 300, margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>Chào mừng trở lại</h1>
          <p style={{ fontFamily: 'var(--font-whyte-inktrap)', color: 'var(--color-steel)', fontSize: '14px' }}>Đăng nhập để tiếp tục với Trạm Hỷ</p>
        </div>

        {/* Role Selector Tabs */}
        <div style={{ display: 'flex', background: 'rgba(255, 182, 193, 0.2)', borderRadius: '19.2px', padding: '8px', marginBottom: '40px', border: '1px solid rgba(255, 182, 193, 0.4)' }}>
          <button 
            onClick={() => setRole('user')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', border: 'none', background: role === 'user' ? 'var(--color-signal-violet)' : 'transparent', color: role === 'user' ? '#000' : 'var(--color-almost-white)', fontFamily: 'var(--font-whyte-inktrap)', fontWeight: role === 'user' ? 600 : 400, cursor: 'pointer', transition: '0.2s' }}
          >
            <User size={18} /> Khách hàng
          </button>
          <button 
            onClick={() => setRole('vendor')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', border: 'none', background: role === 'vendor' ? 'var(--color-signal-violet)' : 'transparent', color: role === 'vendor' ? '#000' : 'var(--color-almost-white)', fontFamily: 'var(--font-whyte-inktrap)', fontWeight: role === 'vendor' ? 600 : 400, cursor: 'pointer', transition: '0.2s' }}
          >
            <Store size={18} /> Nhà cung cấp
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-steel)' }}>Email hoặc Số điện thoại</label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="VD: user@tramhy.com" 
              style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid rgba(255, 182, 193, 0.5)', background: 'rgba(255, 182, 193, 0.15)', color: 'var(--color-almost-white)', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', outline: 'none' }} 
            />
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-steel)' }}>Mật khẩu</label>
              <a href="#" style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '12px', color: 'var(--color-signal-violet)', textDecoration: 'none' }}>Quên mật khẩu?</a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              style={{ width: '100%', padding: '14px 16px', borderRadius: '8px', border: '1px solid rgba(255, 182, 193, 0.5)', background: 'rgba(255, 182, 193, 0.15)', color: 'var(--color-almost-white)', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', outline: 'none' }} 
            />
          </div>

          <button 
            type="submit" 
            className="ghost-pill-btn"
            style={{ width: '100%', justifyContent: 'center', marginTop: '16px', background: 'var(--color-signal-violet)', color: '#fff', borderColor: 'var(--color-signal-violet)' }}
          >
            Đăng nhập
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '32px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', color: 'var(--color-steel)' }}>
          Chưa có tài khoản? <a href="#" style={{ color: 'var(--color-almost-white)', fontWeight: 500, textDecoration: 'none' }}>Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
}
