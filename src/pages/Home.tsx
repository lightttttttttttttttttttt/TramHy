import { useState } from 'react';

export default function Home() {
  const [aiBudget, setAiBudget] = useState('150000000');
  const [budgetResults, setBudgetResults] = useState<{label: string, percent: number, amount: number}[] | null>(null);

  const calculateBudget = () => {
    const total = parseInt(aiBudget) || 0;
    setBudgetResults([
      { label: 'Nhà hàng tiệc cưới', percent: 60, amount: total * 0.6 },
      { label: 'Chụp ảnh & Quay phim', percent: 15, amount: total * 0.15 },
      { label: 'Trang trí & Concept', percent: 10, amount: total * 0.1 },
      { label: 'Váy cưới & Makeup', percent: 10, amount: total * 0.1 },
      { label: 'Chi phí dự phòng', percent: 5, amount: total * 0.05 },
    ]);
  };

  return (
    <div className="home-page" style={{ color: 'var(--color-almost-white)', position: 'relative', overflow: 'hidden' }}>
      {/* Hero Section: Boarding Pass */}
      <section className="hero-boarding-pass" style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', zIndex: 1 }}>
        
        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', maxWidth: 'var(--page-max-width)' }}>
          {/* Left Column: Typographic Drama */}
          <div style={{ flex: '0 0 55%' }}>
            <h1 style={{ margin: 0, lineHeight: 0.9 }}>
              <span style={{ fontFamily: 'var(--font-grandslang)', fontSize: '146px', fontStyle: 'italic', display: 'block', fontWeight: 300, letterSpacing: '-0.03em' }}>Đám cưới</span>
              <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '64px', fontWeight: 400, display: 'block', letterSpacing: '-0.64px' }}>không rủi ro</span>
              <span style={{ fontFamily: 'var(--font-grandslang)', fontSize: '88px', fontStyle: 'italic', display: 'block', fontWeight: 300, letterSpacing: '-0.03em' }}>với Trạm Hỷ</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '20px', fontWeight: 300, color: 'var(--color-almost-white)', opacity: 0.8, marginTop: '24px', maxWidth: '400px' }}>
              Nền tảng bảo chứng giao dịch cưới hỏi tiên phong, giúp bạn lên kế hoạch và quản lý ngân sách an toàn tuyệt đối.
            </p>
          </div>
          
          {/* Right Column: Glass Card Detailed Info */}
          <div style={{ flex: '0 0 40%' }}>
            <div style={{ background: 'rgba(237,195,196,0.05)', border: '1px solid var(--color-almost-white)', borderRadius: '19.2px', padding: '40px', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500, color: 'var(--color-signal-violet)' }}>Về Trạm Hỷ</span>
                <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', color: 'var(--color-steel)' }}>NỀN TẢNG BẢO CHỨNG</span>
              </div>
              
              <h2 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '32px', fontWeight: 400, margin: 0, lineHeight: 1.2 }}>
                Ngày Cưới Trọn Vẹn,<br/>Bảo Chứng An Tâm
              </h2>
              
              <p style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', color: 'var(--color-almost-white)', opacity: 0.9, lineHeight: 1.6, margin: 0 }}>
                Trạm Hỷ là nền tảng đầu tiên tại Việt Nam bảo vệ dòng tiền ngày cưới của bạn bằng cơ chế ký quỹ thông minh (Milestone Pay).
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                {[
                  'Bảo vệ 100% dòng tiền thanh toán',
                  'Giải ngân theo đúng tiến độ hợp đồng',
                  'Hơn 500+ đối tác được xác thực uy tín',
                  'Trợ lý AI phân bổ ngân sách chuẩn xác'
                ].map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ background: 'var(--color-almost-white)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '15px', color: 'var(--color-almost-white)' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 1: AI Budgeting */}
      <section style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="container" style={{ maxWidth: 'var(--page-max-width)' }}>
          <h2 className="stamped-heading">AI Budgeting</h2>
          
          <div style={{ display: 'flex', gap: '40px', marginTop: '60px', alignItems: 'flex-start' }}>
            {/* Violet Bloom Card */}
            <div style={{ flex: '0 0 40%', background: 'var(--color-signal-violet)', borderRadius: '19.2px', padding: '40px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '32px', fontWeight: 400, margin: '0 0 24px 0', color: '#000' }}>Trợ lý AI Ngân Sách</h3>
              <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#000' }}>Nhập tổng ngân sách dự kiến, AI sẽ phân bổ tỷ lệ hoàn hảo dựa trên dữ liệu thị trường.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input 
                  type="number" 
                  value={aiBudget}
                  onChange={(e) => setAiBudget(e.target.value)}
                  placeholder="Nhập ngân sách (VNĐ)" 
                  style={{ padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.8)', color: '#000', fontSize: '16px', fontFamily: 'var(--font-whyte-inktrap)' }} 
                />
                <button onClick={calculateBudget} className="ghost-pill-btn" style={{ background: '#000', color: '#fff', borderColor: '#000', justifyContent: 'center', padding: '16px', borderRadius: '12px' }}>
                  Tính Toán Ngân Sách
                </button>
              </div>
            </div>
            
            {/* Results Table */}
            <div style={{ flex: 1 }}>
              {budgetResults ? (
                <div style={{ background: 'rgba(237,195,196,0.05)', borderRadius: '19.2px', padding: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h4 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '20px', margin: '0 0 24px 0', color: 'var(--color-almost-white)' }}>Bảng Phân Bổ Tối Ưu</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {budgetResults.map((res, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-signal-violet)' }}>{res.percent}%</span>
                          <span style={{ fontSize: '16px', color: 'var(--color-almost-white)' }}>{res.label}</span>
                        </div>
                        <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', color: 'var(--color-almost-white)' }}>{res.amount.toLocaleString()}đ</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '300px', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '19.2px' }}>
                  <p style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', color: 'var(--color-steel)' }}>Chưa có dữ liệu tính toán.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Escrow */}
      <section style={{ paddingBottom: '120px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: 'var(--page-max-width)' }}>
          <h2 className="stamped-heading">Escrow Payment</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '60px', position: 'relative' }}>
            {/* Route connecting line */}
            <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '1px', background: 'rgba(247,249,250,0.2)', zIndex: 0 }}></div>
            
            {/* Comparison/Process Cards */}
            {[
              { num: '01', title: 'Ký hợp đồng', desc: 'Giữ tiền an toàn trên hệ thống.' },
              { num: '02', title: 'Giữ lịch', desc: 'Giải ngân một phần để vendor chốt lịch.' },
              { num: '03', title: 'Thực hiện', desc: 'Vendor tiến hành cung cấp dịch vụ.' },
              { num: '04', title: 'Hoàn tất', desc: 'Thanh toán phần còn lại sau khi hài lòng.' }
            ].map((step, idx) => (
              <div key={idx} style={{ background: 'rgba(9, 9, 9, 0.6)', backdropFilter: 'blur(10px)', borderRadius: '19.2px', padding: '40px', position: 'relative', zIndex: 1, border: '1px solid rgba(247,249,250,0.2)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '64px', fontWeight: 700, color: 'rgba(247,249,250,0.03)', fontFamily: 'var(--font-grandslang)', fontStyle: 'italic', lineHeight: 0.8 }}>
                  {step.num}
                </div>
                <h4 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', fontWeight: 500, marginBottom: '8px', zIndex: 2, textTransform: 'uppercase' }}>{step.title}</h4>
                <p style={{ color: 'var(--color-almost-white)', fontSize: '14px', zIndex: 2 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature 3: Top Verified Vendors */}
      <section style={{ paddingBottom: '120px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: 'var(--page-max-width)' }}>
          <h2 className="stamped-heading">Top Vendors</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '60px' }}>
            {[
              { name: 'TuArt Wedding', type: 'Studio Chụp Ảnh', rating: '4.9', price: 'Từ 15.000.000đ', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400' },
              { name: 'Luxe Weddings', type: 'Nhà Hàng Tiệc Cưới', rating: '5.0', price: 'Từ 80.000.000đ', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=400' },
              { name: '7799 Storyteller', type: 'Trang Trí Cưới', rating: '4.8', price: 'Từ 20.000.000đ', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=400' },
              { name: 'Nupakachi Studio', type: 'Studio Chụp Ảnh', rating: '4.9', price: 'Từ 18.000.000đ', img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=400' },
              { name: 'White Palace', type: 'Nhà Hàng Tiệc Cưới', rating: '4.7', price: 'Từ 65.000.000đ', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400' },
              { name: 'Bul Nguyễn Makeup', type: 'Trang Điểm & Váy Cưới', rating: '5.0', price: 'Từ 8.500.000đ', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400' }
            ].map((vendor, i) => (
              <div key={i} style={{ background: 'rgba(237,195,196,0.05)', borderRadius: '19.2px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                  <img src={vendor.img} alt={vendor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-whyte-inktrap)', fontSize: '20px', color: 'var(--color-almost-white)' }}>{vendor.name}</h3>
                    <div style={{ background: '#4caf50', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  </div>
                  <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--color-steel)' }}>{vendor.type}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '14px', color: 'var(--color-almost-white)', fontWeight: 500 }}>{vendor.price}</span>
                    <span style={{ fontSize: '14px', color: '#ffb400' }}>★ {vendor.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coordinate Footer */}
      <footer style={{ background: 'transparent', padding: '0', marginTop: '120px', position: 'relative', zIndex: 1 }}>
        <div style={{ background: '#090909', width: '100%', padding: '24px 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', maxWidth: 'var(--page-max-width)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-almost-white)' }}>
              <span style={{ fontSize: '18px' }}>+</span>
              <span>Fly Direct</span>
              <span>Trạm Hỷ Escrow</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-almost-white)' }}>
              <span>21.0285° N, 105.8542° E</span>
              <span>♥</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
