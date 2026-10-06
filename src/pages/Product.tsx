import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products, store } from '../data'
import { useStore } from '../context/Store'
import { ChevronDown, ClockIcon, GiftIcon, StoreIcon, TruckIcon } from '../components/Icons'
import { Price, ProductCarousel, ProductImage, QuantityStepper, useQuickView, WishButton } from '../components/Products'
import { Rating, SectionHeading, usePageMeta } from '../components/ui'

function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0)
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const move = (e: React.MouseEvent) => {
    const r = box.current!.getBoundingClientRect()
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }
  return (
    <div className="lg:sticky lg:top-24">
      <div ref={box} onMouseMove={move} onMouseLeave={() => setZoom(null)}
        className="relative aspect-square cursor-zoom-in overflow-hidden rounded-4xl bg-cream-200 shadow-card">
        <div className="h-full w-full transition-transform duration-200 ease-out" style={zoom ? { transform: 'scale(1.9)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}>
          <ProductImage src={images[i]} alt={`${name}, view ${i + 1}`} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3" role="tablist" aria-label="Product images">
        {images.map((src, k) => (
          <button key={src} role="tab" aria-selected={i === k} aria-label={`View ${k + 1}`} onClick={() => setI(k)}
            className={`aspect-square overflow-hidden rounded-2xl border-2 transition ${i === k ? 'border-cocoa-600' : 'border-transparent opacity-70 hover:opacity-100'}`}>
            <ProductImage src={src} alt={`${name} thumbnail ${k + 1}`} />
          </button>
        ))}
      </div>
    </div>
  )
}

function Accordion({ title, icon, children, open: o = false }: { title: string; icon: React.ReactNode; children: React.ReactNode; open?: boolean }) {
  const [open, setOpen] = useState(o)
  return (
    <div className="border-b border-cream-300">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex min-h-[56px] w-full items-center gap-3 text-left text-sm font-bold text-cocoa-700">
        <span className="text-blush-400">{icon}</span><span className="flex-1">{title}</span>
        <ChevronDown size={18} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden text-sm leading-relaxed text-cocoa-500">{children}</div></div>
    </div>
  )
}

export default function ProductPage() {
  const { slug } = useParams()
  const p = products.find((x) => x.slug === slug)
  usePageMeta(p ? p.name : 'Gift not found', p?.description)
  const { addToCart } = useStore()
  const nav = useNavigate()
  const [qty, setQty] = useState(1)
  const { open, node } = useQuickView()
  const related = useMemo(() => products.filter((x) => p && x.id !== p.id && (x.category === p.category || x.occasions.some((o) => p.occasions.includes(o)))).slice(0, 8), [p])

  if (!p) return (
    <div className="container-x py-28 text-center"><h1 className="text-4xl text-cocoa-700">We couldn’t find that gift</h1><Link to="/shop" className="btn-primary mt-8">Back to shop</Link></div>
  )

  const ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.description, category: p.category, aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviews }, offers: { '@type': 'Offer', priceCurrency: 'AUD', price: p.salePrice ?? p.price, availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock', url: `/product/${p.slug}` } }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="container-x py-6 sm:py-10">
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-cocoa-400"><Link to="/" className="hover:underline">Home</Link> / <Link to="/shop" className="hover:underline">Shop</Link> / <span className="text-cocoa-600">{p.name}</span></nav>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <Gallery key={p.id} images={p.gallery} name={p.name} />
          <div>
            <p className="eyebrow">{p.category}</p>
            <div className="mt-2 flex items-start justify-between gap-3"><h1 className="text-4xl leading-tight text-cocoa-700 sm:text-5xl">{p.name}</h1><WishButton product={p} className="shrink-0 !bg-white" /></div>
            <div className="mt-3"><Rating value={p.rating} count={p.reviews} size={16} /></div>
            <div className="mt-5"><Price product={p} size="lg" /></div>
            <p className="mt-5 leading-relaxed text-cocoa-500">{p.description}</p>
            <p className={`mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold ${p.inStock ? 'bg-sage-100 text-sage-700' : 'bg-blush-100 text-blush-400'}`}>
              <span className={`h-2 w-2 rounded-full ${p.inStock ? 'bg-sage-500' : 'bg-blush-400'}`} />{p.inStock ? 'In Stock' : 'Sold out'}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <QuantityStepper value={qty} onChange={setQty} />
              <button disabled={!p.inStock} onClick={() => addToCart(p, qty)} className="btn-secondary !min-h-[52px] flex-1 sm:flex-none sm:!px-8">Add to Cart</button>
            </div>
            <button disabled={!p.inStock} onClick={() => { addToCart(p, qty); nav('/cart') }} className="btn-primary mt-3 w-full !min-h-[56px] text-base">Buy Now</button>

            <div className="mt-8 border-t border-cream-300">
              <Accordion open title="Product details" icon={<GiftIcon size={20} />}><ul className="list-disc space-y-1.5 pl-5">{p.details.map((d) => <li key={d}>{d}</li>)}</ul></Accordion>
              <Accordion title="Delivery information" icon={<TruckIcon size={20} />}>Same-day local delivery when ordered before 2pm (Mon–Sat). Free over $80, otherwise $9.95. Australia-wide shipping 2–5 business days.</Accordion>
              <Accordion title="Pickup availability" icon={<StoreIcon size={20} />}>Free click &amp; collect from {store.address}. Usually ready within 2 hours during opening hours.</Accordion>
              <Accordion title="Returns" icon={<ClockIcon size={20} />}>Not quite right? Let us know within 7 days of delivery and we’ll make it right. Fresh flowers and personalised items are non-returnable.</Accordion>
            </div>
          </div>
        </div>
      </div>

      <section className="section container-x" aria-label="Related gifts">
        <SectionHeading eyebrow="More to explore" title="You May Also Like" align="left" />
        <ProductCarousel items={related} onQuickView={open} />
      </section>
      {node}
    </>
  )
}
