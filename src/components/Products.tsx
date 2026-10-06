import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { effectivePrice, money, type Product } from '../data'
import { useStore } from '../context/Store'
import { ChevronLeft, ChevronRight, CloseIcon, EyeIcon, HeartIcon, MinusIcon, PlusIcon, BagIcon } from './Icons'
import { Modal, Rating, Reveal } from './ui'

/** Product photo on a clean white stage so supplier shots with white backgrounds blend in. */
export function ProductImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full bg-white object-contain ${className}`} />
}

export function WishButton({ product, className = '' }: { product: Product; className?: string }) {
  const { wishlist, toggleWish } = useStore()
  const on = wishlist.includes(product.id)
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWish(product.id, product.name) }}
      aria-pressed={on}
      aria-label={on ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      className={`grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-soft sm:h-11 sm:w-11 backdrop-blur transition hover:scale-105 active:scale-90 ${className}`}
    >
      <HeartIcon size={19} className={`transition ${on ? 'fill-blush-400 text-blush-400' : 'text-cocoa-600'}`} />
    </button>
  )
}

export function Price({ product, size = 'md' }: { product: Product; size?: 'md' | 'lg' }) {
  const big = size === 'lg'
  return (
    <p className="flex items-baseline gap-2">
      <span className={`font-bold ${big ? 'text-2xl' : 'text-base'} ${product.salePrice ? 'text-blush-400' : 'text-cocoa-700'}`}>{money(effectivePrice(product))}</span>
      {product.salePrice && <s className={`text-cocoa-400 ${big ? 'text-base' : 'text-sm'}`}>{money(product.price)}</s>}
    </p>
  )
}

export function ProductCard({ product, onQuickView, compact = false }: { product: Product; onQuickView?: (p: Product) => void; compact?: boolean }) {
  const { addToCart } = useStore()
  return (
    <article className="group flex h-full min-w-0 flex-col">
      <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-cream-300/80 transition duration-300 group-hover:shadow-lift group-hover:ring-blush-200">
        <Link to={`/product/${product.slug}`} aria-label={product.name} className="block h-full p-1.5">
          <ProductImage src={product.image} alt={product.name} className="rounded-3xl transition duration-700 group-hover:scale-105" />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.salePrice && <span className="rounded-full bg-blush-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Sale</span>}
          {product.isNew && <span className="rounded-full bg-sage-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">New</span>}
          {!product.inStock && <span className="rounded-full bg-cocoa-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Sold out</span>}
        </div>
        <WishButton product={product} className="absolute right-2 top-2 sm:right-3 sm:top-3" />
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 left-1/2 hidden min-h-[40px] -translate-x-1/2 translate-y-3 items-center gap-2 whitespace-nowrap rounded-full bg-cocoa-700/95 px-5 text-sm font-semibold text-cream-50 opacity-0 shadow-card transition duration-300 focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:flex"
          ><EyeIcon size={16} />Quick View</button>
        )}
      </div>
      <div className={`flex flex-1 flex-col ${compact ? 'pt-3.5' : 'pt-4'}`}>
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-sage-500">{product.category}</p>
        <h3 className="mt-1 font-display text-lg leading-snug text-cocoa-700 sm:text-xl"><Link to={`/product/${product.slug}`} className="decoration-blush-300 underline-offset-4 hover:underline">{product.name}</Link></h3>
        <div className="mt-1"><Rating value={product.rating} count={product.reviews} /></div>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-2 gap-y-2 pt-3">
          <Price product={product} />
          <div className="flex gap-1.5">
            {onQuickView && <button onClick={() => onQuickView(product)} aria-label={`Quick view ${product.name}`} className="grid h-10 w-10 place-items-center rounded-full border border-cocoa-600/25 text-cocoa-700 transition hover:bg-cream-200 sm:h-11 sm:w-11 md:hidden"><EyeIcon size={18} /></button>}
            <button
              onClick={() => addToCart(product)} disabled={!product.inStock}
              aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is sold out`}
              className="grid h-10 w-10 place-items-center rounded-full bg-cocoa-600 text-white shadow-soft sm:h-11 sm:w-11 transition hover:scale-105 hover:bg-cocoa-700 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
            ><BagIcon size={18} /></button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProductGrid({ items, onQuickView, cols = 4 }: { items: Product[]; onQuickView?: (p: Product) => void; cols?: 3 | 4 }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 ${cols === 4 ? 'xl:grid-cols-4' : 'lg:gap-6'}`}>
      {items.map((p, i) => (
        <Reveal key={p.id} delay={(i % 4) * 70} className="min-w-0"><ProductCard product={p} onQuickView={onQuickView} compact /></Reveal>
      ))}
    </div>
  )
}

export function ProductCarousel({ items, onQuickView }: { items: Product[]; onQuickView?: (p: Product) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.8), behavior: 'smooth' })
  const arrow = 'grid h-11 w-11 place-items-center rounded-full border border-cocoa-600/25 bg-white text-cocoa-700 transition hover:bg-cocoa-600 hover:text-white'
  return (
    <div className="relative">
      <div className="mb-4 hidden justify-end gap-2 sm:flex">
        <button className={arrow} onClick={() => scroll(-1)} aria-label="Previous products"><ChevronLeft /></button>
        <button className={arrow} onClick={() => scroll(1)} aria-label="Next products"><ChevronRight /></button>
      </div>
      <div ref={ref} role="region" aria-label="Product carousel" tabIndex={0} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-6 sm:mx-0 sm:px-0">
        {items.map((p) => (
          <div key={p.id} className="w-[68%] shrink-0 snap-start sm:w-[calc(33.333%-.75rem)] lg:w-[calc(25%-.75rem)]"><ProductCard product={p} onQuickView={onQuickView} compact /></div>
        ))}
      </div>
    </div>
  )
}

export function QuantityStepper({ value, onChange, min = 1, label = 'Quantity' }: { value: number; onChange: (n: number) => void; min?: number; label?: string }) {
  const b = 'grid h-11 w-11 place-items-center rounded-full transition hover:bg-cream-200 disabled:opacity-40'
  return (
    <div className="inline-flex items-center rounded-full border border-cream-300 bg-white p-0.5" role="group" aria-label={label}>
      <button className={b} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease quantity"><MinusIcon size={16} /></button>
      <span className="w-10 text-center text-sm font-bold" aria-live="polite">{value}</span>
      <button className={b} onClick={() => onChange(Math.min(20, value + 1))} aria-label="Increase quantity"><PlusIcon size={16} /></button>
    </div>
  )
}

export function QuickViewModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addToCart } = useStore()
  const nav = useNavigate()
  const [qty, setQty] = useState(1)
  if (!product) return null
  return (
    <Modal open onClose={onClose} label={`Quick view: ${product.name}`}>
      <button onClick={onClose} aria-label="Close quick view" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white shadow-soft hover:bg-cream-200"><CloseIcon /></button>
      <div className="grid md:grid-cols-2">
        <div className="aspect-square bg-white md:aspect-auto"><ProductImage src={product.image} alt={product.name} /></div>
        <div className="flex flex-col gap-3 p-6 sm:p-8">
          <p className="eyebrow">{product.category}</p>
          <h2 className="text-3xl text-cocoa-700">{product.name}</h2>
          <Rating value={product.rating} count={product.reviews} size={15} />
          <Price product={product} size="lg" />
          <p className="text-sm leading-relaxed text-cocoa-500">{product.description}</p>
          <p className={`text-sm font-semibold ${product.inStock ? 'text-sage-700' : 'text-blush-400'}`}>● {product.inStock ? 'In stock' : 'Currently sold out'}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} />
            <button className="btn-secondary" disabled={!product.inStock} onClick={() => { addToCart(product, qty); onClose() }}>Add to Cart</button>
          </div>
          <button className="btn-primary w-full" disabled={!product.inStock} onClick={() => { addToCart(product, qty); onClose(); nav('/cart') }}>Buy Now</button>
          <Link to={`/product/${product.slug}`} onClick={onClose} className="link-arrow justify-center pt-1">View full details</Link>
        </div>
      </div>
    </Modal>
  )
}

/** Hook-friendly helper so pages can share one quick-view instance. */
export function useQuickView() {
  const [qv, setQv] = useState<Product | null>(null)
  return { qv, open: setQv, node: <QuickViewModal key={qv?.id} product={qv} onClose={() => setQv(null)} /> }
}
