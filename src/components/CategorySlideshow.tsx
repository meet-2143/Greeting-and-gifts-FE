import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data'
import { ArrowIcon, ChevronLeft, ChevronRight } from './Icons'
import { ProductImage } from './Products'
import { Reveal, SectionHeading } from './ui'

const AUTOPLAY_MS = 5500

const slides = [
  { category: 'Candles', title: 'Boutique Candles', text: 'Hand-poured Cashmere & Silk candles with patchwork animal designs and a gold-finish lid.', images: ['/images/candle-collection.jpg', '/images/owl-candle.jpg', '/images/dog-candle.jpg'], bg: 'bg-blush-100', accent: 'bg-blush-300' },
  { category: 'Trays', title: 'Mini Trays', text: 'Eight collectable melamine trays for tea, treats and trinkets, each with its own patchwork friend.', images: ['/images/tray-collection.jpg', '/images/owl-tray.jpg'], bg: 'bg-sage-100', accent: 'bg-sage-300' },
  { category: 'Mugs & Cups', title: 'Mugs & Cups', text: 'Fine china florals and sweet “My First Cup” elephants, all gift boxed.', images: ['/images/floral-mugs.jpg', '/images/elephant-mugs.jpg', '/images/elephant-mug-blue.jpg'], bg: 'bg-peach-100', accent: 'bg-peach-300' },
  { category: 'Photo Frames', title: 'Photo Frames', text: 'Enamelled teddy bear frames in baby blue and pink, a keepsake for the nursery.', images: ['/images/teddy-frames.jpg'], bg: 'bg-cream-200', accent: 'bg-cream-300' },
]

/** Auto-advancing slideshow of the top categories. Pauses on hover/focus and when the tab is hidden. */
export function CategorySlideshow() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useRef(typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  const touchX = useRef<number | null>(null)
  const n = slides.length
  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n])

  useEffect(() => {
    if (paused || reduced.current) return
    const t = setTimeout(() => go(i + 1), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [i, paused, go])

  const count = (c: string) => products.filter((p) => p.category === c).length
  const arrow = 'grid h-11 w-11 place-items-center rounded-full border border-cocoa-600/25 bg-white text-cocoa-700 shadow-soft transition hover:bg-cocoa-600 hover:text-white'

  return (
    <section className="container-x pt-14 sm:pt-20" aria-roledescription="carousel" aria-label="Top categories">
      <SectionHeading eyebrow="Top categories" title="Shop Our Most-Loved Ranges" text="Candles, trays, mugs and keepsakes: the collections our customers come back for." />
      <Reveal>
        <div
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => { if (touchX.current === null) return; const d = e.changedTouches[0].clientX - touchX.current; if (Math.abs(d) > 50) go(i + (d < 0 ? 1 : -1)); touchX.current = null }}
          onKeyDown={(e) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1) }}
          className="relative overflow-hidden rounded-[2rem] shadow-card sm:rounded-[2.5rem]"
        >
          <div className="flex transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]" style={{ transform: `translateX(-${i * 100}%)` }} aria-live={paused ? 'polite' : 'off'}>
            {slides.map((s, k) => (
              <article key={s.category} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}: ${s.title}`} aria-hidden={k !== i}
                className={`grid w-full shrink-0 items-center gap-6 p-5 sm:p-8 md:grid-cols-[1fr_1.1fr] md:gap-10 md:p-12 lg:p-14 ${s.bg}`}>
                <div className="order-2 md:order-1">
                  <p className="eyebrow mb-3">{count(s.category)} {count(s.category) === 1 ? 'product' : 'products'}</p>
                  <h3 className="text-4xl leading-tight text-cocoa-700 sm:text-5xl">{s.title}</h3>
                  <p className="mt-3 max-w-md text-cocoa-500 sm:text-lg">{s.text}</p>
                  <Link to={`/shop?category=${encodeURIComponent(s.category)}`} tabIndex={k === i ? 0 : -1} className="btn-primary mt-7 !min-h-[50px] !px-7">Shop {s.category}<ArrowIcon size={16} /></Link>
                </div>
                <div className="order-1 grid aspect-[4/3] grid-cols-[1.4fr_1fr] gap-3 md:order-2">
                  <div className="row-span-2 overflow-hidden rounded-3xl bg-white shadow-card"><ProductImage src={s.images[0]} alt={`${s.title} featured`} /></div>
                  {s.images.slice(1, 3).map((src) => <div key={src} className="overflow-hidden rounded-3xl bg-white shadow-soft"><ProductImage src={src} alt={`${s.title} detail`} /></div>)}
                  {s.images.length < 3 && <div className={`rounded-3xl ${s.accent} opacity-60 ${s.images.length < 2 ? 'row-span-2' : ''}`} aria-hidden />}
                </div>
              </article>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-between px-4 md:flex">
            <button className={`${arrow} pointer-events-auto`} onClick={() => go(i - 1)} aria-label="Previous category"><ChevronLeft /></button>
            <button className={`${arrow} pointer-events-auto`} onClick={() => go(i + 1)} aria-label="Next category"><ChevronRight /></button>
          </div>
        </div>
      </Reveal>

      <div role="tablist" aria-label="Choose a category" className="mx-auto mt-5 grid max-w-3xl grid-cols-4 gap-2 sm:gap-3">
        {slides.map((s, k) => (
          <button key={s.category} role="tab" aria-selected={k === i} onClick={() => go(k)} className="group min-h-[44px] text-left">
            <span className="block h-1 overflow-hidden rounded-full bg-cream-300">
              <span key={`${k === i}-${i}-${paused}`} className={`block h-full rounded-full bg-cocoa-600 ${k < i ? 'w-full' : k === i ? (paused || reduced.current ? 'w-full' : 'animate-[grow_5.5s_linear_forwards]') : 'w-0'}`} />
            </span>
            <span className={`mt-2 block truncate text-xs font-semibold transition sm:text-sm ${k === i ? 'text-cocoa-700' : 'text-cocoa-400 group-hover:text-cocoa-600'}`}>{s.category}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
