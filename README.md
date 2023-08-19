# Project_E-commerce_LEHUSO
# Mô Tả Đồ Án LEHUSO (Lê Hùng Sơn) - Quy Trình Mua Sắm Trực Tuyến

## Mô Tả

Đồ án này mô tả quy trình khách hàng thực hiện việc xem sản phẩm, thêm vào giỏ hàng, và thực hiện thanh toán trên trang web Thương mại điện tử LEHUSO (Lê Hùng Sơn).

### Các Chức Năng Đã Làm

#### Phân Hệ Khách Hàng

**Khách Hàng:**

- Đăng Nhập, Đăng Ký, Đăng Xuất
- Thêm Sản Phẩm Vào Giỏ Hàng
- Tìm Kiếm Sản Phẩm
- Xem Chi Tiết Sản Phẩm
- Thanh Toán
- Tạo Một Hoá Đơn
- Xem Đơn Hàng Cá Nhân
- Đánh Giá Sản Phẩm Bằng Sao
- Bình Luận Về Sản Phẩm
- Phân Trang (20 Sản Phẩm Mỗi Trang)
- Lọc Sản Phẩm: Theo Giá, Hãng, Loại Sản Phẩm

#### Phân Hệ Quản Trị (ADMIN)

**ADMIN:**

- Thống Kê So Sánh Giữa 2 Tháng Gần Nhất: Khách Hàng, Thu Nhập, Hoá Đơn
- Thống Kê Về Người Dùng, Hoá Đơn, Sản Phẩm Tại Mọi Thời Điểm
- Thay Đổi Trạng Thái Của Đơn Hàng
- CRUD Khách Hàng (Tạo, Đọc, Cập Nhật, Xóa Khách hàng)
- CRUD Sản Phẩm (Tạo, Đọc, Cập Nhật, Xóa Sản Phẩm)

### Công Nghệ Sử Dụng

- Front End: **ReactJS**, **Tailwind CSS** ,**Material UI**
- Back End: **NodeJS**
- Hệ Thống Lưu Trữ Ảnh: **Cloudinary**
- Thanh Toán Hoá Đơn: **Stripe** (Tự Động Tạo Hoá Đơn Cho Khách Hàng)
- Mã hóa dùng để bảo mật mật khẩu : **Bcrypt**
- Hỗ trợ việc xác thực và duy trì trạng thái xác thực của người dùng. : **JWT** ((JSON Web Token)
- Hệ Thống Lưu Trữ Dữ Liệu: **Mongodb Cloud** (No SQL)
