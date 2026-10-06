import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { effectivePrice, money, moreOccasions, occasions, services, store } from '../data'
import { useStore } from '../context/Store'
import { GiftArt } from '../components/GiftArt'
import { CheckIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon } from '../components/Icons'
import { ProductImage, QuantityStepper } from '../components/Products'
import { MapPlaceholder, OccasionCard, PageHero, StoreLocation, Newsletter } from '../components/Sections'
import { ButtonLink, Reveal, SectionHeading, usePageMeta } from '../components/ui'

/* ───── Occasions ───── */
export function Occasions() {
  usePageMeta('Gifts for Every Occasion', 'Birthdays, anniversaries, weddings, new babies, Christmas and more. Find the perfect gift for every occasion.')
  const { hash } = useLocation()
  useEffect(() => { if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120) }, [hash])
  return (
    <>
      <PageHero eyebrow="Occasions" title="Gifts for Every Occasion" text="From the big milestones to the small, just-because moments, start with the occasion and we’ll point you to something lovely." scene="bundle" tone="peach">
        <ButtonLink to="/shop">Browse All Gifts</ButtonLink>
      </PageHero>
      <section className="section container-x">
        <SectionHeading title="Everyday & Milestones" align="left" />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {occasions.map((o, i) => <Reveal key={o.slug} delay={(i % 4) * 70}><OccasionCard o={o} /></Reveal>)}
        </div>
        <div className="mt-16"><SectionHeading title="Seasonal & Corporate" align="left" /></div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {moreOccasions.map((o, i) => <Reveal key={o.slug} delay={(i % 4) * 70}><OccasionCard o={o} /></Reveal>)}
        </div>
      </section>
      <Newsletter />
    </>
  )
}

/* ───── About ───── */
const values = [
  ['Chosen with care', 'Every item is tried, tested and loved by our team before it reaches a shelf.'],
  ['Local first', 'We partner with Victorian makers, florists and bakers wherever we can.'],
  ['Presented beautifully', 'Wrapping is never an afterthought: it is part of the gift.'],
  ['Genuinely personal', 'Real people, real notes, and gifts that say what you mean.'],
]
const timeline = [
  ['2016', 'A tiny stall', 'Greetings and Gift begins at a Sunday market with twelve hand-tied hampers.'],
  ['2018', 'The Willow Lane shop', 'We open our first store in Fitzroy, with a wrapping bench front and centre.'],
  ['2022', 'Online, locally', 'Our online store launches with same-day delivery across the metro area.'],
  ['2026', 'Still growing, still personal', 'A team of nine, hundreds of local makers, and the same handwritten notes.'],
]
export function About() {
  usePageMeta('About Us', 'The story behind Greetings and Gift, a local gift boutique with a love for thoughtful, beautifully presented gifts.')
  return (
    <>
      <PageHero eyebrow="Our story" title="Gifts With a Little More Meaning" text="We started Greetings and Gift because the best gifts are never just things. They are proof someone thought of you." scene="store" tone="cream" />
      <section className="section container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="aspect-[4/3] overflow-hidden rounded-4xl shadow-card"><GiftArt scene="hamper" tone="sage" title="Hand-packed hamper" /></Reveal>
        <Reveal delay={100}>
          <p className="eyebrow mb-3">Why we exist</p>
          <h2 className="text-3xl text-cocoa-700 sm:text-4xl">A local shop with a big heart</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-cocoa-500">
            <p>Greetings and Gift began with a simple frustration: gifts that felt generic, boxed in a hurry, and forgotten by Tuesday.</p>
            <p>So we built the shop we wished existed: a place where every hamper is hand-packed, every card is handwritten, and the person behind the counter genuinely wants to help you find the right thing.</p>
            <p>Today we still work from the same Fitzroy bench, now alongside an online store so more people can send a little thoughtfulness across town, or across the country.</p>
          </div>
        </Reveal>
      </section>
      <section className="bg-cream-200/60 section">
        <div className="container-x">
          <SectionHeading eyebrow="What we believe" title="Our Values" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}><div className="h-full rounded-3xl bg-white p-7 shadow-soft"><span className="font-display text-4xl text-blush-300">0{i + 1}</span><h3 className="mt-2 text-xl text-cocoa-700">{t}</h3><p className="mt-2 text-sm text-cocoa-500">{d}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section container-x">
        <SectionHeading eyebrow="Our journey" title="From Market Stall to Main Street" />
        <ol className="relative mx-auto max-w-3xl border-l-2 border-blush-200 pl-8">
          {timeline.map(([y, t, d]) => (
            <Reveal as="li" key={y} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-cream-100 bg-blush-400" />
              <p className="font-display text-3xl text-blush-400">{y}</p><h3 className="mt-1 text-xl text-cocoa-700">{t}</h3><p className="mt-1 text-cocoa-500">{d}</p>
            </Reveal>
          ))}
        </ol>
      </section>
      <section className="container-x pb-16">
        <div className="rounded-[2.5rem] bg-cocoa-700 p-10 text-center sm:p-16">
          <h2 className="text-4xl text-cream-50 sm:text-5xl">Find Something Special</h2>
          <p className="mx-auto mt-3 max-w-md text-cream-200">Browse our full collection of hampers, boxes and bouquets.</p>
          <ButtonLink to="/shop" kind="blush" className="mt-8 !min-h-[52px] !px-8">Shop Gifts</ButtonLink>
        </div>
      </section>
    </>
  )
}

/* ───── Services ───── */
export function Services() {
  usePageMeta('Services', 'Gift wrapping, personalised gifting, corporate gifting, local delivery and in-store pickup.')
  return (
    <>
      <PageHero eyebrow="Services" title="More Than Just a Gift" text="Little extras that turn a purchase into a moment: wrapping, personalising, delivering and collecting." scene="box" tone="blush" />
      <section className="section container-x space-y-6 sm:space-y-8">
        {services.map((s, i) => (
          <Reveal key={s.title}>
            <article className={`grid overflow-hidden rounded-[2rem] bg-white shadow-soft transition hover:shadow-card md:grid-cols-2 ${i % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}>
              <div className="aspect-[16/10] md:aspect-auto md:min-h-[300px]"><GiftArt scene={s.scene} tone={s.tone} title={s.title} /></div>
              <div className="flex flex-col justify-center p-7 sm:p-12">
                <span className="font-display text-5xl text-blush-200">0{i + 1}</span>
                <h2 className="mt-1 text-3xl text-cocoa-700">{s.title}</h2>
                <p className="mt-3 text-cocoa-500">{s.text}</p>
                <div className="mt-6"><ButtonLink to="/contact" kind="link">Enquire</ButtonLink></div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
      <Newsletter />
    </>
  )
}

/* ───── Location ───── */
export function Location() {
  usePageMeta('Store Location', `Visit ${store.name} at ${store.address}. Opening hours, phone and directions.`)
  return (
    <>
      <PageHero eyebrow="Visit us" title="Our Store" text="Pop in, smell the candles, and let us help you build something lovely." scene="store" tone="peach" />
      <div className="container-x space-y-8 pb-16 pt-4">
        <StoreLocation compact />
        <MapPlaceholder className="h-80 shadow-card sm:h-[420px]" />
      </div>
    </>
  )
}

/* ───── Contact ───── */
export function Contact() {
  usePageMeta('Contact Us', 'Get in touch with our friendly team for gift advice, orders, delivery or corporate enquiries.')
  const { notify } = useStore()
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); notify('Message sent. We’ll be in touch soon!') }
  const info = [
    [<PhoneIcon />, 'Phone', store.phone], [<MailIcon />, 'Email', store.email], [<PinIcon />, 'Address', store.address],
  ] as const
  return (
    <>
      <section className="bg-gradient-to-b from-blush-100/70 to-cream-100"><div className="container-x py-12 text-center sm:py-16"><p className="eyebrow mb-3">Contact</p><h1 className="text-4xl text-cocoa-700 sm:text-5xl">Get in Touch</h1><p className="mx-auto mt-3 max-w-md text-cocoa-500">Questions about an order, a custom hamper or corporate gifting? We’d love to help.</p></div></section>
      <div className="container-x grid gap-8 pb-16 pt-4 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
        <div className="space-y-4">
          {info.map(([i, l, v]) => (
            <div key={l} className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-soft"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blush-100 text-blush-400">{i}</span><div><p className="text-xs font-bold uppercase tracking-wider text-cocoa-400">{l}</p><p className="font-semibold text-cocoa-700">{v}</p></div></div>
          ))}
          <div className="rounded-3xl bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage-100 text-sage-700"><ClockIcon /></span><p className="text-xs font-bold uppercase tracking-wider text-cocoa-400">Opening hours</p></div>
            <dl className="space-y-1 pl-1 text-sm">{store.hours.map(([d, h]) => <div key={d} className="flex justify-between"><dt className="text-cocoa-500">{d}</dt><dd className="font-semibold text-cocoa-700">{h}</dd></div>)}</dl>
          </div>
          <MapPlaceholder className="h-56" />
        </div>
        <div className="rounded-4xl bg-white p-6 shadow-card sm:p-10">
          {sent ? (
            <div className="py-16 text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-100 text-sage-700"><CheckIcon size={30} /></span><h2 className="mt-5 text-3xl text-cocoa-700">Thank you!</h2><p className="mt-2 text-cocoa-500">Your message is on its way. We usually reply within one business day.</p></div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <h2 className="text-3xl text-cocoa-700">Send us a message</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" id="name" autoComplete="name" required /><Field label="Email" id="email" type="email" autoComplete="email" required />
                <Field label="Phone" id="phone" type="tel" autoComplete="tel" /><Field label="Subject" id="subject" required />
              </div>
              <div><label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-cocoa-700">Message</label><textarea id="message" required rows={6} className="input py-3" placeholder="How can we help?" /></div>
              <button className="btn-primary !min-h-[52px] w-full sm:w-auto sm:!px-10">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
function Field({ label, id, type = 'text', required, autoComplete }: { label: string; id: string; type?: string; required?: boolean; autoComplete?: string }) {
  return <div><label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-cocoa-700">{label}{required && <span className="text-blush-400"> *</span>}</label><input id={id} name={id} type={type} required={required} autoComplete={autoComplete} className="input" /></div>
}

/* ───── Cart ───── */
const FREE_DELIVERY_AT = 80
const DELIVERY_FEE = 9.95

export function Cart() {
  usePageMeta('Your Bag', 'Review the gifts in your bag.')
  const { lines, cartCount, subtotal, setQty, removeFromCart, clearCart, notify } = useStore()
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_AT ? 0 : DELIVERY_FEE
  const total = subtotal + delivery
  const toFree = Math.max(0, FREE_DELIVERY_AT - subtotal)

  if (!lines.length) {
    return (
      <section className="container-x py-16 sm:py-24">
        <div className="mx-auto max-w-xl rounded-[2.5rem] bg-white p-8 text-center shadow-card sm:p-14">
          <div className="mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full"><GiftArt scene="box" tone="blush" title="Empty gift box" /></div>
          <h1 className="text-4xl text-cocoa-700">Your bag is empty</h1>
          <p className="mt-3 text-cocoa-500">Discover something lovely and it will appear here.</p>
          <ButtonLink to="/shop" className="mt-8 !min-h-[52px] !px-8">Shop Gifts</ButtonLink>
        </div>
      </section>
    )
  }

  return (
    <section className="container-x py-10 sm:py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div><p className="eyebrow mb-2">Your bag</p><h1 className="text-4xl text-cocoa-700 sm:text-5xl">{cartCount} gift{cartCount > 1 ? 's' : ''} in your bag</h1></div>
        <button onClick={clearCart} className="text-sm font-semibold text-blush-400 hover:underline">Clear bag</button>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <ul className="space-y-4">
          {lines.map(({ product: p, qty }) => (
            <li key={p.id} className="flex gap-4 rounded-3xl bg-white p-3 shadow-soft sm:gap-6 sm:p-4">
              <Link to={`/product/${p.slug}`} className="block h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-cream-300 sm:h-32 sm:w-32"><ProductImage src={p.image} alt={p.name} /></Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[.14em] text-sage-500">{p.category}</p>
                    <h2 className="font-display text-lg leading-snug text-cocoa-700 sm:text-xl"><Link to={`/product/${p.slug}`} className="hover:underline">{p.name}</Link></h2>
                  </div>
                  <p className="shrink-0 font-bold text-cocoa-700">{money(effectivePrice(p) * qty)}</p>
                </div>
                <p className="mt-0.5 text-sm text-cocoa-400">{money(effectivePrice(p))} each</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <QuantityStepper value={qty} onChange={(n) => setQty(p.id, n)} label={`Quantity of ${p.name}`} />
                  <button onClick={() => removeFromCart(p.id)} className="text-sm font-semibold text-cocoa-500 underline-offset-4 hover:text-blush-400 hover:underline" aria-label={`Remove ${p.name}`}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="rounded-4xl bg-white p-6 shadow-card sm:p-8 lg:sticky lg:top-24" aria-label="Order summary">
          <h2 className="font-display text-2xl text-cocoa-700">Order summary</h2>
          <div className="mt-4 rounded-2xl bg-sage-100 p-3.5 text-sm text-sage-700">
            {toFree > 0 ? <>Add <strong>{money(toFree)}</strong> more for free local delivery.</> : <>You’ve unlocked <strong>free local delivery</strong>.</>}
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-sage-500 transition-all duration-500" style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_AT) * 100)}%` }} /></div>
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-cocoa-500">Subtotal</dt><dd className="font-semibold text-cocoa-700">{money(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-cocoa-500">Local delivery</dt><dd className="font-semibold text-cocoa-700">{delivery ? money(delivery) : 'Free'}</dd></div>
            <div className="flex justify-between border-t border-cream-300 pt-3 text-base"><dt className="font-bold text-cocoa-700">Total</dt><dd className="font-bold text-cocoa-700">{money(total)}</dd></div>
          </dl>
          <button className="btn-primary mt-6 w-full !min-h-[54px] text-base" onClick={() => notify('Checkout will be connected soon. Your bag is saved.')}>Checkout</button>
          <ButtonLink to="/shop" kind="link" className="mt-4 w-full justify-center">Continue shopping</ButtonLink>
        </aside>
      </div>
    </section>
  )
}

export function NotFound() {
  usePageMeta('Page not found')
  return <div className="container-x py-28 text-center"><h1 className="text-5xl text-cocoa-700">Oops, wrong wrapping</h1><p className="mt-3 text-cocoa-500">We couldn’t find that page.</p><ButtonLink to="/" className="mt-8">Back home</ButtonLink></div>
}

