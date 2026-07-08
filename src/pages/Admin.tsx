import { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import CountUp from '../components/CountUp';

export default function Admin() {
  const { bookings } = useBooking();
  const [isVerified, setIsVerified] = useState(() => localStorage.getItem('tramhy_vendor_greenwedding_verified') === 'true');

  const gmv = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const escrow = bookings.filter(b => b.status !== 'Completed').reduce((sum, b) => sum + b.totalPrice * 0.5, 0);
  const commission = bookings.filter(b => b.status === 'Completed').reduce((sum, b) => sum + b.totalPrice * 0.1, 0);

  const toggleVerification = () => {
    const newValue = !isVerified;
    localStorage.setItem('tramhy_vendor_greenwedding_verified', newValue ? 'true' : 'false');
    setIsVerified(newValue);
    alert(newValue ? 'Đã duyệt đối tác (Tích xanh).' : 'Đã huỷ duyệt đối tác.');
    window.location.reload(); // Quick refresh to update context state
  };

  return (
    <div style={{ paddingBottom: '120px', paddingTop: '100px', display: 'flex', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ flexGrow: 1 }}>
        <h2 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '48px', fontStyle: 'italic', fontWeight: 300, margin: '0 0 32px 0' }}>Cổng Quản Trị Hệ Thống</h2>

        {/* Dashboard Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
          <div style={{ padding: '32px', background: 'rgba(237,195,196,0.05)', border: '1px solid var(--color-almost-white)', borderRadius: '19.2px' }}>
            <div style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-steel)', marginBottom: '16px' }}>Tổng GMV</div>
            <div style={{ fontFamily: 'var(--font-grandslang)', fontSize: '40px', color: 'var(--color-almost-white)' }}><CountUp end={gmv} suffix="đ" /></div>
          </div>
          <div style={{ padding: '32px', background: 'rgba(175, 80, 255, 0.05)', border: '1px solid var(--color-signal-violet)', borderRadius: '19.2px' }}>
            <div style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-signal-violet)', marginBottom: '16px' }}>Ví Escrow (Đang khoá)</div>
            <div style={{ fontFamily: 'var(--font-grandslang)', fontSize: '40px', color: 'var(--color-signal-violet)' }}><CountUp end={escrow} suffix="đ" /></div>
          </div>
          <div style={{ padding: '32px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '19.2px' }}>
            <div style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-almost-white)', marginBottom: '16px' }}>Phí sàn (10%)</div>
            <div style={{ fontFamily: 'var(--font-grandslang)', fontSize: '40px', color: '#4caf50' }}><CountUp end={commission} suffix="đ" /></div>
          </div>
        </div>

        {/* System Bookings Overview */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px', marginBottom: '40px', overflowX: 'auto' }}>
          <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '20px', color: '#fff', marginBottom: '24px' }}>Hoạt Động Ký Quỹ Mới Nhất</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(247,249,250,0.2)', fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-steel)' }}>
                <th style={{ padding: '16px' }}>Mã ĐH</th>
                <th style={{ padding: '16px' }}>Đối tác</th>
                <th style={{ padding: '16px' }}>Đợt 1 (30%)</th>
                <th style={{ padding: '16px' }}>Đợt 2 (50%)</th>
                <th style={{ padding: '16px' }}>Đợt 3 (20%)</th>
                <th style={{ padding: '16px', textAlign: 'right' }}>Tổng Giá Trị</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--color-steel)' }}>Chưa có giao dịch nào trên hệ thống.</td></tr>
              ) : bookings.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid rgba(247,249,250,0.1)', fontSize: '14px' }}>
                  <td style={{ padding: '16px', color: 'var(--color-almost-white)', fontWeight: 500 }}>#{b.id}</td>
                  <td style={{ padding: '16px', color: 'var(--color-almost-white)' }}>{b.vendorName}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ color: 'var(--color-almost-white)', marginBottom: '4px' }}>{(b.totalPrice * 0.3).toLocaleString()}đ</div>
                    <div style={{ fontSize: '12px', color: b.status === 'Completed' || b.status === 'Confirmed' ? '#4caf50' : 'var(--color-signal-violet)' }}>
                      {b.status === 'Completed' || b.status === 'Confirmed' ? 'Đã giải ngân' : 'Đang khoá ví'}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ color: 'var(--color-almost-white)', marginBottom: '4px' }}>{(b.totalPrice * 0.5).toLocaleString()}đ</div>
                    <div style={{ fontSize: '12px', color: b.status === 'Completed' ? '#4caf50' : b.status === 'Confirmed' ? 'var(--color-signal-violet)' : 'var(--color-steel)' }}>
                      {b.status === 'Completed' ? 'Đã giải ngân' : b.status === 'Confirmed' ? 'Đang khoá ví' : 'Chờ xử lý'}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ color: 'var(--color-almost-white)', marginBottom: '4px' }}>{(b.totalPrice * 0.2).toLocaleString()}đ</div>
                    <div style={{ fontSize: '12px', color: b.status === 'Completed' ? '#4caf50' : 'var(--color-steel)' }}>
                      {b.status === 'Completed' ? 'Đã giải ngân' : 'Chờ xử lý'}
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right', color: 'var(--color-almost-white)', fontWeight: 500 }}>{b.totalPrice.toLocaleString()}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vendor Approval (Green Wedding) */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '20px', color: '#fff', marginBottom: '24px' }}>Duyệt Đối Tác An Toàn (Green Wedding)</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 500, color: '#fff' }}>Luxe Weddings</div>
              <div style={{ fontSize: '14px', color: 'var(--color-steel)' }}>Đang chờ duyệt: Đối tác nhà hàng tiệc cưới</div>
            </div>
            <button 
              onClick={toggleVerification}
              className="ghost-pill-btn" 
              style={{ background: isVerified ? 'transparent' : 'var(--color-signal-violet)', color: isVerified ? 'var(--color-almost-white)' : '#000', borderColor: isVerified ? 'var(--color-almost-white)' : 'var(--color-signal-violet)' }}
            >
              {isVerified ? <><ShieldAlert size={16} /> Huỷ Duyệt</> : <><ShieldCheck size={16} /> Duyệt Tích Xanh</>}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
