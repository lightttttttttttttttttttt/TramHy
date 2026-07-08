import { useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const defaultTasks = [
  { id: 1, text: "Xác định ngân sách và khách mời", done: true },
  { id: 2, text: "Chọn ngày cưới", done: true },
  { id: 3, text: "Đặt nhà hàng (trên Trạm Hỷ)", done: false },
  { id: 4, text: "Chụp ảnh Pre-wedding", done: false },
  { id: 5, text: "Thử váy cưới & vest", done: false },
  { id: 6, text: "Gửi thiệp mời", done: false },
];

export default function Planning() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [budget, setBudget] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const navigate = useNavigate();

  const toggle = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget) return;
    
    setIsGenerating(true);
    setPlan(null);
    
    setTimeout(() => {
      let amount = parseInt(budget);
      if (budget.toLowerCase().includes('tỷ') || budget.toLowerCase().includes('ty')) amount = amount * 1000;
      else if (!budget.toLowerCase().includes('triệu') && amount < 100) amount = amount; // assume million
      
      setPlan({
        totalBudget: `${amount} Triệu`,
        categories: [
          { name: 'Nhà hàng (50%)', percentage: 50, amount: `${amount * 0.5} Tr`, vendorName: 'Gem Center', vendorId: 'gem-center' },
          { name: 'Trang trí (20%)', percentage: 20, amount: `${amount * 0.2} Tr`, vendorName: 'Liti Florist', vendorId: 'liti-florist' },
          { name: 'Chụp ảnh & Trang phục (15%)', percentage: 15, amount: `${amount * 0.15} Tr`, vendorName: "L'Amour Studio", vendorId: '1' },
          { name: 'Dự phòng (15%)', percentage: 15, amount: `${amount * 0.15} Tr`, vendorName: 'Quỹ Dự Phòng', vendorId: '' }
        ]
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div style={{ paddingBottom: '120px', paddingTop: '100px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="stamped-heading" style={{ textAlign: 'center', marginBottom: '32px' }}>P L A N N I N G</h2>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '56px', fontStyle: 'italic', fontWeight: 300, margin: '0 0 16px 0', letterSpacing: '-0.03em' }}>Trợ Lý Kế Hoạch AI</h1>
          <p style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '18px', color: 'var(--color-steel)' }}>Lập kế hoạch ngân sách thông minh và tự động chọn lọc nhà cung cấp.</p>
        </div>
        
        {/* AI Budget Form */}
        <div style={{ background: 'rgba(175, 80, 255, 0.05)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(175, 80, 255, 0.2)', marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-signal-violet)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={24} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '20px', color: '#fff', fontFamily: 'var(--font-whyte-inktrap)' }}>Ngân sách dự kiến của bạn là bao nhiêu?</h3>
              <p style={{ margin: 0, color: 'var(--color-steel)', fontSize: '14px' }}>Trạm Hỷ AI sẽ tự động phân bổ và tìm kiếm các dịch vụ phù hợp nhất.</p>
            </div>
          </div>
          
          <form onSubmit={handleGeneratePlan} style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flexGrow: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '20px', color: 'var(--color-steel)', fontSize: '18px' }}>Ngân sách:</span>
              <input 
                type="text" 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ví dụ: 500 triệu"
                style={{ 
                  width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', 
                  padding: '20px 20px 20px 120px', borderRadius: '12px', color: '#fff', fontSize: '18px', fontFamily: 'var(--font-whyte-inktrap)'
                }} 
              />
            </div>
            <button 
              type="submit"
              disabled={!budget || isGenerating}
              className="ghost-pill-btn"
              style={{ background: 'var(--color-signal-violet)', color: '#000', padding: '0 32px', borderRadius: '12px', border: 'none', cursor: (!budget || isGenerating) ? 'not-allowed' : 'pointer' }}
            >
              {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <><Sparkles size={18} style={{ marginRight: '8px' }} /> Tạo Kế Hoạch</>}
            </button>
          </form>

          {/* AI Plan Result */}
          {plan && (
            <div style={{ marginTop: '32px', animation: 'fadeInUp 0.4s ease-out' }}>
              <h4 style={{ margin: '0 0 16px 0', color: 'var(--color-almost-white)', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--color-signal-violet)" /> Kế Hoạch Được Đề Xuất
              </h4>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--color-steel)', fontSize: '16px' }}>Tổng Ngân Sách Phân Bổ</span>
                  <span style={{ fontSize: '24px', color: 'var(--color-signal-violet)', fontWeight: 'bold' }}>{plan.totalBudget}</span>
                </div>
                <div style={{ padding: '8px 24px' }}>
                  {plan.categories.map((cat: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: idx < plan.categories.length - 1 ? '1px dashed rgba(255,255,255,0.1)' : 'none' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ color: '#fff', fontSize: '16px' }}>{cat.name}</span>
                        <span style={{ color: 'var(--color-steel)', fontSize: '14px' }}>Đề xuất: <strong style={{ color: 'var(--color-almost-white)' }}>{cat.vendorName}</strong></span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                        <span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>{cat.amount}</span>
                        {cat.vendorId && (
                          <button onClick={() => navigate(`/vendor/${cat.vendorId}`)} style={{ background: 'none', border: 'none', color: 'var(--color-signal-violet)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: 0 }}>
                            Xem chi tiết <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Existing Checklist */}
        <h3 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '24px', color: '#fff', marginBottom: '24px', paddingLeft: '8px' }}>Checklist Đám Cưới</h3>
        <div style={{ background: 'rgba(237,195,196,0.05)', borderRadius: '19.2px', padding: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
          {tasks.map(t => (
            <label 
              key={t.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px', 
                padding: '20px 0', 
                borderBottom: '1px solid rgba(247,249,250,0.1)', 
                cursor: 'pointer',
                opacity: 1
              }}
            >
              <input 
                type="checkbox" 
                checked={t.done} 
                onChange={() => toggle(t.id)} 
                style={{ 
                  width: '24px', 
                  height: '24px', 
                  accentColor: 'var(--color-signal-violet)',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '4px'
                }}
              />
              <span style={{ 
                fontFamily: 'var(--font-whyte-inktrap)', 
                fontSize: '18px', 
                textDecoration: 'none', 
                color: t.done ? 'var(--color-signal-violet)' : 'var(--color-almost-white)',
                fontWeight: t.done ? 500 : 400
              }}>
                {t.text}
              </span>
            </label>
          ))}
          
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <button className="ghost-pill-btn" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span style={{ marginRight: '8px' }}>+</span> Thêm công việc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
