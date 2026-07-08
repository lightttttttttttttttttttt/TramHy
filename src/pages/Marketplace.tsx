import { useState } from 'react';
import { Camera, Flower2, Scissors, Utensils, Star, ShieldCheck, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export default function Marketplace() {
  const navigate = useNavigate();
  const { vendors } = useBooking();
  const [activeCategory, setActiveCategory] = useState('studio');
  const [budget] = useState(() => localStorage.getItem('tramhy_selected_budget') || '');
  const [region] = useState(() => localStorage.getItem('tramhy_selected_region') || 'Hà Nội');

  const categories = [
    { id: 'studio', name: 'Studio', icon: <Camera size={24} strokeWidth={1} /> },
    { id: 'decor', name: 'Decor', icon: <Flower2 size={24} strokeWidth={1} /> },
    { id: 'makeup', name: 'Makeup', icon: <Scissors size={24} strokeWidth={1} /> },
    { id: 'restaurant', name: 'Venue', icon: <Utensils size={24} strokeWidth={1} /> }
  ];

  const filteredVendors = vendors.filter(v => v.category === activeCategory);

  return (
    <div style={{ paddingBottom: '120px', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: 'var(--page-max-width)' }}>
        
        <h2 style={{ fontFamily: 'var(--font-whyte-inktrap-mono)', fontSize: '24px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-soft-white)', textAlign: 'center', marginBottom: '16px' }}>M A R K E T P L A C E</h2>
        
        <div style={{ marginTop: '40px', marginBottom: '60px' }}>
          <h1 style={{ margin: 0, lineHeight: 0.9 }}>
            <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '64px', fontWeight: 400, display: 'block', letterSpacing: '-0.64px' }}>Tìm kiếm Vendor</span>
            <span style={{ fontFamily: 'var(--font-grandslang)', fontSize: '88px', fontStyle: 'italic', display: 'block', fontWeight: 300, letterSpacing: '-0.03em' }}>uy tín & an toàn</span>
          </h1>
        </div>

        {/* Categories (Violet Bloom Style) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {categories.map(cat => (
            <div 
              key={cat.id} 
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: activeCategory === cat.id ? 'var(--color-signal-violet)' : 'rgba(237,195,196,0.05)',
                border: '1px solid var(--color-almost-white)',
                borderRadius: '19.2px',
                padding: '32px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                color: activeCategory === cat.id ? '#000' : 'var(--color-almost-white)',
                transition: 'all 0.2s ease'
              }}
            >
              {cat.icon}
              <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '18px', fontWeight: 500, margin: 0 }}>{cat.name}</h3>
            </div>
          ))}
        </div>

        {/* Smart Filters */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '24px',
          background: 'rgba(237,195,196,0.05)',
          border: '1px solid var(--color-almost-white)',
          borderRadius: '19.2px',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>+</span>
            <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontWeight: 500 }}>Bộ lọc thông minh</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {['Khu vực: ' + region, 'Khoảng giá: ' + (budget ? (parseInt(budget)/1000000) + 'M' : 'Tất cả'), 'Đánh giá'].map(filter => (
              <button key={filter} className="ghost-pill-btn" style={{ padding: '8px 16px', fontSize: '12px' }}>
                {filter} <ChevronDown size={14} style={{ marginLeft: 4 }} />
              </button>
            ))}
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-signal-violet)' }} /> 
              <span>Chỉ hiện Tích xanh</span>
            </label>
          </div>
        </div>

        {/* Vendor Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {filteredVendors.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '60px', textAlign: 'center', color: 'var(--color-steel)', fontFamily: 'var(--font-whyte-inktrap)' }}>
              Chưa có nhà cung cấp nào trong danh mục này.
            </div>
          ) : filteredVendors.map(v => (
            <div 
              key={v.id}
              onClick={() => navigate(`/vendor/${v.id}`)}
              style={{
                border: '1px solid var(--color-almost-white)',
                borderRadius: '19.2px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '240px', position: 'relative' }}>
                <img src={v.img} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {v.verified && (
                  <div style={{ position: 'absolute', top: 16, right: 16, background: 'var(--color-signal-violet)', color: '#000', padding: '4px 12px', borderRadius: '1584px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={12} /> Tích Xanh
                  </div>
                )}
              </div>
              <div style={{ padding: '24px', background: 'rgba(237,195,196,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'var(--color-steel)' }}>
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>{v.category}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} fill="var(--color-signal-violet)" color="var(--color-signal-violet)" /> {v.rating}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '24px', fontWeight: 400, margin: '0 0 16px 0' }}>{v.name}</h3>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-whyte-inktrap)', fontWeight: 300 }}>{v.price}</span>
                  <span style={{ fontSize: '18px' }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
