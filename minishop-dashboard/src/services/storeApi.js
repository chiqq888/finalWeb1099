export async function fetchProducts(signal) {
  let response;
  const signals = [];
  if (signal) signals.push(signal);
  try {
    signals.push(AbortSignal.timeout(15000));
    response = await fetch('https://fakestoreapi.com/products', {
      signal: signals.length > 1 ? AbortSignal.any(signals) : signals[0],
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new Error('เชื่อมต่อร้านค้าไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้ง');
  }
  if (!response.ok)
    throw new Error(`โหลดสินค้าไม่สำเร็จ (${response.status}) กรุณาลองอีกครั้ง`);
  const data = await response.json();
  if (
    !Array.isArray(data) ||
    !data.length ||
    data.some(
      (p) =>
        !Number.isFinite(p.id) ||
        typeof p.title !== 'string' ||
        !Number.isFinite(p.price) ||
        p.price < 0 ||
        typeof p.image !== 'string' ||
        typeof p.category !== 'string'
    )
  )
    throw new Error('ข้อมูลสินค้าไม่ถูกต้อง กรุณาลองอีกครั้ง');
  return data.map((p) => {
    // กำหนดสต็อกจำลองสำหรับข้อมูลจาก API (เนื่องจาก Fake Store API ไม่มี stock)
    // ให้มีสินค้าที่มี stock = 0 เพื่อรองรับการทดสอบ Out of Stock และสินค้าที่มี stock > 0
    const defaultStock = p.id % 5 === 0 ? 0 : ((p.id * 7) % 25) + 5;
    return {
      id: p.id,
      name: p.title.trim(),
      price: Number(p.price),
      description: p.description || '',
      category: p.category,
      image: p.image,
      stock: p.stock !== undefined ? Number(p.stock) : defaultStock,
      rating: p.rating?.rate ?? 0,
      reviewsCount: p.rating?.count ?? 0,
    };
  });
}
