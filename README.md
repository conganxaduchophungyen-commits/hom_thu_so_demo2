# HÒM THƯ TỐ GIÁC TỘI PHẠM SỐ
## Công an xã Đức Hợp, tỉnh Hưng Yên

### 1. Công nghệ
Google Apps Script Web App + HTML/CSS/JS + Google Sheets + Google Drive.
Kiến trúc: Frontend → API/Controller → Service → Repository/Sheets/Drive.

### 2. Cài đặt
1. Tạo Apps Script project hoặc dùng clasp.
2. Đưa toàn bộ `.gs`, `.html`, `appsscript.json` vào project. Có thể giữ thư mục source để quản lý Git; Apps Script editor hiển thị file theo project.
3. Chạy `setupSystem()` một lần bằng tài khoản triển khai.
4. Cấp quyền Spreadsheet/Drive/Mail/Triggers.
5. Deploy → New deployment → Web app → Execute as Me → chọn phạm vi truy cập phù hợp.
6. Kiểm thử trang công khai, gửi hồ sơ, tra cứu, đăng nhập.

### 3. Tài khoản quản trị ban đầu
- Login: `admin`
- Password: `admin@123`
- Bắt buộc đổi mật khẩu lần đầu.

Không nên dùng mật khẩu mặc định trong môi trường vận hành lâu dài.

### 4. Tài khoản cán bộ
Khi admin tạo tài khoản mới, mặc định mật khẩu là `1` và `mustChangePassword=true`. LoginName được nhập theo quy ước đơn vị; có thể dùng dạng `A343xxx` như yêu cầu nghiệp vụ. Danh sách thôn phụ trách lưu trong trường `villages`.

### 5. Database
Các sheet: CASES, USERS, PROCESS_HISTORY, LEGAL_RULES, ATTACHMENTS, AUDIT_LOG, NOTIFICATIONS, SYSTEM_CONFIG.

### 6. Workflow
NEW → RECEIVED → CLASSIFIED → ASSIGNED → PROCESSING → VERIFYING/WAITING_INFO → RESOLVED → CLOSED; có OUT_OF_SCOPE, CANCELLED và TRANSFERRED theo state machine.

### 7. Deadline
Deadline lấy từ `LEGAL_RULES`, không hard-code thời hạn pháp lý trong workflow. `runDeadlineCheck()` được trigger mỗi giờ.

### 8. File
Mỗi case có thư mục Drive riêng theo năm. Tối đa 5 file, 10 MB/file; kiểm tra MIME type, extension/tên file.

### 9. Bảo mật
Backend kiểm tra session và permission; mật khẩu hash SHA-256 lặp với salt; không gửi thông tin nghiệp vụ trong email; không expose Spreadsheet/Drive ID cho frontend; audit các thao tác chính; LockService cho sequence case ID.

### 10. Kiểm thử
Chạy `runAllTests()` sau setup. Có test cấu hình, state machine, 11 thôn, case ID, tracking code, password hash, permission và legal rule.

### 11. Giới hạn cần biết
Google Sheets phù hợp phiên bản đầu và tải vừa phải. Khi dữ liệu/hồ sơ tăng lớn, nên chuyển Repository sang Cloud SQL/Firestore và dùng Cloud Storage/Drive có cơ chế phân quyền chặt hơn; Apps Script tiếp tục làm lớp nghiệp vụ/API hoặc chuyển sang Cloud Run.
