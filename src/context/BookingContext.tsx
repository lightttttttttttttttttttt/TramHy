import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: string;
  reviewsCount: number;
  price: string;
  img: string;
  verified: boolean;
  description: string;
  address: string;
}

export interface Booking {
  id: string;
  vendorId: string;
  vendorName: string;
  date: string;
  status: string;
  notes: string;
  totalPrice: number;
}

interface BookingContextType {
  vendors: Vendor[];
  bookings: Booking[];
  bookVendor: (vendorId: string, date: string, notes: string, totalPrice: number) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
}

const mockVendors: Vendor[] = [
  { id: '1', name: "L'Amour Studio", category: 'studio', rating: '4.9', reviewsCount: 120, address: 'Hoàn Kiếm, Hà Nội', price: 'Từ 15M', img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80", verified: true, description: "Studio chụp ảnh cưới hàng đầu mang phong cách Hàn Quốc lãng mạn." },
  { id: '2', name: "The Vows Photography", category: 'studio', rating: '4.8', reviewsCount: 95, address: 'Hai Bà Trưng, Hà Nội', price: 'Từ 18.5M', img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80", verified: true, description: "Bắt trọn từng khoảnh khắc tự nhiên nhất trong ngày trọng đại." },
  { id: '3', name: "Classic Romance", category: 'studio', rating: '5.0', reviewsCount: 210, address: 'Cầu Giấy, Hà Nội', price: 'Từ 12M', img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", verified: true, description: "Phong cách cổ điển Châu Âu, không bao giờ lỗi mốt." },
  { id: '4', name: "Dreamy Decor", category: 'decor', rating: '4.9', reviewsCount: 80, address: 'Đống Đa, Hà Nội', price: 'Từ 20M', img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80", verified: true, description: "Trang trí tiệc cưới mang hơi thở cổ tích, biến giấc mơ thành hiện thực." },
  { id: '5', name: "Luxe Weddings", category: 'restaurant', rating: '4.7', reviewsCount: 150, address: 'Tây Hồ, Hà Nội', price: 'Từ 50M', img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80", verified: false, description: "Trung tâm tiệc cưới đẳng cấp 5 sao với sức chứa 1000 khách." },
  { id: '6', name: "Glow Makeup", category: 'makeup', rating: '5.0', reviewsCount: 300, address: 'Thanh Xuân, Hà Nội', price: 'Từ 5M', img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80", verified: true, description: "Làm nổi bật nét đẹp tự nhiên của cô dâu trong ngày chung đôi." },
  { id: '7', name: "White Palace", category: 'restaurant', rating: '4.8', reviewsCount: 450, address: 'Phú Nhuận, TPHCM', price: 'Từ 65M', img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80", verified: true, description: "Trung tâm hội nghị và tiệc cưới mang phong cách sang trọng bậc nhất Sài Gòn." },
  { id: '8', name: "Trống Đồng Palace", category: 'restaurant', rating: '4.6', reviewsCount: 220, address: 'Thanh Xuân, Hà Nội', price: 'Từ 40M', img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80", verified: true, description: "Chuỗi nhà hàng tiệc cưới với không gian hiện đại và sức chứa linh hoạt." },
  { id: '9', name: "TuArt Wedding", category: 'studio', rating: '4.9', reviewsCount: 500, address: 'Ba Đình, Hà Nội', price: 'Từ 15M', img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", verified: true, description: "Hệ sinh thái cưới hỏi hàng đầu với phong cách chụp ảnh độc quyền." },
  { id: '10', name: "7799 Storyteller", category: 'decor', rating: '4.8', reviewsCount: 150, address: 'Hoàn Kiếm, Hà Nội', price: 'Từ 20M', img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80", verified: true, description: "Người kể chuyện tình yêu qua những concept trang trí độc bản." },
  { id: '11', name: "Bul Nguyễn Makeup", category: 'makeup', rating: '5.0', reviewsCount: 890, address: 'Đống Đa, Hà Nội', price: 'Từ 8.5M', img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80", verified: true, description: "Bàn tay vàng trong làng makeup cô dâu tại Hà Nội." },
  { id: '12', name: "Lutèce Wedding", category: 'decor', rating: '4.7', reviewsCount: 110, address: 'Quận 1, TPHCM', price: 'Từ 25M', img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80", verified: true, description: "Concept trang trí chuẩn Pháp, thanh lịch và lãng mạn." }
];

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [vendors] = useState<Vendor[]>(() => {
    const v = [...mockVendors];
    const verified = localStorage.getItem('tramhy_vendor_greenwedding_verified');
    if (verified === 'true') {
      const idx = v.findIndex(x => x.id === '5');
      if (idx !== -1) v[idx].verified = true;
    }
    return v;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('tramhy_system_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tramhy_system_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const bookVendor = (vendorId: string, date: string, notes: string, totalPrice: number) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) return;

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      vendorId,
      vendorName: vendor.name,
      date,
      status: 'Pending', // Back to original React app status
      notes,
      totalPrice
    };
    
    setBookings(prev => {
      const updated = [...prev, newBooking];
      localStorage.setItem('tramhy_system_bookings', JSON.stringify(updated));
      return updated;
    });
    
    localStorage.setItem('tramhy_active_booking', JSON.stringify(newBooking));
    localStorage.setItem('tramhy_active_booking_status', 'Pending');
  };

  const updateBookingStatus = (bookingId: string, status: string) => {
    setBookings(prev => {
      const updated = prev.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      );
      localStorage.setItem('tramhy_system_bookings', JSON.stringify(updated));
      return updated;
    });
    
    const activeStr = localStorage.getItem('tramhy_active_booking');
    if (activeStr) {
      const active = JSON.parse(activeStr);
      if (active.id === bookingId) {
        localStorage.setItem('tramhy_active_booking_status', status);
        active.status = status;
        localStorage.setItem('tramhy_active_booking', JSON.stringify(active));
      }
    }
  };

  return (
    <BookingContext.Provider value={{ vendors, bookings, bookVendor, updateBookingStatus }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
