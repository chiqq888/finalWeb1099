import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { fetchProducts } from '../src/services/storeApi.js';
const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});
const product = {
  id: 1,
  title: ' Backpack ',
  price: 109.95,
  image: 'https://fakestoreapi.com/img/backpack.png',
  category: "men's clothing",
  description: 'Everyday backpack',
  rating: { rate: 3.9, count: 120 },
};
const signal = () => new AbortController().signal;

test('normalizes the API catalog and keeps the original USD price and ratings', async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://fakestoreapi.com/products');
    assert.ok(options.signal instanceof AbortSignal);
    return new Response(JSON.stringify([product]));
  };
  const [result] = await fetchProducts(signal());
  assert.equal(result.name, 'Backpack');
  assert.equal(result.price, 109.95);
  assert.equal(result.rating, 3.9);
  assert.equal(result.reviewsCount, 120);
  assert.equal(result.image, product.image);
});

test('reports an HTTP failure instead of showing mock products', async () => {
  globalThis.fetch = async () => new Response('', { status: 503 });
  await assert.rejects(fetchProducts(signal()), /503/);
});

test('reports a network failure with a retryable message', async () => {
  globalThis.fetch = async () => {
    throw new TypeError('Failed to fetch');
  };
  await assert.rejects(fetchProducts(signal()), /ลองอีกครั้ง/);
});

test('rejects malformed prices and unexpected catalog responses', async () => {
  for (const response of [
    [{ ...product, price: '109.95' }],
    [{ ...product, price: -1 }],
    { products: [product] },
    [],
  ]) {
    globalThis.fetch = async () => new Response(JSON.stringify(response));
    await assert.rejects(fetchProducts(signal()), /ข้อมูลสินค้าไม่ถูกต้อง/);
  }
});

test('allows a zero price and safely defaults missing ratings', async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify([{ ...product, price: 0, rating: undefined }]));
  const [result] = await fetchProducts(signal());
  assert.equal(result.price, 0);
  assert.equal(result.rating, 0);
  assert.equal(result.reviewsCount, 0);
});

test('preserves cancellation so an unmounted request cannot report a network error', async () => {
  const controller = new AbortController();
  controller.abort();
  globalThis.fetch = async (_url, options) => {
    options.signal.throwIfAborted();
  };
  await assert.rejects(fetchProducts(controller.signal), { name: 'AbortError' });
});
