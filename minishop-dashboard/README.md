# MiniShop Dashboard

React + Vite + Tailwind CSS storefront and admin dashboard, with React Router, RESTful API integration, and inventory management.

## Run

```bash
npm install
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

## Validate

```bash
npm run build
npm run lint
npm test
```

## Pages & Routes (React Router)

- `/`: Home — welcome banner, featured products, category links และปุ่ม Add to Cart
- `/products`: Shop / Catalog — รายการสินค้าทั้งหมด ค้นหา กรองหมวดหมู่ เรียงราคาและคะแนน
- `/products/:id` หรือ `/product/:id`: Product Detail — รูปภาพ รายละเอียด ราคา คะแนนรีวิว และปุ่มเพิ่มลงตะกร้า
- `/about`: About — ข้อมูลเกี่ยวกับแอปพลิเคชัน ข้อมูลโครงงาน และการเชื่อมต่อ Fake Store API
- `/cart`: Shopping Cart — รายการสินค้า ปรับเพิ่มลดจำนวน ลบรายการ และสรุปราคารวม
- `/profile`: Profile — ข้อมูลส่วนตัว ฟอร์มแก้ไขโปรไฟล์ ที่อยู่ และประวัติคำสั่งซื้อ
- `/dashboard`: Admin Dashboard — สถิติสินค้า ยอดขาย กราฟ และระบบจัดการสินค้าคงคลัง (ค้นหา กรอง เพิ่ม ลบสินค้า พร้อมสรุป 3 ค่าทันที)

## Data Sources & Fallback

- แหล่งข้อมูลหลัก: เชื่อมต่อ REST API จาก `https://fakestoreapi.com/products` โดยมีการแปลงข้อมูล `title -> name`, ดึงคะแนนรีวิวจาก `rating.rate`, และสร้างสต็อกจำลองเพื่อใช้ในการคำนวณคงคลัง
- แหล่งข้อมูลสำรอง (Fallback): หากเกิดข้อผิดพลาดในการโหลด API ระบบจะแจ้งเตือนและสลับมาใช้ Mock Data (5 รายการ) โดยอัตโนมัติตามเกณฑ์กำหนด
- ในหน้า Dashboard มีปุ่ม "Reset Mock" และ "Fetch API" เพื่อทดสอบและสลับแหล่งข้อมูลได้ตลอดเวลา
