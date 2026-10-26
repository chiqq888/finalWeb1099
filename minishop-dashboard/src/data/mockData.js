// Demo mock products as specified
export const mockProducts = [
  { id: 1, name: 'Mouse', category: 'Accessories', price: 450, stock: 20 },
  { id: 2, name: 'Keyboard', category: 'Accessories', price: 1200, stock: 10 },
  { id: 3, name: 'Monitor', category: 'Display', price: 3500, stock: 5 },
  { id: 4, name: 'USB-C Hub', category: 'Accessories', price: 850, stock: 0 },
  { id: 5, name: 'Webcam', category: 'Camera', price: 990, stock: 8 },
];

// Demo orders
export const initialOrders = [
  {
    id: 'MS-00124',
    customer: 'John Doe',
    date: '26 Oct 2026',
    total: 109.95,
    status: 'Delivered',
    isSample: true,
  },
  {
    id: 'MS-00123',
    customer: 'Jane Smith',
    date: '25 Oct 2026',
    total: 79.99,
    status: 'Processing',
    isSample: true,
  },
  {
    id: 'MS-00122',
    customer: 'Mike Johnson',
    date: '24 Oct 2026',
    total: 48.0,
    status: 'Shipped',
    isSample: true,
  },
  {
    id: 'MS-00121',
    customer: 'Sarah Lee',
    date: '23 Oct 2026',
    total: 115.0,
    status: 'Pending',
    isSample: true,
  },
  {
    id: 'MS-00120',
    customer: 'David Kim',
    date: '22 Oct 2026',
    total: 59.99,
    status: 'Delivered',
    isSample: true,
  },
];

export const initialProfile = {
  name: 'นาย รัชตพงศ์ อรรถีโภค',
  studentId: '67051099',
  email: '67051099@kmitl.ac.th',
  phone: '089-765-4321',
  address: '239 ถ.ห้วยแก้ว ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200',
  bio: 'นักศึกษาสาขาวิชาวิทยาการคอมพิวเตอร์ / นักพัฒนาเว็บไซต์ Web Programming',
  avatar: '',
};
