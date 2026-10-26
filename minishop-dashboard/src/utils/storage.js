export function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (value === null) return fallback;
    if (Array.isArray(fallback)) return Array.isArray(value) ? value : fallback;
    return typeof value === 'object' && !Array.isArray(value)
      ? { ...fallback, ...value }
      : fallback;
  } catch {
    return fallback;
  }
}
export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Storage can be disabled by the browser. */
  }
}
export const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
export const categoryLabel = (category) =>
  ({
    electronics: 'Electronics',
    jewelery: 'Jewelry',
    "men's clothing": 'Men’s Clothing',
    "women's clothing": 'Women’s Clothing',
  })[category] || category;
