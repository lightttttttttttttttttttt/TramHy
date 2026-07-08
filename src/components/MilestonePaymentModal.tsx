import { useState } from 'react';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MilestonePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
  packageName: string;
  totalPrice: number;
  onSuccess?: () => void;
}

export default function MilestonePaymentModal({ isOpen, onClose, vendorName, packageName, totalPrice, onSuccess }: MilestonePaymentModalProps) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
      if (onSuccess) onSuccess();
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const depositAmount = totalPrice * 0.3;
  const executionAmount = totalPrice * 0.5;
  const completionAmount = totalPrice * 0.2;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        
        {step === 1 ? (
          <div className="modal-content">
            <h2 className="modal-title">Xác nhận Đặt dịch vụ</h2>
            <p className="modal-subtitle">Trạm Hỷ bảo vệ 100% dòng tiền của bạn qua hệ thống Escrow.</p>
            
            <div className="booking-summary">
              <div className="summary-row">
                <span className="summary-label">Nhà cung cấp:</span>
                <span className="summary-value" style={{fontWeight: 600}}>{vendorName}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Gói dịch vụ:</span>
                <span className="summary-value">{packageName}</span>
              </div>
              <div className="summary-row highlight">
                <span className="summary-label">Tổng chi phí:</span>
                <span className="summary-value price">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <h3 className="milestone-title">Tiến độ thanh toán (Milestone)</h3>
            <div className="milestone-timeline">
              <div className="milestone-item active">
                <div className="milestone-dot"></div>
                <div className="milestone-info">
                  <h4>Chặng 1: Giữ lịch (30%)</h4>
                  <p>Thanh toán ngay hôm nay để chốt lịch. Trạm Hỷ tạm giữ số tiền này.</p>
                  <div className="milestone-price">{formatPrice(depositAmount)}</div>
                </div>
              </div>
              <div className="milestone-item">
                <div className="milestone-dot"></div>
                <div className="milestone-info">
                  <h4>Chặng 2: Trước sự kiện (50%)</h4>
                  <p>Thanh toán trước ngày cưới 7 ngày để vendor chuẩn bị.</p>
                  <div className="milestone-price">{formatPrice(executionAmount)}</div>
                </div>
              </div>
              <div className="milestone-item">
                <div className="milestone-dot"></div>
                <div className="milestone-info">
                  <h4>Chặng 3: Nghiệm thu (20%)</h4>
                  <p>Thanh toán sau khi đám cưới hoàn tất và bạn xác nhận hài lòng.</p>
                  <div className="milestone-price">{formatPrice(completionAmount)}</div>
                </div>
              </div>
            </div>

            <div className="escrow-badge">
              <ShieldCheck size={20} color="#27ae60" />
              <span>Thanh toán an toàn qua Cổng bảo chứng Trạm Hỷ</span>
            </div>

            <button 
              className="btn btn-primary btn-full" 
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Đang xử lý...' : `Thanh toán Chặng 1 (${formatPrice(depositAmount)})`}
            </button>
          </div>
        ) : (
          <div className="modal-content success-state">
            <CheckCircle2 size={64} color="#27ae60" style={{ margin: '0 auto 24px', display: 'block' }} />
            <h2 className="modal-title" style={{textAlign: 'center'}}>Đặt lịch Thành công!</h2>
            <p className="modal-subtitle" style={{textAlign: 'center'}}>Trạm Hỷ đã nhận được khoản thanh toán giữ lịch của bạn. Thông báo đã được gửi đến <strong>{vendorName}</strong>.</p>
            
            <div className="success-actions" style={{display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px'}}>
              <button className="btn btn-primary" onClick={onClose}>Về trang chủ</button>
              <button className="btn btn-ghost" onClick={onClose}>Xem hợp đồng số</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
