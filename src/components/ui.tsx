import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, CheckIcon, ExternalIcon, Star } from './Icons'
import { useStore } from '../context/Store'

/** Fade-in on scroll. */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return setShown(true)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${shown ? 'in' : ''} ${className}`}>{children}</Tag>
}

export function SectionHeading({ eyebrow, title, text, align = 'center', action }: { eyebrow?: string; title: string; text?: string; align?: 'center' | 'left'; action?: ReactNode }) {
  return (
    <Reveal className={`mb-10 flex flex-col gap-3 sm:mb-14 ${align === 'center' ? 'items-center text-center' : 'items-start sm:flex-row sm:items-end sm:justify-between'}`}>
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-xl'}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl leading-tight text-cocoa-700 sm:text-4xl lg:text-[2.75rem]">{title}</h2>
        {text && <p className="mt-3 text-base leading-relaxed text-cocoa-500">{text}</p>}
      </div>
      {action}
    </Reveal>
  )
}

export function Rating({ value, count, size = 13 }: { value: number; count?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${value} out of 5`}>
      <div className="flex">{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={size} filled={i <= Math.round(value)} />)}</div>
      {count !== undefined && <span className="text-xs text-cocoa-400">({count})</span>}
    </div>
  )
}

type CTAKind = 'primary' | 'secondary' | 'blush' | 'link'
const kindClass: Record<CTAKind, string> = { primary: 'btn-primary', secondary: 'btn-secondary', blush: 'btn-blush', link: 'link-arrow' }

/** Internal link styled as a button. */
export function ButtonLink({ to, kind = 'primary', children, className = '' }: { to: string; kind?: CTAKind; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`${kindClass[kind]} group ${className}`}>
      {children}
      {kind === 'link' && <ArrowIcon size={16} className="transition group-hover:translate-x-1" />}
    </Link>
  )
}

/**
 * Every outbound-to-Shopify action goes through this one component so
 * tracking, target and URL building can be changed in a single place.
 */
export function ShopifyCTA({ href, kind = 'primary', children, className = '', icon = true }: { href: string; kind?: CTAKind; children: ReactNode; className?: string; icon?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${kindClass[kind]} group ${className}`}>
      {children}
      {icon && (kind === 'link' ? <ArrowIcon size={16} className="transition group-hover:translate-x-1" /> : <ExternalIcon size={15} className="opacity-70" />)}
    </a>
  )
}

export function Toaster() {
  const { toasts } = useStore()
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto flex animate-fade-up items-center gap-2.5 rounded-full bg-cocoa-700 py-3 pl-3 pr-5 text-sm font-medium text-cream-50 shadow-lift">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-sage-300 text-cocoa-700"><CheckIcon size={14} /></span>
          {t.message}
        </div>
      ))}
    </div>
  )
}

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} | Greetings and Gift`
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    window.scrollTo({ top: 0 })
  }, [title, description])
}

/** Lightweight modal shell with ESC + scroll lock. */
export function Modal({ open, onClose, label, children, sheet = false }: { open: boolean; onClose: () => void; label: string; children: ReactNode; sheet?: boolean }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className={`fixed inset-0 z-[90] flex animate-fade-in ${sheet ? 'items-end sm:items-center' : 'items-center'} justify-center bg-ink/45 p-0 backdrop-blur-sm sm:p-6`} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={label} className={`relative max-h-[92vh] w-full overflow-y-auto bg-cream-50 shadow-lift ${sheet ? 'animate-slide-up rounded-t-4xl sm:max-w-lg sm:animate-fade-up sm:rounded-4xl' : 'max-w-4xl animate-fade-up rounded-4xl'}`}>
        {children}
      </div>
    </div>
  )
}
