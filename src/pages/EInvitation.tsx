import { useState } from 'react';
import { Share2, Link as LinkIcon, Globe, MessageCircle, X } from 'lucide-react';
import { showToast } from '../components/Toast';

export default function EInvitation() {
  const [groom, setGroom] = useState('Trần Văn A');
  const [bride, setBride] = useState('Nguyễn Thị B');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('11:00');
  const [location, setLocation] = useState('Nhà hàng tiệc cưới White Palace, 194 Hoàng Văn Thụ, Phú Nhuận');
  const [templateColor, setTemplateColor] = useState('var(--color-signal-violet)');
  const [bank, setBank] = useState('MBBank');
  const [bankAcc, setBankAcc] = useState('19036789999');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState({ id: 1, name: 'Minimalist Arch', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' });

  const templates = [
    { id: 1, name: 'Minimalist Arch', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Classic Red', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Vintage Floral', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Modern Elegant', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];

  const colorOptions = [
    { id: 'violet', label: 'Violet', value: 'var(--color-signal-violet)' },
    { id: 'champagne', label: 'Champagne', value: '#D4AF37' },
    { id: 'rose', label: 'Rose', value: '#991B1B' },
    { id: 'emerald', label: 'Emerald', value: '#064E3B' },
    { id: 'blush', label: 'Blush', value: '#FDF2F8' },
  ];

  // Format date for display
  const displayDate = new Date(date).toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div style={{ paddingBottom: '120px', paddingTop: '100px' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <h2 className="stamped-heading" style={{ textAlign: 'center', marginBottom: '32px' }}>E - I N V I T A T I O N</h2>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '56px', fontStyle: 'italic', fontWeight: 300, margin: '0 0 16px 0', letterSpacing: '-0.03em' }}>Tạo Thiệp Mời Cưới</h1>
          <p style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '18px', color: 'var(--color-steel)' }}>
            {step === 1 ? 'Bước 1: Chọn mẫu thiệp phù hợp với phong cách của bạn.' : 'Bước 2: Điền thông tin chi tiết để hoàn thiện.'}
          </p>
        </div>

        {step === 1 && (
          <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', marginBottom: '40px' }}>
              {templates.map(tpl => (
                <div 
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '24px',
                    padding: '8px',
                    background: selectedTemplate.id === tpl.id ? 'var(--color-signal-violet)' : 'rgba(255,255,255,0.05)',
                    transition: 'all 0.3s ease',
                    transform: selectedTemplate.id === tpl.id ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: selectedTemplate.id === tpl.id ? '0 12px 32px rgba(175, 80, 255, 0.3)' : 'none'
                  }}
                >
                  <div style={{ width: '100%', aspectRatio: '3/4.5', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                    <img src={tpl.image} alt={tpl.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '16px 8px', textAlign: 'center', color: selectedTemplate.id === tpl.id ? '#000' : '#fff', fontFamily: 'var(--font-whyte-inktrap)', fontWeight: 600 }}>
                    {tpl.name}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setStep(2)}
                className="ghost-pill-btn" 
                style={{ background: 'var(--color-signal-violet)', color: '#000', borderColor: 'var(--color-signal-violet)', padding: '16px 40px', fontSize: '16px' }}
              >
                Tiếp tục điền thông tin <Share2 size={20} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', animation: 'fadeInUp 0.4s ease-out' }}>
            
            {/* Left Column: Input Form */}
          <div style={{ background: 'rgba(237,195,196,0.05)', padding: '40px', borderRadius: '19.2px', border: '1px solid var(--color-almost-white)' }}>
            <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '20px', marginBottom: '32px', color: 'var(--color-almost-white)', fontWeight: 400 }}>Thông tin thiệp mời</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '12px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', color: 'var(--color-steel)' }}>Tên Chú rể</label>
                <input 
                  type="text" 
                  value={groom} 
                  onChange={(e) => setGroom(e.target.value)}
                  style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid rgba(247,249,250,0.2)', background: 'var(--color-near-black)', color: 'var(--color-almost-white)', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', outline: 'none' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '12px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', color: 'var(--color-steel)' }}>Tên Cô dâu</label>
                <input 
                  type="text" 
                  value={bride} 
                  onChange={(e) => setBride(e.target.value)}
                  style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid rgba(247,249,250,0.2)', background: 'var(--color-near-black)', color: 'var(--color-almost-white)', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', outline: 'none' }} 
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '12px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', color: 'var(--color-steel)' }}>Ngày</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid rgba(247,249,250,0.2)', background: 'var(--color-near-black)', color: 'var(--color-almost-white)', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', outline: 'none' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '12px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', color: 'var(--color-steel)' }}>Giờ</label>
                  <input 
                    type="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                    style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid rgba(247,249,250,0.2)', background: 'var(--color-near-black)', color: 'var(--color-almost-white)', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', outline: 'none' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '12px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', color: 'var(--color-steel)' }}>Địa điểm tổ chức</label>
                <textarea 
                  rows={3}
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid rgba(247,249,250,0.2)', background: 'var(--color-near-black)', color: 'var(--color-almost-white)', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', outline: 'none', resize: 'vertical' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '12px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', color: 'var(--color-steel)' }}>Ngân hàng nhận mừng</label>
                  <select 
                    value={bank} 
                    onChange={(e) => setBank(e.target.value)}
                    style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid rgba(247,249,250,0.2)', background: 'var(--color-near-black)', color: 'var(--color-almost-white)', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', outline: 'none', appearance: 'none' }}
                  >
                    <option value="MBBank">MB Bank (Quân Đội)</option>
                    <option value="Vietcombank">Vietcombank</option>
                    <option value="Techcombank">Techcombank</option>
                    <option value="VPBank">VPBank</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '12px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', color: 'var(--color-steel)' }}>Số tài khoản</label>
                  <input 
                    type="text" 
                    value={bankAcc} 
                    onChange={(e) => setBankAcc(e.target.value)}
                    style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid rgba(247,249,250,0.2)', background: 'var(--color-near-black)', color: 'var(--color-almost-white)', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', outline: 'none' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '12px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', color: 'var(--color-steel)' }}>Phong cách (Màu chủ đạo)</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {colorOptions.map(c => (
                    <button 
                      key={c.id} 
                      onClick={() => setTemplateColor(c.value)}
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        background: c.value, 
                        border: templateColor === c.value ? '2px solid var(--color-almost-white)' : '2px solid transparent',
                        cursor: 'pointer'
                      }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="ghost-pill-btn" 
                style={{ background: templateColor, color: templateColor === '#FDF2F8' ? '#000' : '#fff', borderColor: templateColor, justifyContent: 'center', marginTop: '16px', padding: '16px' }}
              >
                <Share2 size={20} style={{ marginRight: '8px' }} /> Lưu và Chia sẻ thiệp
              </button>
            </div>
          </div>

          {/* Right Column: Live Preview */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(237,195,196,0.02)', padding: '40px', borderRadius: '19.2px', border: '1px dashed rgba(247,249,250,0.2)' }}>
            
            {/* Card Mockup */}
            <div style={{ 
              width: '100%', 
              maxWidth: '420px', 
              aspectRatio: '1 / 1.6',
              borderRadius: '200px 200px 16px 16px', 
              padding: '16px', 
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
              background: '#0a0a0a',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s ease',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              e.currentTarget.style.boxShadow = `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px ${templateColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)';
            }}
            >
              {/* Background Layers */}
              <div style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `url("${selectedTemplate.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.6,
                zIndex: 0,
                filter: 'grayscale(30%) sepia(20%)'
              }}></div>
              
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: `linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.8) 50%, rgba(10,10,10,0.95) 100%)`,
                zIndex: 1
              }}></div>
              
              {/* Content Container */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                border: `1px solid rgba(255,255,255,0.15)`,
                borderRadius: '184px 184px 12px 12px',
                height: '100%',
                padding: '60px 24px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(2px)'
              }}>
                {/* Top Section */}
                <div>
                  <div style={{ 
                    fontFamily: 'var(--font-whyte-inktrap-mono)', 
                    color: templateColor, 
                    fontSize: '10px', 
                    marginBottom: '32px', 
                    letterSpacing: '0.4em', 
                    textTransform: 'uppercase' 
                  }}>
                    Together with their families
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h2 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '56px', color: '#fff', margin: '0', lineHeight: 1, fontWeight: 300, letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                      {groom || 'Groom Name'}
                    </h2>
                    
                    <div style={{ fontFamily: 'var(--font-grandslang)', fontSize: '24px', color: templateColor, fontStyle: 'italic', margin: '4px 0' }}>
                      and
                    </div>
                    
                    <h2 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '56px', color: '#fff', margin: '0', lineHeight: 1, fontWeight: 300, letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                      {bride || 'Bride Name'}
                    </h2>
                  </div>
                </div>

                {/* Bottom Section */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ 
                    width: '1px', 
                    height: '40px', 
                    background: `linear-gradient(180deg, transparent, ${templateColor})`, 
                    margin: '0 auto 24px' 
                  }}></div>

                  <div style={{ color: '#fff', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '13px', fontWeight: 300, letterSpacing: '0.05em', lineHeight: 1.8, marginBottom: '24px', opacity: 0.9 }}>
                    <div style={{ textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px', color: templateColor }}>{displayDate}</div>
                    <div>at {time}</div>
                    <div style={{ maxWidth: '80%', margin: '8px auto 0' }}>{location || 'Wedding Venue Location'}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ background: '#fff', padding: '6px', borderRadius: '8px' }}>
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://vietqr.me/api/qr/${bank}/${bankAcc}?amount=500000%26addInfo=Mung%2520cuoi%2520${encodeURIComponent(groom)}%2520va%2520${encodeURIComponent(bride)}`} 
                        alt="Wedding QR"
                        style={{ width: '64px', height: '64px', display: 'block' }}
                      />
                    </div>
                    <span style={{ marginTop: '12px', fontFamily: 'var(--font-whyte-inktrap-mono)', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Scan to Bless</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--color-near-black)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '40px', width: '90%', maxWidth: '400px', position: 'relative', animation: 'fadeInUp 0.3s ease-out' }}>
            <button 
              onClick={() => setIsShareModalOpen(false)}
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--color-steel)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '24px', color: '#fff', margin: '0 0 8px 0', textAlign: 'center' }}>Chia sẻ thiệp cưới</h3>
            <p style={{ color: 'var(--color-steel)', fontSize: '14px', textAlign: 'center', marginBottom: '32px' }}>Thiệp cưới điện tử của bạn đã sẵn sàng để gửi đến khách mời.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#0084FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <MessageCircle size={24} />
                </div>
                <span style={{ fontSize: '12px', color: 'var(--color-almost-white)' }}>Zalo</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Globe size={24} />
                </div>
                <span style={{ fontSize: '12px', color: 'var(--color-almost-white)' }}>Facebook</span>
              </div>
              <div 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                onClick={() => {
                  navigator.clipboard.writeText('https://tramhy.com/invite/minh-hang');
                  showToast('Đã copy link thiệp cưới!', 'success');
                }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <LinkIcon size={24} />
                </div>
                <span style={{ fontSize: '12px', color: 'var(--color-almost-white)' }}>Copy Link</span>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input 
                type="text" 
                readOnly 
                value="https://tramhy.com/invite/minh-hang" 
                style={{ background: 'transparent', border: 'none', color: 'var(--color-steel)', width: '100%', outline: 'none', fontFamily: 'var(--font-whyte-inktrap)' }} 
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('https://tramhy.com/invite/minh-hang');
                  showToast('Đã copy link!', 'success');
                }}
                style={{ background: 'var(--color-signal-violet)', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-whyte-inktrap)' }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
