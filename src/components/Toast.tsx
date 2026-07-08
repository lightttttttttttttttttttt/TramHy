import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastEventDetail {
  message: string;
  type: ToastType;
}

export const showToast = (message: string, type: ToastType = 'success') => {
  const event = new CustomEvent<ToastEventDetail>('show-toast', { detail: { message, type } });
  window.dispatchEvent(event);
};

export default function Toast() {
  const [toasts, setToasts] = useState<{ id: number; message: string; type: ToastType }[]>([]);

  useEffect(() => {
    const handleShowToast = (e: Event) => {
      const customEvent = e as CustomEvent<ToastEventDetail>;
      const newToast = { id: Date.now(), ...customEvent.detail };
      
      setToasts(prev => [...prev, newToast]);
      
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 3000);
    };

    window.addEventListener('show-toast', handleShowToast);
    return () => window.removeEventListener('show-toast', handleShowToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      left: '32px',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {toasts.map(toast => (
        <div 
          key={toast.id}
          style={{
            background: 'rgba(20, 20, 20, 0.9)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '16px 24px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#fff',
            fontFamily: 'var(--font-whyte-inktrap)',
            fontSize: '14px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            animation: 'fadeInUp 0.3s ease-out forwards',
            borderLeft: `4px solid ${toast.type === 'success' ? '#4caf50' : toast.type === 'error' ? '#f44336' : 'var(--color-signal-violet)'}`
          }}
        >
          {toast.type === 'success' && <CheckCircle2 size={20} color="#4caf50" />}
          {toast.type === 'error' && <XCircle size={20} color="#f44336" />}
          {toast.type === 'info' && <Info size={20} color="var(--color-signal-violet)" />}
          {toast.message}
        </div>
      ))}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
