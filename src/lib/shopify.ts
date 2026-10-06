import { store } from '../data'

// Single place that knows how to build Shopify URLs. Swap `store.shopifyDomain`
// for the real store domain and every CTA follows.
const base = store.shopifyDomain

export const shopifyUrls = {
  home: () => base,
  product: (handle: string) => `${base}/products/${handle}`,
  collection: (handle = 'all') => `${base}/collections/${handle}`,
  cart: () => `${base}/cart`,
  // Cart permalink: adds a variant and goes straight to checkout.
  buyNow: (variantId: string, qty = 1) => `${base}/cart/${variantId}:${qty}`,
}
