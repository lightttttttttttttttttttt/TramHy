import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, ArrowRight, Loader2, X, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  action?: {
    type: 'vendor_link';
    label: string;
    vendorId: string;
  } | {
    type: 'plan';
    totalBudget: string;
    categories: {
      name: string;
      percentage: number;
      amount: string;
      vendorName: string;
      vendorId: string;
    }[];
  } | {
    type: 'budget_form';
  };
};

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Chào Lan Anh! Tôi là Trạm Hỷ AI. Tôi có thể giúp bạn tư vấn dịch vụ, gợi ý phong cách, hoặc giải đáp bất kỳ thắc mắc nào về đám cưới.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || inputValue;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customText) setInputValue('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let aiResponseText = 'Tuyệt vời! Tôi có thể giúp bạn việc đó. Bạn có muốn tham khảo thêm các tùy chọn khác trên Marketplace của Trạm Hỷ không?';
      let action: any = undefined;

      const lowerInput = userMessage.text.toLowerCase();
      const numberMatch = lowerInput.match(/(\\d+)\\s*(triệu|tỷ|ty|t|m)?/);
      
      if (numberMatch && (lowerInput.includes('triệu') || lowerInput.includes('tỷ') || lowerInput.includes('t') || parseInt(numberMatch[1]) > 10)) {
        let amount = parseInt(numberMatch[1]);
        if (lowerInput.includes('tỷ') || lowerInput.includes('ty')) amount = amount * 1000;
        
        aiResponseText = `Với ngân sách ${amount} triệu, Trạm Hỷ AI đã tự động phân bổ và chọn ra các Nhà cung cấp phù hợp nhất với phong cách của bạn. Dưới đây là kế hoạch chi tiết:`;
        action = {
          type: 'plan' as const,
          totalBudget: `${amount} Triệu`,
          categories: [
            { name: 'Nhà hàng (50%)', percentage: 50, amount: `${amount * 0.5} Tr`, vendorName: 'Gem Center', vendorId: 'gem-center' },
            { name: 'Trang trí (20%)', percentage: 20, amount: `${amount * 0.2} Tr`, vendorName: 'Liti Florist', vendorId: 'liti-florist' },
            { name: 'Chụp & Trang phục (15%)', percentage: 15, amount: `${amount * 0.15} Tr`, vendorName: "L'Amour Studio", vendorId: '1' },
            { name: 'Dự phòng (15%)', percentage: 15, amount: `${amount * 0.15} Tr`, vendorName: 'Quỹ Dự Phòng', vendorId: '' }
          ]
        };
      } else if (lowerInput.includes('chụp ảnh') || lowerInput.includes('studio') || lowerInput.includes('ảnh cưới')) {
        aiResponseText = "Dựa trên phong cách lãng mạn và hiện đại bạn đang tìm kiếm, tôi đề xuất L'Amour Studio. Họ đang có gói \\\"Pre-wedding Basic\\\" bao gồm cả trang phục rất phù hợp với ngân sách của bạn.";
        action = {
          type: 'vendor_link' as const,
          label: "Xem chi tiết L'Amour Studio",
          vendorId: '1'
        };
      } else if (lowerInput.includes('ngân sách') || lowerInput.includes('tiền') || lowerInput.includes('kế hoạch')) {
        aiResponseText = 'Để tôi lập một kế hoạch phân bổ chi tiết cho bạn. Vui lòng nhập tổng ngân sách dự kiến của bạn (Ví dụ: 500 triệu):';
        action = {
          type: 'budget_form' as const
        };
      }

      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: aiResponseText,
        action
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
      
      {/* Chat Window */}
      {isOpen && (
        <div style={{ 
          width: '380px', height: '600px', maxHeight: 'calc(100vh - 120px)',
          background: 'rgba(20,20,20,0.85)', backdropFilter: 'blur(24px)', 
          borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, rgba(175, 80, 255, 0.1), transparent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-signal-violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                <Sparkles size={16} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px', color: '#fff', fontWeight: 'bold' }}>Trạm Hỷ AI</div>
                <div style={{ fontSize: '12px', color: 'var(--color-steel)' }}>Sẵn sàng lập kế hoạch</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-steel)', cursor: 'pointer', padding: '4px' }}>
              <X size={20} />
            </button>
          </div>
          
          {/* Messages */}
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', gap: '12px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{ 
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: msg.sender === 'user' ? 'rgba(255,255,255,0.1)' : 'var(--color-signal-violet)',
                  color: msg.sender === 'user' ? '#fff' : '#000'
                }}>
                  {msg.sender === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{ 
                    padding: '12px 16px', 
                    borderRadius: '16px', 
                    borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
                    borderTopLeftRadius: msg.sender === 'ai' ? '4px' : '16px',
                    background: msg.sender === 'user' ? 'rgba(255,255,255,0.05)' : 'rgba(175, 80, 255, 0.1)',
                    border: msg.sender === 'user' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(175, 80, 255, 0.2)',
                    color: 'var(--color-almost-white)',
                    fontSize: '14px', lineHeight: '1.5'
                  }}>
                    {msg.text}
                  </div>
                  
                  {msg.action && msg.action.type === 'vendor_link' && (
                    <button 
                      onClick={() => navigate(`/vendor/${(msg.action as any).vendorId}`)}
                      className="ghost-pill-btn" 
                      style={{ background: 'var(--color-signal-violet)', color: '#000', padding: '8px 16px', fontSize: '13px' }}
                    >
                      {(msg.action as any).label} <ArrowRight size={14} />
                    </button>
                  )}
                  
                  {msg.action && msg.action.type === 'plan' && (
                    <div style={{ width: '100%', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                      <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: 'var(--color-steel)' }}>Ngân sách</span>
                        <span style={{ fontSize: '14px', color: 'var(--color-signal-violet)', fontWeight: 'bold' }}>{(msg.action as any).totalBudget}</span>
                      </div>
                      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {(msg.action as any).categories.map((cat: any, idx: number) => (
                          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: 'var(--color-almost-white)', fontSize: '13px' }}>{cat.name}</span>
                              <span style={{ color: 'var(--color-almost-white)', fontSize: '13px' }}>{cat.amount}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: 'var(--color-steel)', fontSize: '11px' }}>{cat.vendorName}</span>
                              {cat.vendorId && (
                                <button onClick={() => { setIsOpen(false); navigate(`/vendor/${cat.vendorId}`); }} style={{ background: 'none', border: 'none', color: 'var(--color-signal-violet)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '2px', cursor: 'pointer', padding: 0 }}>
                                  Xem <ArrowRight size={10} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.action && msg.action.type === 'budget_form' && (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const budget = formData.get('budget') as string;
                        if (budget) handleSendMessage(undefined, budget);
                      }}
                      style={{ display: 'flex', gap: '8px', width: '100%' }}
                    >
                      <input 
                        type="text" 
                        name="budget"
                        placeholder="VD: 500 triệu" 
                        style={{ 
                          flexGrow: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                          padding: '8px 12px', borderRadius: '8px', color: '#fff', fontSize: '13px', minWidth: '0'
                        }} 
                      />
                      <button 
                        type="submit"
                        className="ghost-pill-btn" 
                        style={{ background: 'var(--color-signal-violet)', color: '#000', padding: '0 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', flexShrink: 0 }}
                      >
                        Tạo
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-signal-violet)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={14} />
                </div>
                <div style={{ padding: '12px 16px', borderRadius: '16px', borderTopLeftRadius: '4px', background: 'rgba(175, 80, 255, 0.1)', border: '1px solid rgba(175, 80, 255, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Loader2 size={14} color="var(--color-signal-violet)" className="animate-spin" />
                </div>
              </div>
            )}
            
            <div ref={endOfMessagesRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
            <form onSubmit={handleSendMessage} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhắn tin cho Trạm Hỷ AI..." 
                style={{ 
                  width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                  padding: '12px 40px 12px 16px', borderRadius: '24px', color: '#fff', fontSize: '14px'
                }} 
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping}
                style={{ 
                  position: 'absolute', right: '6px',
                  width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                  background: inputValue.trim() && !isTyping ? 'var(--color-signal-violet)' : 'rgba(255,255,255,0.1)', 
                  color: inputValue.trim() && !isTyping ? '#000' : 'rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s'
                }}
              >
                <Send size={14} style={{ marginLeft: '2px' }} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="ghost-pill-btn"
        style={{ 
          width: '60px', height: '60px', borderRadius: '30px', padding: 0,
          background: 'linear-gradient(135deg, #AF50FF 0%, #7622FF 100%)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(175, 80, 255, 0.4)',
          border: '1px solid rgba(255,255,255,0.2)',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)',
          transition: 'transform 0.2s'
        }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
