import { useState } from 'react';
import { Wallet, Calendar, Users, TrendingUp, ShieldCheck, Clock, CheckCircle2, LayoutDashboard, MessageSquare, Settings, ArrowRight, ArrowDownRight, ArrowUpRight, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import CountUp from '../components/CountUp';

export default function VendorDashboard() {
  const { bookings, updateBookingStatus } = useBooking();
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'escrow' | 'messages' | 'settings'>('overview');
  
  // Hardcode this vendor as L'Amour Studio for demo
  const vendorId = '1';
  const vendorBookings = bookings.filter(b => b.vendorId === vendorId);

  const revenue = vendorBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const escrow = vendorBookings.filter(b => b.status === 'Pending' || b.status === 'Confirmed').reduce((sum, b) => sum + b.totalPrice * 0.5, 0);
  const newCustomers = vendorBookings.filter(b => b.status === 'Pending').length;

  const renderOverview = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-whyte-inktrap-mono)', fontSize: '24px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-soft-white)', textAlign: 'left', marginBottom: '16px' }}>V E N D O R   P O R T A L</h2>
          <h1 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '48px', fontStyle: 'italic', fontWeight: 300, margin: 0, letterSpacing: '-0.03em' }}>Tổng quan Kinh doanh</h1>
        </div>
        <button className="ghost-pill-btn" style={{ background: 'var(--color-signal-violet)', color: '#000', borderColor: 'var(--color-signal-violet)' }}>
          <span>+</span> Cập nhật Lịch trống
        </button>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
        <div style={{ padding: '32px', background: 'rgba(237,195,196,0.05)', border: '1px solid var(--color-almost-white)', borderRadius: '19.2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', color: 'var(--color-steel)' }}>
            <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Doanh thu Tạm tính</span>
            <TrendingUp size={20} color="var(--color-almost-white)" />
          </div>
          <div style={{ fontFamily: 'var(--font-grandslang)', fontSize: '40px', marginBottom: '8px' }}>{revenue > 0 ? <CountUp end={revenue / 1000000} decimals={1} suffix="M" /> : '0'}</div>
          <div style={{ fontSize: '12px', color: 'var(--color-signal-violet)', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={12} /> Doanh thu dự kiến từ đơn đã đặt</div>
        </div>

        <div style={{ padding: '32px', background: 'rgba(175, 80, 255, 0.05)', border: '1px solid var(--color-signal-violet)', borderRadius: '19.2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', color: 'var(--color-signal-violet)' }}>
            <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Tiền chờ Giải ngân</span>
            <ShieldCheck size={20} />
          </div>
          <div style={{ fontFamily: 'var(--font-grandslang)', fontSize: '40px', marginBottom: '8px', color: 'var(--color-signal-violet)' }}>{escrow > 0 ? <CountUp end={escrow / 1000000} decimals={1} suffix="M" /> : '0'}</div>
          <div style={{ fontSize: '12px', color: 'var(--color-steel)' }}>Được bảo chứng bởi Trạm Hỷ</div>
        </div>

        <div style={{ padding: '32px', background: 'rgba(237,195,196,0.05)', border: '1px solid var(--color-almost-white)', borderRadius: '19.2px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', color: 'var(--color-steel)' }}>
            <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Khách hàng Mới</span>
            <Users size={20} color="var(--color-almost-white)" />
          </div>
          <div style={{ fontFamily: 'var(--font-grandslang)', fontSize: '40px', marginBottom: '8px' }}>{newCustomers}</div>
          <div style={{ fontSize: '12px', color: 'var(--color-steel)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={12} /> {newCustomers > 0 ? `${newCustomers} đơn đang chờ xác nhận` : 'Chưa có đơn mới'}
          </div>
        </div>
      </div>

      {/* Bookings / Milestone Status */}
      <div style={{ border: '1px solid var(--color-almost-white)', borderRadius: '19.2px', overflow: 'hidden' }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(247,249,250,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(237,195,196,0.05)' }}>
          <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '18px', fontWeight: 400, margin: 0 }}>Trạng thái Đơn hàng & Tiến độ Thanh toán</h3>
          <Link to="#" style={{ color: 'var(--color-almost-white)', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setActiveTab('appointments')}>Xem tất cả <span>→</span></Link>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(247,249,250,0.2)' }}>
              <th style={{ padding: '16px 32px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-steel)', fontWeight: 500 }}>Khách hàng</th>
              <th style={{ padding: '16px 32px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-steel)', fontWeight: 500 }}>Gói dịch vụ</th>
              <th style={{ padding: '16px 32px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-steel)', fontWeight: 500 }}>Tiến độ Thanh toán (Milestone)</th>
              <th style={{ padding: '16px 32px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-steel)', fontWeight: 500 }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {vendorBookings.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '48px', textAlign: 'center', color: 'var(--color-steel)' }}>
                  Chưa có đơn hàng nào được đặt.
                </td>
              </tr>
            ) : vendorBookings.slice(0, 3).map(booking => (
              <tr key={booking.id} style={{ borderBottom: '1px solid rgba(247,249,250,0.2)' }}>
                <td style={{ padding: '24px 32px' }}>
                  <div style={{ fontFamily: 'var(--font-whyte-inktrap)', fontWeight: 400, fontSize: '16px', marginBottom: '4px' }}>Khách hàng Trạm Hỷ</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-steel)', fontFamily: 'var(--font-whyte-inktrap)' }}>Mã: #{booking.id}</div>
                </td>
                <td style={{ padding: '24px 32px', fontSize: '14px', color: 'var(--color-almost-white)', fontWeight: 300 }}>{booking.notes}<br/><span style={{ color: 'var(--color-steel)', fontSize: '12px' }}>{booking.date}</span></td>
                <td style={{ padding: '24px 32px' }}>
                  {booking.status === 'Completed' ? (
                    <>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-steel)', marginBottom: '4px' }}>
                        <CheckCircle2 size={14} /> Chặng 3: Hoàn tất ({(booking.totalPrice * 0.2 / 1000000).toFixed(1)}M)
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--color-steel)', opacity: 0.7 }}>Đã giải ngân toàn bộ</div>
                    </>
                  ) : booking.status === 'Confirmed' ? (
                    <>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-signal-violet)', fontWeight: 600, marginBottom: '4px' }}>
                        <ShieldCheck size={14} /> Chặng 2: Trước sự kiện ({(booking.totalPrice * 0.5 / 1000000).toFixed(1)}M)
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--color-steel)', opacity: 0.7 }}>Trạm Hỷ đang giữ tiền Escrow</div>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-almost-white)', marginBottom: '4px' }}>
                        <Clock size={14} /> Chờ cọc Chặng 1 ({(booking.totalPrice * 0.3 / 1000000).toFixed(1)}M)
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--color-steel)', opacity: 0.7 }}>Khách vừa đặt lịch</div>
                    </>
                  )}
                </td>
                <td style={{ padding: '24px 32px' }}>
                  {booking.status === 'Pending' && (
                    <button 
                      className="ghost-pill-btn" 
                      style={{ padding: '6px 12px', fontSize: '12px', background: 'var(--color-signal-violet)', color: '#000', borderColor: 'var(--color-signal-violet)' }}
                      onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                    >
                      Xác nhận Lịch
                    </button>
                  )}
                  {booking.status === 'Confirmed' && (
                    <button 
                      className="ghost-pill-btn" 
                      style={{ padding: '6px 12px', fontSize: '12px', background: 'var(--color-almost-white)', color: '#000', borderColor: 'var(--color-almost-white)' }}
                      onClick={() => updateBookingStatus(booking.id, 'Completed')}
                    >
                      Hoàn tất & Giải ngân
                    </button>
                  )}
                  {booking.status === 'Completed' && (
                    <button className="ghost-pill-btn" style={{ padding: '6px 12px', fontSize: '12px', opacity: 0.5 }} disabled>
                      Đã xong
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderAppointments = () => (
    <>
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontFamily: 'var(--font-whyte-inktrap-mono)', fontSize: '24px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-soft-white)', textAlign: 'left', marginBottom: '16px' }}>L Ị C H   H Ẹ N</h2>
        <h1 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '48px', fontStyle: 'italic', fontWeight: 300, margin: 0, letterSpacing: '-0.03em' }}>Tất cả Đơn hàng</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        {vendorBookings.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-steel)', border: '1px dashed var(--color-steel)', borderRadius: '19.2px' }}>
            Hiện chưa có lịch hẹn nào.
          </div>
        ) : vendorBookings.map(booking => (
          <div key={booking.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px', border: '1px solid var(--color-almost-white)', borderRadius: '19.2px', background: 'rgba(237,195,196,0.05)' }}>
            <div style={{ display: 'flex', gap: '32px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '24px', fontFamily: 'var(--font-grandslang)' }}>{booking.date.split('-')[2]}</span>
                <span style={{ fontSize: '12px', color: 'var(--color-steel)', textTransform: 'uppercase' }}>Tháng {booking.date.split('-')[1]}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-whyte-inktrap)', fontWeight: 400, margin: '0 0 8px 0' }}>{booking.notes}</h3>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--color-steel)' }}>
                  <span>Khách: Lan Anh</span>
                  <span>Mã: #{booking.id}</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontFamily: 'var(--font-grandslang)', marginBottom: '8px' }}>{booking.totalPrice.toLocaleString()}đ</div>
              <span style={{ 
                display: 'inline-block',
                padding: '4px 12px', 
                borderRadius: '1584px', 
                fontSize: '12px',
                background: booking.status === 'Completed' ? 'rgba(255,255,255,0.1)' : booking.status === 'Confirmed' ? 'rgba(175, 80, 255, 0.1)' : 'rgba(255,255,255,0.2)',
                color: booking.status === 'Completed' ? 'var(--color-steel)' : booking.status === 'Confirmed' ? 'var(--color-signal-violet)' : '#fff',
                border: booking.status === 'Confirmed' ? '1px solid var(--color-signal-violet)' : '1px solid transparent'
              }}>
                {booking.status === 'Pending' ? 'Chờ xác nhận' : booking.status === 'Confirmed' ? 'Đang thực hiện' : 'Hoàn tất'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderEscrow = () => (
    <>
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontFamily: 'var(--font-whyte-inktrap-mono)', fontSize: '24px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-soft-white)', textAlign: 'left', marginBottom: '16px' }}>E S C R O W</h2>
        <h1 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '48px', fontStyle: 'italic', fontWeight: 300, margin: 0, letterSpacing: '-0.03em' }}>Dòng tiền & Giải ngân</h1>
      </div>

      <div style={{ padding: '32px', background: 'rgba(175, 80, 255, 0.05)', border: '1px solid var(--color-signal-violet)', borderRadius: '19.2px', marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', color: 'var(--color-signal-violet)' }}>
          <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Tổng tiền đang được bảo chứng (Escrow)</span>
          <ShieldCheck size={24} />
        </div>
        <div style={{ fontFamily: 'var(--font-grandslang)', fontSize: '56px', marginBottom: '8px', color: 'var(--color-signal-violet)' }}>{escrow > 0 ? <CountUp end={escrow / 1000000} decimals={1} suffix="M" /> : '0đ'}</div>
        <div style={{ fontSize: '14px', color: 'var(--color-steel)' }}>Sẽ tự động giải ngân khi khách hàng bấm xác nhận hoàn tất dịch vụ.</div>
      </div>

      <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '18px', fontWeight: 400, marginBottom: '24px' }}>Lịch sử Giao dịch</h3>
      <div style={{ border: '1px solid var(--color-almost-white)', borderRadius: '19.2px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(247,249,250,0.2)' }}>
              <th style={{ padding: '16px 32px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-steel)', fontWeight: 500 }}>Thời gian</th>
              <th style={{ padding: '16px 32px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-steel)', fontWeight: 500 }}>Loại Giao dịch</th>
              <th style={{ padding: '16px 32px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-steel)', fontWeight: 500 }}>Tham chiếu Đơn hàng</th>
              <th style={{ padding: '16px 32px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-steel)', fontWeight: 500, textAlign: 'right' }}>Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {vendorBookings.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '48px', textAlign: 'center', color: 'var(--color-steel)' }}>
                  Chưa có giao dịch nào.
                </td>
              </tr>
            ) : vendorBookings.flatMap(booking => {
              const transactions = [];
              if (booking.status === 'Completed') {
                transactions.push(
                  <tr key={`${booking.id}-completed`} style={{ borderBottom: '1px solid rgba(247,249,250,0.2)' }}>
                    <td style={{ padding: '24px 32px', fontSize: '14px', color: 'var(--color-steel)' }}>Vừa xong</td>
                    <td style={{ padding: '24px 32px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-almost-white)' }}>
                        <ArrowUpRight size={16} color="#4caf50" /> Giải ngân Chặng 3
                      </div>
                    </td>
                    <td style={{ padding: '24px 32px', fontSize: '14px', color: 'var(--color-steel)' }}>#{booking.id}</td>
                    <td style={{ padding: '24px 32px', fontSize: '16px', fontFamily: 'var(--font-whyte-inktrap)', textAlign: 'right', color: '#4caf50' }}>+{(booking.totalPrice * 0.2).toLocaleString()}đ</td>
                  </tr>
                );
              }
              if (booking.status === 'Confirmed' || booking.status === 'Completed') {
                transactions.push(
                  <tr key={`${booking.id}-confirmed`} style={{ borderBottom: '1px solid rgba(247,249,250,0.2)' }}>
                    <td style={{ padding: '24px 32px', fontSize: '14px', color: 'var(--color-steel)' }}>{booking.date}</td>
                    <td style={{ padding: '24px 32px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-signal-violet)' }}>
                        <ArrowRight size={16} /> Đóng băng Escrow Chặng 2
                      </div>
                    </td>
                    <td style={{ padding: '24px 32px', fontSize: '14px', color: 'var(--color-steel)' }}>#{booking.id}</td>
                    <td style={{ padding: '24px 32px', fontSize: '16px', fontFamily: 'var(--font-whyte-inktrap)', textAlign: 'right', color: 'var(--color-signal-violet)' }}>{(booking.totalPrice * 0.5).toLocaleString()}đ</td>
                  </tr>
                );
              }
              transactions.push(
                <tr key={`${booking.id}-pending`} style={{ borderBottom: '1px solid rgba(247,249,250,0.2)' }}>
                  <td style={{ padding: '24px 32px', fontSize: '14px', color: 'var(--color-steel)' }}>{booking.date}</td>
                  <td style={{ padding: '24px 32px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-almost-white)' }}>
                      <ArrowDownRight size={16} color="#4caf50" /> Cọc tiền Chặng 1
                    </div>
                  </td>
                  <td style={{ padding: '24px 32px', fontSize: '14px', color: 'var(--color-steel)' }}>#{booking.id}</td>
                  <td style={{ padding: '24px 32px', fontSize: '16px', fontFamily: 'var(--font-whyte-inktrap)', textAlign: 'right', color: '#4caf50' }}>+{(booking.totalPrice * 0.3).toLocaleString()}đ</td>
                </tr>
              );
              return transactions;
            })}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderMessages = () => (
    <>
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontFamily: 'var(--font-whyte-inktrap-mono)', fontSize: '24px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-soft-white)', textAlign: 'left', marginBottom: '16px' }}>I N B O X</h2>
        <h1 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '48px', fontStyle: 'italic', fontWeight: 300, margin: 0, letterSpacing: '-0.03em' }}>Tin nhắn Khách hàng</h1>
      </div>
      <div style={{ display: 'flex', height: '600px', border: '1px solid var(--color-almost-white)', borderRadius: '19.2px', overflow: 'hidden' }}>
        {/* Chat List */}
        <div style={{ width: '300px', borderRight: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500 }}>Tin nhắn gần đây</h3>
          </div>
          <div style={{ padding: '16px', background: 'rgba(175, 80, 255, 0.1)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500 }}>Nguyễn Lan Anh</span>
              <span style={{ fontSize: '12px', color: 'var(--color-steel)' }}>14:30</span>
            </div>
            <div style={{ fontSize: '14px', color: 'var(--color-steel)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Dạ vâng, em cảm ơn studio ạ!
            </div>
          </div>
          <div style={{ padding: '16px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500 }}>Trần Minh Thắng</span>
              <span style={{ fontSize: '12px', color: 'var(--color-steel)' }}>Hôm qua</span>
            </div>
            <div style={{ fontSize: '14px', color: 'var(--color-steel)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Cho mình hỏi giá gói quay phóng sự...
            </div>
          </div>
        </div>
        {/* Chat Area */}
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', background: 'rgba(237,195,196,0.02)' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-almost-white)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
              LA
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 500 }}>Nguyễn Lan Anh</h3>
              <span style={{ fontSize: '12px', color: 'var(--color-steel)' }}>Đơn hàng: #TH-8821</span>
            </div>
          </div>
          <div style={{ flexGrow: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '16px', borderTopLeftRadius: '4px', maxWidth: '70%' }}>
              Chào Studio, mình muốn hỏi gói Pre-wedding Basic có bao gồm trang phục không ạ?
            </div>
            <div style={{ alignSelf: 'flex-end', background: 'var(--color-signal-violet)', color: '#000', padding: '12px 16px', borderRadius: '16px', borderTopRightRadius: '4px', maxWidth: '70%' }}>
              Dạ chào chị Lan Anh, gói Basic bên em đã bao gồm 2 váy cưới và 1 vest chú rể rồi ạ.
            </div>
            <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '16px', borderTopLeftRadius: '4px', maxWidth: '70%' }}>
              Vậy tốt quá, mình vừa đặt cọc chặng 1 trên Trạm Hỷ rồi nhé.
            </div>
            <div style={{ alignSelf: 'flex-end', background: 'var(--color-signal-violet)', color: '#000', padding: '12px 16px', borderRadius: '16px', borderTopRightRadius: '4px', maxWidth: '70%' }}>
              Dạ vâng, em đã nhận được yêu cầu trên hệ thống. Em sẽ ấn xác nhận lịch cho chị ngay bây giờ ạ!
            </div>
            <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '16px', borderTopLeftRadius: '4px', maxWidth: '70%' }}>
              Dạ vâng, em cảm ơn studio ạ!
            </div>
          </div>
          <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <input type="text" placeholder="Nhập tin nhắn..." style={{ flexGrow: 1, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-whyte-inktrap)' }} />
              <button className="ghost-pill-btn" style={{ background: 'var(--color-almost-white)', color: '#000' }}>Gửi</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderSettings = () => (
    <>
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontFamily: 'var(--font-whyte-inktrap-mono)', fontSize: '24px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-soft-white)', textAlign: 'left', marginBottom: '16px' }}>S E T T I N G S</h2>
        <h1 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '48px', fontStyle: 'italic', fontWeight: 300, margin: 0, letterSpacing: '-0.03em' }}>Cài đặt Gian hàng</h1>
      </div>

      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--color-steel)' }}>Tên gian hàng</label>
          <input type="text" defaultValue="L'Amour Studio" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-whyte-inktrap)' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--color-steel)' }}>Mô tả ngắn</label>
          <textarea rows={4} defaultValue="Studio chụp ảnh cưới hàng đầu mang phong cách Hàn Quốc lãng mạn." style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-whyte-inktrap)', resize: 'vertical' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--color-steel)' }}>Danh mục</label>
            <select style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-whyte-inktrap)' }}>
              <option value="studio">Chụp ảnh (Studio)</option>
              <option value="decor">Trang trí</option>
              <option value="restaurant">Nhà hàng</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--color-steel)' }}>Giá hiển thị (Từ)</label>
            <input type="text" defaultValue="15,000,000đ" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-whyte-inktrap)' }} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--color-steel)' }}>Địa chỉ liên hệ</label>
          <input type="text" defaultValue="Hoàn Kiếm, Hà Nội" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-whyte-inktrap)' }} />
        </div>
        
        <div style={{ marginTop: '24px' }}>
          <button className="ghost-pill-btn" style={{ background: 'var(--color-signal-violet)', color: '#000', borderColor: 'var(--color-signal-violet)' }}>
            <Save size={18} /> Lưu thay đổi
          </button>
        </div>
      </div>
    </>
  );

  const tabs = [
    { id: 'overview', icon: <LayoutDashboard size={20} />, label: 'Tổng quan' },
    { id: 'appointments', icon: <Calendar size={20} />, label: `Lịch hẹn (${vendorBookings.length})` },
    { id: 'escrow', icon: <Wallet size={20} />, label: 'Dòng tiền Escrow' },
    { id: 'messages', icon: <MessageSquare size={20} />, label: 'Tin nhắn (1)' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Cài đặt Gian hàng' }
  ] as const;

  return (
    <div className="dashboard-layout" style={{ display: 'flex', minHeight: '100vh', background: 'transparent', paddingTop: '73px' }}>
      {/* Sidebar */}
      <aside className="dashboard-sidebar" style={{ width: '280px', flexShrink: 0, background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ marginBottom: '48px', padding: '0 16px', marginTop: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '20px', color: 'var(--color-almost-white)', marginBottom: '8px', fontWeight: 500 }}>L'Amour Studio</h3>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'var(--color-signal-violet)', color: '#000', padding: '4px 8px', borderRadius: '1584px', fontWeight: 600 }}>
            <ShieldCheck size={12} /> Đối tác Tích Xanh
          </div>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tabs.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '0',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                  background: isActive ? 'var(--color-signal-violet)' : 'transparent',
                  fontWeight: isActive ? 500 : 300,
                  fontFamily: 'var(--font-whyte-inktrap)',
                  cursor: 'pointer',
                  border: '1px solid transparent',
                  borderBottom: isActive ? 'none' : '1px solid rgba(255,255,255,0.05)'
                }}
              >
                {item.icon}
                <span style={{ fontSize: '14px' }}>{item.label}</span>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main" style={{ flexGrow: 1, padding: '60px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', overflowY: 'auto' }}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'appointments' && renderAppointments()}
        {activeTab === 'escrow' && renderEscrow()}
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'settings' && renderSettings()}
      </main>
    </div>
  );
}
