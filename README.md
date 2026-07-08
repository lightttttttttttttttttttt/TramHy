# Trạm Hỷ - Đám cưới trong mơ, không lo rủi ro (MVP)

Trạm Hỷ là nền tảng B2B2C tiên phong tại Việt Nam, mang đến giải pháp toàn diện cho các cặp đôi chuẩn bị cưới. Sản phẩm giải quyết bài toán cốt lõi của thị trường cưới: **Sự thiếu minh bạch về giá cả** và **Rủi ro mất tiền cọc**.

## 🌟 Điểm nổi bật (USPs)

1. **Phân rã ngân sách bằng AI (AI Budgeting)**
   - Khách hàng chỉ cần nhập tổng ngân sách, AI sẽ tự động phân bổ tỷ lệ phần trăm tối ưu cho các hạng mục (Nhà hàng, Chụp ảnh, Trang trí...) dựa trên dữ liệu thị trường thực tế.
2. **Thanh toán Bảo chứng (Escrow Payment)**
   - Giải quyết triệt để nỗi lo "bùng cọc". Hệ thống giữ tiền của khách hàng và chỉ giải ngân cho Vendor (Nhà cung cấp) khi từng chặng dịch vụ (Milestone) được hoàn tất.
3. **Quản lý 2 chiều (B2B & B2C)**
   - **B2C (Cô dâu/Chú rể)**: Dashboard theo dõi tiến độ công việc (Planning) và quản lý hợp đồng/giải ngân.
   - **B2B (Vendor)**: Dashboard quản lý doanh thu, yêu cầu đặt lịch, và theo dõi dòng tiền Escrow.

## 🚀 Tính năng hiện có trong MVP

- **Landing Page (`/`)**: Phễu bán hàng (Sale Funnel) giới thiệu tính năng với giao diện Luxury.
- **Trợ lý Số (`/ai-assistant`)**: Công cụ AI chia ngân sách trực quan.
- **Danh bạ Dịch vụ (`/marketplace`)**: Nơi tìm kiếm và lọc Vendor.
- **Chi tiết & Đặt cọc (`/vendor/:id`)**: Trang chốt sale và khởi tạo thanh toán Escrow.
- **Quản lý Đơn hàng (`/user-dashboard`)**: Dashboard cho khách hàng theo dõi tiến độ.
- **Kênh Nhà cung cấp (`/vendor-dashboard`)**: Dashboard B2B quản lý doanh thu.
- **Công cụ Lên kế hoạch (`/planning`)**: Checklist công việc cần làm.
- **Đăng nhập (`/login`)**: Hệ thống phân luồng người dùng (Khách hàng / Vendor).

## 💻 Cài đặt & Chạy dự án (Local)

Dự án được xây dựng với **React (Vite) + TypeScript**.
Đã được tích hợp sẵn **Docker** để chạy mọi lúc mọi nơi.

### Chạy bằng Docker (Khuyên dùng)
```bash
# Build image
docker build -t tramhy-app .

# Chạy container ở port 8080
docker run -d -p 8080:80 --name tramhy-container tramhy-app
```
Truy cập: `http://localhost:8080`

### Chạy bằng NPM (Phát triển)
```bash
# Cài đặt thư viện
npm install

# Khởi chạy môi trường Dev
npm run dev
```

## 🛠 Tech Stack
- **Framework**: React 18, Vite
- **Ngôn ngữ**: TypeScript
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (CSS Variables) - *Ponytail & Selective Laziness Architecture*
- **Deployment**: Docker, Nginx (Alpine)

---
*Được phát triển với tinh thần "Ponytail - Selective Laziness" - Chỉ code những gì tạo ra giá trị kinh doanh thực sự!*
