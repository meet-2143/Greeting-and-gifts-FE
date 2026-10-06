import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { budgets, occasions as occ, recipientsList, services as svc, store, testimonials, type Occasion } from '../data'
import { useStore } from '../context/Store'
import { GiftArt } from './GiftArt'
import { ProductImage } from './Products'
import { ArrowIcon, CheckIcon, ChevronLeft, ChevronRight, ClockIcon, GiftIcon, HeartHandIcon, MailIcon, PhoneIcon, PinIcon, SparklesIcon, StoreIcon, TruckIcon, Star } from './Icons'
import { ButtonLink, Reveal, SectionHeading } from './ui'

/* ───────── Hero ───────── */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-100 to-blush-100/60">
      <div aria-hidden className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-blush-200/50 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 left-[-6rem] h-[360px] w-[360px] rounded-full bg-sage-100 blur-3xl" />
      <div className="container-x relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-24">
        <div className="max-w-xl">
          <p className="mb-5 inline-flex animate-fade-up items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-sage-700 shadow-soft">
            <span className="h-2 w-2 rounded-full bg-sage-500" />Local gift boutique
          </p>
          <h1 className="animate-fade-up text-[2.6rem] leading-[1.04] text-cocoa-700 [animation-delay:80ms] sm:text-6xl lg:text-[4.4rem]">
            Thoughtful gifts for <span className="relative whitespace-nowrap text-blush-400">every moment<svg aria-hidden viewBox="0 0 200 12" className="absolute -bottom-2 left-0 w-full" preserveAspectRatio="none"><path d="M2 8 Q50 0 100 6 T198 5" fill="none" stroke="#D4A95A" strokeWidth="3" strokeLinecap="round" /></svg></span>
          </h1>
          <p className="mt-6 max-w-md animate-fade-up text-base leading-relaxed text-cocoa-500 [animation-delay:160ms] sm:text-lg">
            Find something special for birthdays, celebrations, milestones, and every little moment worth remembering.
          </p>
          <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <ButtonLink to="/shop" className="!min-h-[52px] !px-8 text-base">Shop Gifts</ButtonLink>
            <ButtonLink to="/occasions" kind="secondary" className="!min-h-[52px] !bg-white/70 !px-8 text-base">Explore Occasions</ButtonLink>
          </div>
          <div className="mt-9 flex animate-fade-up items-center gap-4 [animation-delay:320ms]">
            <div className="flex -space-x-2">{['S', 'J', 'P', 'O'].map((l, i) => <span key={l} className="grid h-9 w-9 place-items-center rounded-full border-2 border-cream-100 text-xs font-bold text-cocoa-700" style={{ background: ['#F1CFCB', '#C9D6B9', '#F6CFB0', '#EADCC6'][i] }}>{l}</span>)}</div>
            <div>
              <div className="flex">{[1, 2, 3, 4, 5].map((i) => <Star key={i} />)}</div>
              <p className="text-xs text-cocoa-500">Loved by local gift givers</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-up pb-6 [animation-delay:200ms] lg:max-w-lg">
          <div aria-hidden className="absolute left-1/2 top-6 h-[88%] w-[86%] -translate-x-1/2 rounded-t-[999px] rounded-b-[2rem] border-2 border-dashed border-cocoa-400/40" />
          <div className="relative mx-auto aspect-[4/5] w-[76%] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border-[10px] border-white bg-white shadow-lift">
            <ProductImage src="/images/owl-candle.jpg" alt="Patchwork owl boutique candle with gold lid" className="!object-cover" />
          </div>
          <div className="absolute -left-1 bottom-10 h-28 w-28 animate-float overflow-hidden rounded-full border-[6px] border-white bg-white shadow-lift sm:-left-6 sm:h-36 sm:w-36">
            <ProductImage src="/images/elephant-mug-pink.jpg" alt="My first cup pink elephant mug" className="!object-cover" />
          </div>
          <div className="absolute -right-1 top-14 h-24 w-24 overflow-hidden rounded-full border-[6px] border-white bg-white shadow-lift sm:-right-4 sm:h-32 sm:w-32">
            <ProductImage src="/images/owl-tray.jpg" alt="Patchwork owl mini tray" className="!object-cover" />
          </div>
          <div className="absolute bottom-2 right-2 flex items-center gap-3 rounded-full bg-cocoa-700 py-2 pl-2 pr-5 text-cream-50 shadow-lift sm:right-6">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-300 text-cocoa-700"><TruckIcon size={18} /></span>
            <span className="text-xs leading-tight"><strong className="block text-sm">Same-day delivery</strong>Order before 2pm</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────── Occasions ───────── */
export function OccasionCard({ o }: { o: Occasion; tall?: boolean }) {
  return (
    <Link to={`/shop?occasion=${o.slug}`} id={o.slug} className="group block text-center">
      <div className="relative mx-auto aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-3xl border-[6px] border-white bg-gradient-to-b from-white to-cream-200 shadow-soft transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lift">
        {o.image
          ? <div className="h-full p-4 pt-14 sm:p-6 sm:pt-20"><ProductImage src={o.image} alt={`${o.name} gifts`} className="rounded-2xl transition duration-700 group-hover:scale-105" /></div>
          : <GiftArt scene={o.scene} tone={o.tone} title={`${o.name} gifts`} className="transition duration-700 group-hover:scale-110" />}
        <span className="absolute inset-x-0 bottom-3 mx-auto grid h-11 w-11 place-items-center rounded-full bg-white text-xl shadow-card" aria-hidden>{o.emoji}</span>
      </div>
      <h3 className="mt-4 font-display text-xl text-cocoa-700 sm:text-2xl">{o.name}</h3>
      <p className="mt-1 text-xs text-cocoa-500 sm:text-sm">{o.blurb}</p>
      <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-cocoa-600 transition group-hover:gap-2.5 group-hover:text-blush-400">View Gifts <ArrowIcon size={15} /></span>
    </Link>
  )
}

export function OccasionsSection() {
  return (
    <section className="section container-x" aria-labelledby="occ-h">
      <SectionHeading eyebrow="Shop by occasion" title="Find the Perfect Gift for Every Occasion" text="Whatever you’re celebrating, we’ve curated something to match." />
      <div id="occ-h" className="sr-only">Occasions</div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {occ.map((o, i) => <Reveal key={o.slug} delay={(i % 4) * 80}><OccasionCard o={o} /></Reveal>)}
      </div>
    </section>
  )
}

/* ───────── Promo ───────── */
export function PromoBanner() {
  return (
    <section className="container-x pb-4">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-cocoa-700 sm:rounded-[2.5rem]">
        <div className="grid items-center md:grid-cols-[1.1fr_1fr]">
          <div className="relative z-10 p-8 sm:p-12 lg:p-16">
            <p className="eyebrow !text-blush-300">Seasonal edit</p>
            <h2 className="mt-3 text-4xl leading-tight text-cream-50 sm:text-5xl">Make Their Day Extra Special</h2>
            <p className="mt-4 max-w-md text-cream-200">Beautiful gifts, carefully selected for life’s special moments.</p>
            <ButtonLink to="/shop" kind="blush" className="mt-8 !min-h-[52px] !px-8">Shop All Gifts</ButtonLink>
          </div>
          <div className="relative h-64 md:h-full md:min-h-[360px]">
            <ProductImage src="/images/candle-collection.jpg" alt="Collection of patchwork animal boutique candles" className="!object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-cocoa-700 via-transparent to-transparent max-md:bg-gradient-to-b" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ───────── Gift Finder ───────── */
function Chips<T extends string>({ legend, options, value, onChange }: { legend: string; options: { id: T; label: string }[]; value: T | null; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-bold text-cocoa-700">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.id
          return (
            <label key={o.id} className={`inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition focus-within:ring-2 focus-within:ring-cocoa-500 ${on ? 'border-cocoa-600 bg-cocoa-600 text-white' : 'border-cream-300 bg-white text-cocoa-600 hover:border-cocoa-400'}`}>
              <input type="radio" name={legend} className="sr-only" checked={on} onChange={() => onChange(o.id)} />
              {on && <CheckIcon size={14} />}{o.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export interface FinderResult { recipient: string | null; occasion: string | null; budget: string | null }

/** UI only. `onSubmit` is the integration seam for a future recommendation API. */
export function GiftFinder({ onSubmit }: { onSubmit?: (r: FinderResult) => void }) {
  const nav = useNavigate()
  const [recipient, setR] = useState<string | null>(null)
  const [occasion, setO] = useState<string | null>(null)
  const [budget, setB] = useState<string | null>(null)
  const step = [recipient, occasion, budget].filter(Boolean).length

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit?.({ recipient, occasion, budget })
    const q = new URLSearchParams()
    if (recipient) q.set('recipient', recipient)
    if (occasion) q.set('occasion', occasion)
    if (budget) q.set('budget', budget)
    nav(`/shop?${q}`)
  }
  return (
    <section className="section bg-gradient-to-br from-sage-100 via-cream-100 to-peach-100">
      <div className="container-x grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <Reveal>
          <p className="eyebrow mb-3">Gift finder</p>
          <h2 className="text-4xl leading-tight text-cocoa-700 sm:text-5xl">Not Sure What to Gift?</h2>
          <p className="mt-4 max-w-md text-cocoa-500">Tell us a little about the occasion and we’ll help you find something they’ll love.</p>
          <div className="mt-8 hidden aspect-[4/3] max-w-sm overflow-hidden rounded-3xl shadow-card lg:block"><ProductImage src="/images/owl-candle-boxed.jpg" alt="Boxed boutique candle" /></div>
        </Reveal>
        <Reveal delay={100}>
          <form onSubmit={submit} className="space-y-7 rounded-4xl bg-white/90 p-6 shadow-card backdrop-blur sm:p-9">
            <div className="flex items-center gap-3" aria-hidden>
              {[0, 1, 2].map((i) => <span key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i < step ? 'bg-sage-500' : 'bg-cream-300'}`} />)}
            </div>
            <Chips legend="Who are you shopping for?" options={recipientsList} value={recipient} onChange={setR} />
            <Chips legend="Occasion" options={occ.map((o) => ({ id: o.slug, label: o.name }))} value={occasion} onChange={setO} />
            <Chips legend="Budget" options={budgets} value={budget} onChange={setB} />
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="btn-primary !min-h-[52px] w-full !px-8 sm:w-auto"><SparklesIcon size={18} />Find My Gift</button>
              <p className="text-xs text-cocoa-400">{step === 0 ? 'Pick any options, or skip to browse everything.' : `${step} of 3 selected`}</p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

/* ───────── Why shop with us ───────── */
const features = [
  { icon: <GiftIcon size={26} />, t: 'Thoughtfully Selected', d: 'Beautiful gifts chosen with care.', c: 'bg-blush-100 text-blush-400' },
  { icon: <HeartHandIcon size={26} />, t: 'Local & Personal', d: 'A local gift shop with a personal touch.', c: 'bg-sage-100 text-sage-700' },
  { icon: <TruckIcon size={26} />, t: 'Easy Shopping', d: 'Simple online ordering and convenient delivery.', c: 'bg-peach-100 text-cocoa-500' },
  { icon: <SparklesIcon size={26} />, t: 'Gifts for Every Occasion', d: 'Something special for every celebration.', c: 'bg-cream-200 text-cocoa-600' },
]
export function FeatureCard({ icon, t, d, c }: (typeof features)[number]) {
  return (
    <div className="h-full rounded-3xl bg-white p-6 text-center shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card sm:p-8">
      <span className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${c}`}>{icon}</span>
      <h3 className="mt-5 font-display text-xl text-cocoa-700">{t}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cocoa-500">{d}</p>
    </div>
  )
}
export function WhyUs() {
  return (
    <section className="section container-x">
      <SectionHeading eyebrow="Why Greetings and Gift" title="Why Shop With Us" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {features.map((f, i) => <Reveal key={f.t} delay={i * 80}><FeatureCard {...f} /></Reveal>)}
      </div>
    </section>
  )
}

/* ───────── Inspiration ───────── */
const ideas = [
  { cat: 'Birthdays', t: 'Birthday Ideas', d: 'Make their birthday unforgettable.', img: '/images/tray-collection.jpg', h: 'birthday' },
  { cat: 'Loved ones', t: 'Gifts for Someone Special', d: 'Thoughtful ideas for the people who matter.', img: '/images/teddy-frames.jpg', h: 'anniversary' },
  { cat: 'In a hurry', t: 'Last-Minute Gifts', d: 'Beautiful gifts when you need something quickly.', img: '/images/floral-mugs.jpg', h: 'last-minute' },
]
export function GiftInspiration() {
  return (
    <section className="section container-x">
      <SectionHeading eyebrow="Journal" title="Gift Inspiration" text="Ideas, edits and little nudges for the next thing you give." />
      <div className="grid gap-5 md:grid-cols-3 lg:gap-7">
        {ideas.map((x, i) => (
          <Reveal key={x.t} delay={i * 100}>
            <Link to="/shop" className="group block">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
                <ProductImage src={x.img} alt={x.t} className="transition duration-700 group-hover:scale-105" />
              </div>
              <div className="px-1 pt-5">
                <p className="eyebrow">{x.cat}</p>
                <h3 className="mt-1.5 text-2xl text-cocoa-700">{x.t}</h3>
                <p className="mt-1.5 text-sm text-cocoa-500">{x.d}</p>
                <span className="link-arrow mt-3">Explore <ArrowIcon size={16} className="transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ───────── Testimonials ───────── */
const tints = ['#F1CFCB', '#C9D6B9', '#F6CFB0', '#EADCC6', '#E3EAD9']
export function TestimonialCard({ t, i }: { t: (typeof testimonials)[number]; i: number }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft sm:p-7">
      <div className="flex" aria-label="5 out of 5 stars">{[1, 2, 3, 4, 5].map((k) => <Star key={k} size={16} />)}</div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-cocoa-600">“{t.text}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full font-bold text-cocoa-700" style={{ background: tints[i % tints.length] }} aria-hidden>{t.name[0]}</span>
        <span><span className="block text-sm font-bold text-cocoa-700">— {t.name}</span><span className="block text-xs text-cocoa-400">{t.place}</span></span>
      </figcaption>
    </figure>
  )
}
export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const go = (d: 1 | -1) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.85, behavior: 'smooth' })
  return (
    <section className="section bg-cream-200/60">
      <div className="container-x">
        <SectionHeading eyebrow="Kind words" title="Loved by Gift Givers" action={
          <div className="flex gap-2 sm:hidden"><button onClick={() => go(-1)} aria-label="Previous review" className="grid h-11 w-11 place-items-center rounded-full border border-cocoa-600/25 bg-white"><ChevronLeft /></button><button onClick={() => go(1)} aria-label="Next review" className="grid h-11 w-11 place-items-center rounded-full border border-cocoa-600/25 bg-white"><ChevronRight /></button></div>} />
        <div ref={ref} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {testimonials.slice(0, 3).map((t, i) => <div key={t.name} className="w-[84%] shrink-0 snap-center md:w-auto"><TestimonialCard t={t} i={i} /></div>)}
          {testimonials.slice(3).map((t, i) => <div key={t.name} className="w-[84%] shrink-0 snap-center md:hidden"><TestimonialCard t={t} i={i + 3} /></div>)}
        </div>
      </div>
    </section>
  )
}

/* ───────── Store location ───────── */
export function MapPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-sage-100 ${className}`} role="img" aria-label="Map showing the store location">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <rect width="400" height="300" fill="#E9EFE0" />
        <path d="M0 210 Q120 180 200 220 T400 190 V300 H0Z" fill="#CFDDE2" opacity=".7" />
        <g stroke="#fff" strokeWidth="14" fill="none" strokeLinecap="round"><path d="M-10 90 H410" /><path d="M120 -10 V310" /><path d="M300 -10 L260 310" /><path d="M-10 160 L410 120" /></g>
        <g stroke="#F4EBDD" strokeWidth="5" fill="none"><path d="M30 20 V280M210 20 V250M350 20 V280M-10 40 H410M-10 250 H410" /></g>
        {[[40, 40, 60, 36], [140, 30, 50, 44], [220, 36, 60, 40], [320, 30, 60, 42], [40, 110, 60, 36], [150, 112, 50, 30], [330, 150, 60, 50], [30, 190, 70, 40]].map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx="5" fill="#DCE5CF" />)}
      </svg>
      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="mx-auto grid h-12 w-12 animate-float place-items-center rounded-full bg-blush-400 text-white shadow-lift"><PinIcon size={24} /></span>
        <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-cocoa-700 shadow-soft">{store.name}</span>
      </div>
    </div>
  )
}

export function StoreLocation({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? '' : 'section container-x'}>
      <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-card lg:grid-cols-2 lg:rounded-[2.5rem]">
        <div className="p-7 sm:p-10 lg:p-14">
          <p className="eyebrow mb-3">Visit our store</p>
          <h2 className="text-4xl text-cocoa-700">Come Say Hello</h2>
          <p className="mt-3 text-cocoa-500">Prefer to see our gifts in person? Visit us in store and let our team help you find something special.</p>
          <ul className="mt-7 space-y-4 text-sm">
            <li className="flex gap-3"><PinIcon className="mt-0.5 shrink-0 text-blush-400" /><span className="font-medium text-cocoa-700">{store.address}</span></li>
            <li className="flex gap-3"><PhoneIcon className="mt-0.5 shrink-0 text-blush-400" /><a href={`tel:${store.phone.replace(/\D/g, '')}`} className="font-medium text-cocoa-700 hover:underline">{store.phone}</a></li>
            <li className="flex gap-3"><ClockIcon className="mt-0.5 shrink-0 text-blush-400" />
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">{store.hours.map(([d, h]) => <div key={d} className="contents"><dt className="text-cocoa-500">{d}</dt><dd className="font-medium text-cocoa-700">{h}</dd></div>)}</dl>
            </li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`} target="_blank" rel="noopener noreferrer"><PinIcon size={17} />Get Directions</a>
            <ButtonLink to="/contact" kind="secondary">Contact Store</ButtonLink>
          </div>
        </div>
        <div className="grid min-h-[320px] grid-rows-[1fr] lg:min-h-full">
          <div className="relative min-h-[320px]">
            <div className="absolute inset-0"><GiftArt scene="store" tone="cream" title="Storefront" /></div>
            <MapPlaceholder className="absolute bottom-4 left-4 right-4 h-40 !rounded-2xl shadow-lift sm:left-auto sm:w-72" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────── Newsletter ───────── */
export function Newsletter() {
  const { notify } = useStore()
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return (
    <section className="section container-x">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-blush-200 px-6 py-12 text-center sm:rounded-[2.5rem] sm:py-16">
        <div aria-hidden className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-blush-100" /><div aria-hidden className="absolute -bottom-12 -right-8 h-52 w-52 rounded-full bg-peach-200/70" />
        <div className="relative mx-auto max-w-xl">
          <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-white text-cocoa-600"><MailIcon /></span>
          <h2 className="text-3xl text-cocoa-700 sm:text-4xl">Get Gift Inspiration in Your Inbox</h2>
          <p className="mt-3 text-cocoa-600">Be the first to discover new gifts, seasonal collections and special offers.</p>
          {done ? (
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-sage-700"><CheckIcon size={16} />You’re on the list. Thank you!</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); notify('Subscribed. Welcome to the family!') }} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="input flex-1 !rounded-full !px-6" />
              <button type="submit" className="btn-primary !min-h-[48px] !px-8">Subscribe</button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  )
}

/* ───────── Shared page hero ───────── */
export function PageHero({ eyebrow, title, text, scene, tone, children }: { eyebrow: string; title: string; text: string; scene: Parameters<typeof GiftArt>[0]['scene']; tone: Parameters<typeof GiftArt>[0]['tone']; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-100/70 to-cream-100">
      <div className="container-x grid items-center gap-8 py-12 sm:py-16 md:grid-cols-[1.2fr_1fr] lg:py-20">
        <div className="animate-fade-up">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="text-4xl leading-[1.08] text-cocoa-700 sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cocoa-500 sm:text-lg">{text}</p>
          {children && <div className="mt-7">{children}</div>}
        </div>
        <div className="hidden aspect-[5/4] animate-fade-up overflow-hidden rounded-[2.5rem] shadow-lift [animation-delay:120ms] md:block"><GiftArt scene={scene} tone={tone} /></div>
      </div>
    </section>
  )
}

/* re-export small bits pages need */
export { svc as servicesData, StoreIcon }
