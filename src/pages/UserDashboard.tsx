import { useState } from 'react';
import { ShieldCheck, Clock, CheckCircle2, LayoutDashboard, Calendar as CalendarIcon, FileText, Heart, Wallet, Printer } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function UserDashboard() {
  const { bookings, updateBookingStatus } = useBooking();
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Tổng Quan', icon: <LayoutDashboard size={20} /> },
    { id: 'appointments', label: 'Lịch Hẹn', icon: <CalendarIcon size={20} /> },
    { id: 'contracts', label: 'Hợp Đồng & Escrow', icon: <FileText size={20} /> },
    { id: 'saved', label: 'Đã Lưu', icon: <Heart size={20} /> }
  ];

  return (
    <div style={{ paddingBottom: '120px', paddingTop: '100px', display: 'flex', gap: '32px', maxWidth: '1400px', margin: '0 auto', padding: '100px 32px 120px' }}>
      
      {/* Sidebar */}
      <div style={{ width: '280px', flexShrink: 0 }}>
        <div style={{ position: 'sticky', top: '120px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #AF50FF 0%, #7622FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>
              LA
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '18px', color: '#fff' }}>Lan Anh</div>
              <div style={{ fontSize: '13px', color: 'var(--color-steel)' }}>Ngày cưới: 15/10/2026</div>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', borderRadius: '12px', border: 'none',
                  background: activeTab === item.id ? 'rgba(175, 80, 255, 0.1)' : 'transparent',
                  color: activeTab === item.id ? 'var(--color-signal-violet)' : 'var(--color-steel)',
                  fontFamily: 'var(--font-whyte-inktrap)', fontSize: '15px', cursor: 'pointer',
                  textAlign: 'left', transition: 'all 0.2s'
                }}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        {activeTab === 'overview' && (
          <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
            <h2 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '48px', fontStyle: 'italic', fontWeight: 300, margin: '0 0 32px 0' }}>Tổng Quan Kế Hoạch</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px' }}>
                <div style={{ color: 'var(--color-steel)', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Wallet size={16} /> Ngân sách đã chi
                </div>
                <div style={{ fontSize: '32px', color: '#fff', fontFamily: 'var(--font-grandslang)' }}>
                  {bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}đ
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px' }}>
                <div style={{ color: 'var(--color-steel)', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} /> Hợp đồng
                </div>
                <div style={{ fontSize: '32px', color: '#fff', fontFamily: 'var(--font-grandslang)' }}>
                  {bookings.length} <span style={{ fontSize: '16px', color: 'var(--color-steel)', fontFamily: 'var(--font-whyte-inktrap)' }}>dịch vụ</span>
                </div>
              </div>
              <div style={{ background: 'rgba(175, 80, 255, 0.05)', border: '1px solid rgba(175, 80, 255, 0.2)', borderRadius: '20px', padding: '24px' }}>
                <div style={{ color: 'var(--color-signal-violet)', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} /> Số dư Escrow (Trạm Hỷ giữ)
                </div>
                <div style={{ fontSize: '32px', color: 'var(--color-signal-violet)', fontFamily: 'var(--font-grandslang)' }}>
                  {(bookings.reduce((sum, b) => sum + b.totalPrice, 0) * 0.5).toLocaleString()}đ
                </div>
              </div>
            </div>
            
            <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '20px', color: '#fff', marginBottom: '24px' }}>Lịch trình sắp tới</h3>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-steel)', textTransform: 'uppercase' }}>Thg 10</span>
                  <span style={{ fontSize: '24px', color: '#fff', fontWeight: 'bold' }}>12</span>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#fff' }}>Thử váy cưới tại L'Amour Studio</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-steel)' }}>14:00 - 16:00 | Nguyễn Đình Chiểu, Quận 3</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '48px', fontStyle: 'italic', fontWeight: 300, letterSpacing: '-0.03em', margin: '0 0 16px 0' }}>Hợp Đồng & Thanh Toán</h2>
              <p style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', color: 'var(--color-steel)' }}>Quản lý các khoản thanh toán an toàn qua cổng Escrow của Trạm Hỷ.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {bookings.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-steel)', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '24px' }}>
                  Bạn chưa có hợp đồng nào. Hãy khám phá Dịch vụ nhé!
                </div>
              ) : bookings.map(booking => (
                <div key={booking.id} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '32px', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '24px', marginBottom: '24px' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '24px', fontWeight: 400, margin: '0 0 8px 0', color: '#fff' }}>{booking.vendorName}</h3>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--color-steel)' }}>
                        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>ID: {booking.id}</span>
                        <span>•</span>
                        <span>{booking.notes || "Gói dịch vụ cao cấp"}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-grandslang)', fontSize: '32px', color: 'var(--color-signal-violet)' }}>
                        {booking.totalPrice.toLocaleString()}đ
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h4 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0', color: 'var(--color-steel)' }}>Tiến độ thanh toán Escrow</h4>
                    
                    {[
                      { name: 'Chặng 1: Giữ lịch', amount: booking.totalPrice * 0.3, status: 'completed' },
                      { name: 'Chặng 2: Hoàn tất dịch vụ', amount: booking.totalPrice * 0.5, status: 'escrow' },
                      { name: 'Chặng 3: Nghiệm thu', amount: booking.totalPrice * 0.2, status: 'pending' }
                    ].map((ms, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: ms.status === 'escrow' ? 'rgba(175, 80, 255, 0.05)' : 'rgba(255,255,255,0.02)', border: ms.status === 'escrow' ? '1px solid rgba(175, 80, 255, 0.3)' : '1px solid transparent', borderRadius: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {ms.status === 'completed' && <CheckCircle2 size={18} color="var(--color-steel)" />}
                          {ms.status === 'escrow' && <ShieldCheck size={18} color="var(--color-signal-violet)" />}
                          {ms.status === 'pending' && <Clock size={18} color="var(--color-steel)" />}
                          <span style={{ fontFamily: 'var(--font-whyte-inktrap)', color: ms.status === 'completed' ? 'var(--color-steel)' : '#fff' }}>{ms.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                          <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontWeight: 500, color: ms.status === 'completed' ? 'var(--color-steel)' : '#fff' }}>{ms.amount.toLocaleString()}đ</span>
                          
                          <div style={{ width: '180px', textAlign: 'right' }}>
                            {ms.status === 'completed' && <span style={{ fontSize: '12px', color: 'var(--color-steel)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Đã thanh toán</span>}
                            {ms.status === 'escrow' && <span style={{ fontSize: '12px', color: 'var(--color-signal-violet)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}><ShieldCheck size={14} /> Trạm Hỷ đang giữ</span>}
                            {ms.status === 'pending' && <button className="ghost-pill-btn" style={{ padding: '8px 16px', fontSize: '12px', width: '100%', justifyContent: 'center' }}>Thanh toán</button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px dashed rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
                    {booking.status === 'Confirmed' ? (
                      <button 
                        onClick={() => updateBookingStatus(booking.id, 'Completed')}
                        className="ghost-pill-btn" 
                        style={{ background: 'var(--color-signal-violet)', color: '#000', borderColor: 'var(--color-signal-violet)' }}
                      >
                        Xác nhận nghiệm thu (Giải ngân)
                      </button>
                    ) : booking.status === 'Completed' ? (
                      <div style={{ color: 'var(--color-steel)' }}>Đã hoàn tất nghiệm thu</div>
                    ) : (
                      <div style={{ color: 'var(--color-steel)' }}>Đang thực hiện ({booking.status})</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
            <h2 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '48px', fontStyle: 'italic', fontWeight: 300, margin: '0 0 32px 0' }}>Lịch Hẹn Của Bạn</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              {bookings.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-steel)', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '24px' }}>
                  Bạn chưa có lịch hẹn nào.
                </div>
              ) : bookings.map(booking => (
                <div key={booking.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(175, 80, 255, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-signal-violet)' }}>
                      <span style={{ fontSize: '28px', fontFamily: 'var(--font-grandslang)' }}>{booking.date.split('-')[2] || '15'}</span>
                      <span style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 600 }}>Thg {booking.date.split('-')[1] || '10'}</span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-whyte-inktrap)', fontWeight: 400, margin: '0 0 8px 0', color: '#fff' }}>{booking.vendorName}</h3>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--color-steel)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> 14:00 - 16:00</span>
                        <span>•</span>
                        <span>{booking.notes}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button 
                      className="ghost-pill-btn" 
                      style={{ background: 'var(--color-signal-violet)', color: '#000', border: '1px solid var(--color-signal-violet)' }}
                      onClick={() => {
                        const printable = document.getElementById('printable-boarding-pass');
                        if (printable) {
                          printable.innerHTML = `
                            <div style="width: 800px; margin: 40px auto; border: 2px solid #000; border-radius: 20px; font-family: 'Courier New', Courier, monospace; overflow: hidden; background: #fff;">
                              <div style="background: #000; color: #fff; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center;">
                                <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">TRAM HY BOARDING PASS</h1>
                                <span style="font-size: 18px;">FLIGHT: TH-${booking.id}</span>
                              </div>
                              <div style="padding: 40px; display: grid; grid-template-columns: 2fr 1fr; gap: 40px;">
                                <div>
                                  <div style="margin-bottom: 24px;">
                                    <div style="font-size: 12px; color: #666;">PASSENGER NAME</div>
                                    <div style="font-size: 24px; font-weight: bold;">MINH HANG & PARTNER</div>
                                  </div>
                                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                                    <div>
                                      <div style="font-size: 12px; color: #666;">VENDOR</div>
                                      <div style="font-size: 20px; font-weight: bold;">${booking.vendorName}</div>
                                    </div>
                                    <div>
                                      <div style="font-size: 12px; color: #666;">SERVICE</div>
                                      <div style="font-size: 16px;">${booking.notes || "Gói tiêu chuẩn"}</div>
                                    </div>
                                  </div>
                                  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px;">
                                    <div>
                                      <div style="font-size: 12px; color: #666;">DATE</div>
                                      <div style="font-size: 18px; font-weight: bold;">${booking.date}</div>
                                    </div>
                                    <div>
                                      <div style="font-size: 12px; color: #666;">TIME</div>
                                      <div style="font-size: 18px; font-weight: bold;">14:00</div>
                                    </div>
                                    <div>
                                      <div style="font-size: 12px; color: #666;">STATUS</div>
                                      <div style="font-size: 18px; font-weight: bold; text-transform: uppercase;">${booking.status}</div>
                                    </div>
                                  </div>
                                </div>
                                <div style="border-left: 2px dashed #ccc; padding-left: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TRAMHY-${booking.id}" style="width: 150px; height: 150px; margin-bottom: 16px;" />
                                  <div style="font-size: 12px; text-align: center;">SCAN TO VERIFY</div>
                                </div>
                              </div>
                            </div>
                          `;
                          window.print();
                        }
                      }}
                    >
                      <Printer size={16} style={{ marginRight: '8px' }} /> In Vé
                    </button>
                    <button className="ghost-pill-btn" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', justifyContent: 'center' }}>
                      Đổi lịch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
            <h2 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '48px', fontStyle: 'italic', fontWeight: 300, margin: '0 0 32px 0' }}>Yêu Thích Đã Lưu</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {[
                { name: "L'Amour Studio", category: 'Chụp ảnh', img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80', rating: '4.9' },
                { name: "Dreamy Decor", category: 'Trang trí', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', rating: '4.9' }
              ].map((vendor, idx) => (
                <div key={idx} style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                  <img src={vendor.img} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Heart size={20} fill="var(--color-signal-violet)" color="var(--color-signal-violet)" />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ color: 'var(--color-signal-violet)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '8px' }}>{vendor.category}</div>
                    <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '20px', color: '#fff', margin: '0 0 8px 0' }}>{vendor.name}</h3>
                    <div style={{ fontSize: '14px', color: 'var(--color-steel)' }}>⭐ {vendor.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      <div id="printable-boarding-pass" className="no-print"></div>
    </div>
  );
}
