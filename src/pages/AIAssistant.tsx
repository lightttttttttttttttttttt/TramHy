import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, PlusCircle, User, ArrowRight, Loader2 } from 'lucide-react';
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

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Chào Lan Anh! Tôi là Trạm Hỷ AI. Tôi có thể giúp bạn lên kế hoạch, dự trù ngân sách, hoặc tìm kiếm dịch vụ hoàn hảo cho ngày trọng đại của bạn. Hôm nay bạn muốn tìm hiểu về phần nào?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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
        
        aiResponseText = `Với ngân sách ${amount} triệu, Trạm Hỷ AI đã tự động phân bổ và chọn ra các Nhà cung cấp phù hợp nhất với phong cách của bạn trên hệ thống. Dưới đây là kế hoạch (Plan) chi tiết:`;
        action = {
          type: 'plan' as const,
          totalBudget: `${amount} Triệu`,
          categories: [
            { name: 'Nhà hàng (50%)', percentage: 50, amount: `${amount * 0.5} Tr`, vendorName: 'Gem Center', vendorId: 'gem-center' },
            { name: 'Trang trí (20%)', percentage: 20, amount: `${amount * 0.2} Tr`, vendorName: 'Liti Florist', vendorId: 'liti-florist' },
            { name: 'Chụp ảnh & Trang phục (15%)', percentage: 15, amount: `${amount * 0.15} Tr`, vendorName: "L'Amour Studio", vendorId: '1' },
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
    <div className="dashboard-layout" style={{ display: 'flex', minHeight: '100vh', background: 'transparent', paddingTop: '73px' }}>
      {/* Sidebar (History) */}
      <aside className="dashboard-sidebar" style={{ width: '280px', flexShrink: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px' }}>
          <button className="ghost-pill-btn" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: 'var(--color-almost-white)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <PlusCircle size={18} style={{ marginRight: '8px' }} /> Cuộc trò chuyện mới
          </button>
        </div>
        <div style={{ padding: '0 16px', overflowY: 'auto', flexGrow: 1 }}>
          <h4 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '12px', color: 'var(--color-steel)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', paddingLeft: '8px' }}>Hôm nay</h4>
          <div style={{ padding: '12px 16px', background: 'rgba(175, 80, 255, 0.1)', borderRadius: '12px', color: 'var(--color-almost-white)', marginBottom: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MessageSquare size={16} /> <span style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Lên kế hoạch cưới bãi biển</span>
          </div>
          
          <h4 style={{ fontFamily: 'var(--font-whyte-inktrap)', fontSize: '12px', color: 'var(--color-steel)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '32px', marginBottom: '16px', paddingLeft: '8px' }}>Tuần trước</h4>
          <div style={{ padding: '12px 16px', color: 'var(--color-steel)', marginBottom: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MessageSquare size={16} /> <span style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Dự trù ngân sách 500M</span>
          </div>
          <div style={{ padding: '12px 16px', color: 'var(--color-steel)', marginBottom: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MessageSquare size={16} /> <span style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Gợi ý mẫu thiệp Minimalist</span>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="dashboard-main" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)', position: 'relative' }}>
        
        {/* Chat Messages */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '40px 10%' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', gap: '16px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: msg.sender === 'user' ? 'var(--color-almost-white)' : 'var(--color-signal-violet)',
                  color: '#000'
                }}>
                  {msg.sender === 'user' ? <User size={20} /> : <Sparkles size={20} />}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  <div style={{ 
                    padding: '16px 24px', 
                    borderRadius: '24px', 
                    borderTopRightRadius: msg.sender === 'user' ? '4px' : '24px',
                    borderTopLeftRadius: msg.sender === 'ai' ? '4px' : '24px',
                    background: msg.sender === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(175, 80, 255, 0.1)',
                    border: msg.sender === 'user' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(175, 80, 255, 0.3)',
                    color: 'var(--color-almost-white)',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-whyte-inktrap)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.1)'
                  }}>
                    {msg.text}
                  </div>
                  
                  {msg.action && msg.action.type === 'vendor_link' && (
                    <button 
                      onClick={() => navigate(`/vendor/${(msg.action as any).vendorId}`)}
                      className="ghost-pill-btn" 
                      style={{ background: 'var(--color-signal-violet)', color: '#000', padding: '12px 24px', fontSize: '14px', marginTop: '8px' }}
                    >
                      {(msg.action as any).label} <ArrowRight size={16} />
                    </button>
                  )}
                  
                  {msg.action && msg.action.type === 'plan' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px', width: '100%', minWidth: '400px' }}>
                      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                        <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontFamily: 'var(--font-whyte-inktrap)', color: 'var(--color-almost-white)' }}>Tổng Ngân Sách</span>
                          <span style={{ fontSize: '18px', color: 'var(--color-signal-violet)', fontWeight: 'bold' }}>{(msg.action as any).totalBudget}</span>
                        </div>
                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {(msg.action as any).categories.map((cat: any, idx: number) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ color: 'var(--color-almost-white)', fontSize: '14px' }}>{cat.name}</span>
                                <span style={{ color: 'var(--color-steel)', fontSize: '12px' }}>Đề xuất: <strong style={{ color: '#fff' }}>{cat.vendorName}</strong></span>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                <span style={{ color: 'var(--color-almost-white)', fontSize: '14px' }}>{cat.amount}</span>
                                {cat.vendorId && (
                                  <button onClick={() => navigate(`/vendor/${cat.vendorId}`)} style={{ background: 'none', border: 'none', color: 'var(--color-signal-violet)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: 0 }}>
                                    Chi tiết <ArrowRight size={12} />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {msg.action && msg.action.type === 'budget_form' && (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const budget = formData.get('budget') as string;
                        if (budget) {
                          handleSendMessage(undefined, budget);
                        }
                      }}
                      style={{ display: 'flex', gap: '8px', marginTop: '12px', width: '100%' }}
                    >
                      <input 
                        type="text" 
                        name="budget"
                        placeholder="Nhập số tiền (VD: 500 triệu)" 
                        style={{ 
                          flexGrow: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', 
                          padding: '12px 16px', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-whyte-inktrap)' 
                        }} 
                      />
                      <button 
                        type="submit"
                        className="ghost-pill-btn" 
                        style={{ background: 'var(--color-signal-violet)', color: '#000', padding: '0 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                      >
                        Tạo Plan <ArrowRight size={16} style={{ marginLeft: '4px' }} />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', gap: '16px', flexDirection: 'row' }}>
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--color-signal-violet)',
                  color: '#000'
                }}>
                  <Sparkles size={20} />
                </div>
                <div style={{ 
                  padding: '16px 24px', borderRadius: '24px', borderTopLeftRadius: '4px',
                  background: 'rgba(175, 80, 255, 0.1)', border: '1px solid rgba(175, 80, 255, 0.3)',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                  <Loader2 size={16} color="var(--color-signal-violet)" className="animate-spin" />
                  <span style={{ fontSize: '14px', color: 'var(--color-steel)' }}>Trạm Hỷ AI đang suy nghĩ...</span>
                </div>
              </div>
            )}
            
            <div ref={endOfMessagesRef} />
          </div>
        </div>

        {/* Input Area */}
        <div style={{ padding: '24px 10%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form onSubmit={handleSendMessage} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Hỏi Trạm Hỷ AI bất cứ điều gì về kế hoạch cưới..." 
                style={{ 
                  width: '100%', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)', padding: '20px 24px', borderRadius: '1584px', 
                  color: '#fff', fontFamily: 'var(--font-whyte-inktrap)', fontSize: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                }} 
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping}
                style={{ 
                  position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                  width: '44px', height: '44px', borderRadius: '50%', border: 'none',
                  background: inputValue.trim() && !isTyping ? 'var(--color-almost-white)' : 'rgba(255,255,255,0.1)', 
                  color: inputValue.trim() && !isTyping ? '#000' : 'rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s'
                }}
              >
                <Send size={20} />
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: 'var(--color-steel)' }}>
              Trạm Hỷ AI có thể mắc lỗi. Vui lòng kiểm tra lại các thông tin quan trọng.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
