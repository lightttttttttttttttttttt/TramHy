import { useState } from 'react';
import { Star, MapPin, ShieldCheck, Check, Image as ImageIcon } from 'lucide-react';
import MilestonePaymentModal from '../components/MilestonePaymentModal';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { showToast } from '../components/Toast';

export default function VendorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vendors, bookVendor } = useBooking();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({ name: '', price: 0 });

  const vendor = vendors.find(v => v.id === id);

  if (!vendor) {
    return <div style={{ padding: '120px 24px', textAlign: 'center', color: 'var(--color-almost-white)' }}>Không tìm thấy Vendor.</div>;
  }

  // Generate some mock packages based on vendor data
  const packages = [
    {
      id: 'basic',
      name: 'Gói Dịch Vụ Cơ Bản',
      price: parseInt(vendor.price.replace(/\D/g, '')) * 1000000 || 15000000,
      features: [
        'Dịch vụ tiêu chuẩn theo ngành',
        'Tư vấn trực tiếp 1-1',
        'Cam kết chất lượng 100%'
      ]
    },
    {
      id: 'premium',
      name: 'Gói Cao Cấp (Khuyên dùng)',
      price: (parseInt(vendor.price.replace(/\D/g, '')) * 1000000 || 15000000) * 1.5,
      features: [
        'Dịch vụ cao cấp',
        'Ưu tiên xử lý nhanh',
        'Quà tặng kèm theo'
      ],
      isPopular: true
    }
  ];

  const handleBook = (pkgName: string, pkgPrice: number) => {
    setSelectedPackage({ name: pkgName, price: pkgPrice });
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    bookVendor(vendor.id, new Date().toISOString().split('T')[0], `Gói: ${selectedPackage.name}`, selectedPackage.price);
  };

  return (
    <div style={{ paddingBottom: '120px', paddingTop: '100px' }}>
      
      {/* Hero Section */}
      <div style={{ position: 'relative', height: '400px', marginBottom: '60px' }}>
        <img 
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1920&q=80" 
          alt="Vendor Cover" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
        />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'linear-gradient(transparent, var(--color-near-black))', height: '200px' }}></div>
        
        <div className="container" style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', maxWidth: 'var(--page-max-width)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--color-signal-violet)', color: '#000', padding: '4px 12px', borderRadius: '1584px', fontSize: '12px', fontWeight: 600, marginBottom: '24px' }}>
            <ShieldCheck size={14} /> Đối tác Tích xanh Trạm Hỷ
          </div>
          <h1 style={{ fontFamily: 'var(--font-grandslang)', fontSize: '88px', fontStyle: 'italic', fontWeight: 300, margin: '0 0 16px 0', letterSpacing: '-0.03em' }}>{vendor.name}</h1>
          <div style={{ display: 'flex', gap: '24px', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', color: 'var(--color-almost-white)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={16} fill="var(--color-signal-violet)" color="var(--color-signal-violet)" /> {vendor.rating} ({vendor.reviewsCount} đánh giá)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> {vendor.address}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: 'var(--page-max-width)', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '60px' }}>
        {/* Main Content */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-whyte-inktrap-mono)', fontSize: '24px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-soft-white)', textAlign: 'left', marginBottom: '32px' }}>A B O U T</h2>
          <p style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '18px', fontWeight: 300, color: 'var(--color-almost-white)', opacity: 0.8, lineHeight: 1.6, marginBottom: '80px' }}>
            {vendor.description}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-whyte-inktrap-mono)', fontSize: '24px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-soft-white)', textAlign: 'left', marginBottom: 0 }}>P O R T F O L I O</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-signal-violet)' }}>
              <ShieldCheck size={14} />
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Verified Photos</span>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '80px' }}>
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" style={{ width: '100%', height: '300px', objectFit: 'cover', border: '1px solid var(--color-almost-white)', borderRadius: '19.2px' }} />
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80" style={{ width: '100%', height: '300px', objectFit: 'cover', border: '1px solid var(--color-almost-white)', borderRadius: '19.2px' }} />
            <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80" style={{ width: '100%', height: '300px', objectFit: 'cover', border: '1px solid var(--color-almost-white)', borderRadius: '19.2px' }} />
            <div style={{ position: 'relative', border: '1px solid var(--color-almost-white)', borderRadius: '19.2px', overflow: 'hidden', cursor: 'pointer' }}>
              <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80" style={{ width: '100%', height: '300px', objectFit: 'cover', opacity: 0.4 }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <ImageIcon size={32} />
                <span style={{ fontFamily: 'var(--font-whyte-inktrap)' }}>Xem thêm 45+ ảnh</span>
              </div>
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-whyte-inktrap-mono)', fontSize: '24px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-soft-white)', textAlign: 'left', marginBottom: '32px' }}>R E V I E W S</h2>
          <div style={{ background: 'rgba(237,195,196,0.05)', border: '1px solid var(--color-almost-white)', borderRadius: '19.2px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '18px', fontWeight: 500, marginBottom: '4px' }}>Minh & Hằng</div>
                <div style={{ fontSize: '12px', color: 'var(--color-steel)' }}>Tháng 9/2023</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} fill="var(--color-signal-violet)" color="var(--color-signal-violet)" /> 5.0</div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', background: 'rgba(175, 80, 255, 0.1)', color: 'var(--color-signal-violet)', padding: '4px 12px', borderRadius: '4px', marginBottom: '24px' }}>
              <Check size={12} /> Đã sử dụng Gói Premium qua Trạm Hỷ
            </div>
            <p style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '14px', fontWeight: 300, color: 'var(--color-almost-white)', opacity: 0.9, lineHeight: 1.6 }}>
              "Studio làm việc cực kỳ chuyên nghiệp. Concept đúng như cam kết lúc tư vấn, không phát sinh thêm bất kỳ chi phí nào (điểm cộng lớn!). Thanh toán qua Trạm Hỷ chia từng đợt nên tụi mình rất yên tâm."
            </p>
          </div>
        </div>

        {/* Sidebar / Pricing */}
        <div>
          <div style={{ position: 'sticky', top: '120px' }}>
            <h2 style={{ fontFamily: 'var(--font-whyte-inktrap-mono)', fontSize: '24px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-soft-white)', textAlign: 'left', marginBottom: '32px' }}>P R I C I N G</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {packages.map(pkg => (
                <div key={pkg.id} style={{ 
                  background: pkg.isPopular ? 'rgba(175, 80, 255, 0.05)' : 'rgba(237,195,196,0.05)', 
                  border: pkg.isPopular ? '1px solid var(--color-signal-violet)' : '1px solid var(--color-almost-white)', 
                  borderRadius: '19.2px', 
                  padding: '32px' 
                }}>
                  {pkg.isPopular && <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-signal-violet)', marginBottom: '16px', fontWeight: 600 }}>Phổ biến nhất</div>}
                  <h4 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '20px', fontWeight: 400, margin: '0 0 16px 0' }}>{pkg.name}</h4>
                  <div style={{ fontFamily: 'var(--font-grandslang)', fontSize: '32px', marginBottom: '24px' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pkg.price)}
                  </div>
                  
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--color-almost-white)', opacity: 0.8 }}>
                        <Check size={16} color="var(--color-signal-violet)" style={{ flexShrink: 0, marginTop: 2 }} /> 
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className="ghost-pill-btn"
                    style={{ width: '100%', justifyContent: 'center', ...(pkg.isPopular ? { background: 'var(--color-signal-violet)', color: '#000', borderColor: 'var(--color-signal-violet)' } : {}) }}
                    onClick={() => handleBook(pkg.name, pkg.price)}
                  >
                    <span>+</span> Đặt lịch gói này
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MilestonePaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        vendorName={vendor.name}
        packageName={selectedPackage.name}
        totalPrice={selectedPackage.price}
        onSuccess={() => {
          handleSuccess();
          showToast('Đặt lịch và ký quỹ thành công! Đang chuyển hướng...', 'success');
          setTimeout(() => {
            setIsModalOpen(false);
            navigate('/user-dashboard');
          }, 2000);
        }}
      />
    </div>
  );
}
