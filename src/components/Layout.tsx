import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { store } from '../data'
import { useStore } from '../context/Store'
import { ArrowIcon, BagIcon, CloseIcon, FacebookIcon, InstagramIcon, MailIcon, MenuIcon, SearchIcon, TikTokIcon, UserIcon } from './Icons'
import { Toaster } from './ui'

const nav = [
  { to: '/', label: 'Home' }, { to: '/shop', label: 'Shop' }, { to: '/occasions', label: 'Occasions' },
  { to: '/about', label: 'About' }, { to: '/services', label: 'Services' }, { to: '/location', label: 'Location' }, { to: '/contact', label: 'Contact' },
]

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" aria-label={`${store.name} home`} className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-300 text-cocoa-700">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13M5 12v8h14v-8M12 8c-2-4-6-4-6-1.500S10 8 12 8Zm0 0c2-4 6-4 6-1.500S14 8 12 8Z" /></svg>
      </span>
      <span className={`font-display text-lg leading-none sm:text-2xl ${light ? 'text-cream-50' : 'text-cocoa-700'}`}>{store.name}</span>
    </Link>
  )
}

function SearchBar({ onDone }: { onDone: () => void }) {
  const nav = useNavigate()
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => ref.current?.focus(), [])
  return (
    <form role="search" onSubmit={(e) => { e.preventDefault(); const q = ref.current?.value.trim(); nav(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop'); onDone() }} className="container-x flex items-center gap-3 py-3">
      <SearchIcon className="shrink-0 text-cocoa-400" />
      <input ref={ref} aria-label="Search gifts" placeholder="Search gifts, hampers, occasions…" className="h-11 w-full bg-transparent text-base outline-none placeholder:text-cocoa-400/70" />
      <button type="button" onClick={onDone} aria-label="Close search" className="grid h-11 w-11 place-items-center rounded-full hover:bg-cream-200"><CloseIcon /></button>
    </form>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const { cartCount } = useStore()
  const loc = useLocation()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { setOpen(false); setSearching(false) }, [loc.pathname])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])

  const iconBtn = 'grid h-11 w-11 place-items-center rounded-full text-cocoa-700 transition hover:bg-cream-200'
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <div className="bg-cocoa-700 px-4 py-2 text-center text-xs font-medium tracking-wide text-cream-100">
        Free local delivery over $80 · Order by 2pm for same-day delivery
      </div>
      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'border-cream-300 bg-cream-100/90 shadow-soft backdrop-blur-md' : 'border-transparent bg-cream-100'}`}>
        <div className={`container-x flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'h-[60px]' : 'h-[76px]'}`}>
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => `rounded-full px-3.5 py-2 text-sm font-semibold transition ${isActive ? 'bg-white text-cocoa-700 shadow-soft' : 'text-cocoa-500 hover:text-cocoa-700'}`}>{n.label}</NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-0.5">
            <button className={iconBtn} aria-label="Search" onClick={() => setSearching((s) => !s)}><SearchIcon /></button>
            <Link className={`${iconBtn} hidden sm:grid`} aria-label="Contact us" to="/contact"><UserIcon /></Link>
            <Link className={`${iconBtn} relative`} aria-label={`Cart, ${cartCount} items`} to="/cart">
              <BagIcon />
              {cartCount > 0 && <span key={cartCount} className="absolute right-1 top-1 grid h-[18px] min-w-[18px] animate-fade-in place-items-center rounded-full bg-blush-400 px-1 text-[10px] font-bold text-white">{cartCount}</span>}
            </Link>
            <Link to="/shop" className="btn-primary ml-2 hidden !min-h-[42px] lg:inline-flex">Shop Now</Link>
            <button className={`${iconBtn} lg:hidden`} aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}><MenuIcon /></button>
          </div>
        </div>
        {searching && <div className="animate-fade-in border-t border-cream-300 bg-white"><SearchBar onDone={() => setSearching(false)} /></div>}
      </header>

      {/* Mobile slide-in menu */}
      <div className={`fixed inset-0 z-[80] lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />
        <aside className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-cream-50 p-6 shadow-lift transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="mb-8 flex items-center justify-between">
            <Logo />
            <button className={iconBtn} aria-label="Close menu" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}><CloseIcon /></button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} tabIndex={open ? 0 : -1} className={({ isActive }) => `flex min-h-[56px] items-center justify-between border-b border-cream-300 font-display text-2xl ${isActive ? 'text-blush-400' : 'text-cocoa-700'}`}>
                {n.label}<ArrowIcon size={18} className="text-cocoa-400" />
              </NavLink>
            ))}
          </nav>
          <Link to="/shop" className="btn-primary mt-6 w-full">Shop Now</Link>
        </aside>
      </div>
    </>
  )
}

export function Footer() {
  const col = (title: string, links: [string, string][]) => (
    <div>
      <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-[.18em] text-blush-300">{title}</h3>
      <ul className="space-y-2.5">
        {links.map(([l, to]) => (
          <li key={l}>{to.startsWith('http') ? <a className="text-sm text-cream-200 transition hover:text-white" href={to} target="_blank" rel="noopener noreferrer">{l}</a> : <Link className="text-sm text-cream-200 transition hover:text-white" to={to}>{l}</Link>}</li>
        ))}
      </ul>
    </div>
  )
  const c = (_handle?: string) => '/shop'
  return (
    <footer className="mt-8 bg-cocoa-700 text-cream-200">
      <div className="container-x py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed text-cream-300">{store.tagline}. A local gift boutique for every birthday, milestone and little moment worth remembering.</p>
            <div className="mt-5 flex gap-2">
              {[[InstagramIcon, 'Instagram'], [FacebookIcon, 'Facebook'], [TikTokIcon, 'TikTok']].map(([Icon, label]) => {
                const I = Icon as typeof InstagramIcon
                return <a key={label as string} href="#" aria-label={label as string} className="grid h-11 w-11 place-items-center rounded-full border border-cream-200/20 text-cream-100 transition hover:bg-blush-300 hover:text-cocoa-700"><I size={18} /></a>
              })}
            </div>
          </div>
          {col('Shop', [['All Gifts', '/shop'], ['Best Sellers', c('best-sellers')], ['New Arrivals', c('new-arrivals')], ['Gift Hampers', c('gift-hampers')], ['Gift Cards', c('gift-cards')]])}
          {col('Occasions', [['Birthday', '/occasions#birthday'], ['Anniversary', '/occasions#anniversary'], ['Wedding', '/occasions#wedding'], ['Thank You', '/occasions#thank-you'], ['New Baby', '/occasions#new-baby'], ['Christmas', '/occasions#christmas']])}
          {col('Company', [['About Us', '/about'], ['Services', '/services'], ['Store Location', '/location'], ['Contact', '/contact']])}
          {col('Help', [['Delivery', '/services'], ['Returns', '/contact'], ['FAQ', '/contact'], ['Privacy Policy', '/contact'], ['Terms', '/contact']])}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-cream-200/15 pt-6 text-xs text-cream-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {store.name}. All rights reserved.</p>
          <a href={`mailto:${store.email}`} className="inline-flex items-center gap-2 hover:text-white"><MailIcon size={14} />{store.email}</a>
        </div>
      </div>
    </footer>
  )
}

export function Layout() {
  const loc = useLocation()
  return (
    <>
      <Navbar />
      <main id="main" key={loc.pathname} className="animate-fade-in">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}
