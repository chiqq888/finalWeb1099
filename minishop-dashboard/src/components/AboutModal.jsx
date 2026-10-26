import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import Modal from './Modal';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <Modal title="A little more about MiniShop." onClose={onClose}>
      <div className="flex justify-center my-3">
        <span className="w-16 h-16 rounded-[12px] bg-orange-500 text-white flex items-center justify-center shadow-none">
          <ShoppingBag size={32} />
        </span>
      </div>
      <p className="text-base text-gray-700 leading-relaxed text-center font-medium">
        ของใช้ชิ้นเล็ก ๆ ที่ทำให้ทุกวันพิเศษขึ้น เลือกช้อปเสื้อผ้า เครื่องประดับ
        และอุปกรณ์อิเล็กทรอนิกส์ที่คุณชอบได้ในที่เดียว
      </p>
      <div className="p-4 bg-orange-50 border border-orange-200 rounded-[8px] text-sm text-orange-950 leading-relaxed">
        <strong>ข้อมูลโปรเจกต์:</strong> เว็บไซต์ตัวอย่างสำหรับโครงงาน Web Programming
        รหัสนักศึกษา 67051099
        <br />
        การสั่งซื้อเป็นการจำลอง ไม่มีการเรียกเก็บเงินจริง ราคาสินค้าเป็นดอลลาร์สหรัฐ (USD)
      </div>
      <div className="flex justify-center pt-3">
        <a
          className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition"
          href="https://fakestoreapi.com/"
          target="_blank"
          rel="noreferrer"
        >
          <span>Product catalog by Fake Store API</span>
          <ArrowUpRight size={16} />
        </a>
      </div>
    </Modal>
  );
}
