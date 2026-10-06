import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { effectivePrice, products, type Product } from '../data'

interface Toast { id: number; message: string }
export interface CartLine { product: Product; qty: number }
interface StoreCtx {
  lines: CartLine[]
  cartCount: number
  subtotal: number
  addToCart: (product: Product, qty?: number) => void
  setQty: (id: string, qty: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  wishlist: string[]
  toggleWish: (id: string, name?: string) => void
  toasts: Toast[]
  notify: (message: string) => void
}

const Ctx = createContext<StoreCtx | null>(null)
const KEY = 'greetings-and-gift-cart'
const WKEY = 'greetings-and-gift-wish'

const load = <T,>(key: string, fallback: T): T => {
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback } catch { return fallback }
}
const save = (key: string, v: unknown) => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* storage unavailable */ } }

// Local cart, persisted in the browser. When the Shopify store is connected,
// swap these actions for Storefront API cart mutations; consumers stay the same.
export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>(() => load(KEY, {}))
  const [wishlist, setWish] = useState<string[]>(() => load(WKEY, []))
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => save(KEY, items), [items])
  useEffect(() => save(WKEY, wishlist), [wishlist])

  const notify = useCallback((message: string) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  const addToCart = useCallback((product: Product, qty = 1) => {
    setItems((c) => ({ ...c, [product.id]: Math.min(20, (c[product.id] ?? 0) + qty) }))
    notify(`${product.name} added to your bag`)
  }, [notify])

  const setQty = useCallback((id: string, qty: number) => {
    setItems((c) => {
      const n = { ...c }
      if (qty <= 0) delete n[id]; else n[id] = Math.min(20, qty)
      return n
    })
  }, [])

  const removeFromCart = useCallback((id: string) => setItems((c) => { const n = { ...c }; delete n[id]; return n }), [])
  const clearCart = useCallback(() => setItems({}), [])

  const toggleWish = useCallback((id: string, name = 'Gift') => {
    setWish((w) => {
      const has = w.includes(id)
      notify(has ? `${name} removed from wishlist` : `${name} saved to wishlist`)
      return has ? w.filter((x) => x !== id) : [...w, id]
    })
  }, [notify])

  const lines = useMemo<CartLine[]>(
    () => Object.entries(items).flatMap(([id, qty]) => { const product = products.find((p) => p.id === id); return product ? [{ product, qty }] : [] }),
    [items],
  )
  const cartCount = lines.reduce((n, l) => n + l.qty, 0)
  const subtotal = lines.reduce((n, l) => n + effectivePrice(l.product) * l.qty, 0)

  const value = useMemo(
    () => ({ lines, cartCount, subtotal, addToCart, setQty, removeFromCart, clearCart, wishlist, toggleWish, toasts, notify }),
    [lines, cartCount, subtotal, addToCart, setQty, removeFromCart, clearCart, wishlist, toggleWish, toasts, notify],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useStore must be used inside StoreProvider')
  return c
}
