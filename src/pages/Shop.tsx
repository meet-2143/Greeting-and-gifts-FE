import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { budgets, categories, effectivePrice, occasions, products, recipientsList } from '../data'
import { ProductGrid, useQuickView } from '../components/Products'
import { CloseIcon, FilterIcon, SearchIcon } from '../components/Icons'
import { Modal, usePageMeta } from '../components/ui'

interface Filters { q: string; category: string[]; occasion: string[]; recipient: string[]; budget: string; stock: boolean; rating: number }
const empty: Filters = { q: '', category: [], occasion: [], recipient: [], budget: '', stock: false, rating: 0 }

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b border-cream-300 py-5 first:pt-0 last:border-0">
      <legend className="mb-3 float-left w-full text-sm font-bold text-cocoa-700">{title}</legend>
      <div className="clear-both space-y-1">{children}</div>
    </fieldset>
  )
}
function Check({ label, checked, onChange, type = 'checkbox', name }: { label: string; checked: boolean; onChange: () => void; type?: 'checkbox' | 'radio'; name?: string }) {
  return (
    <label className="flex min-h-[40px] cursor-pointer items-center gap-3 text-sm text-cocoa-600 hover:text-cocoa-700">
      <input type={type} name={name} checked={checked} onChange={onChange} className="h-[18px] w-[18px] accent-[#7A5C47]" />
      {label}
    </label>
  )
}

function FilterPanel({ f, set }: { f: Filters; set: (n: Partial<Filters>) => void }) {
  const toggle = (k: 'category' | 'occasion' | 'recipient', v: string) => set({ [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] })
  return (
    <div>
      <Group title="Category">{categories.map((c) => <Check key={c} label={c} checked={f.category.includes(c)} onChange={() => toggle('category', c)} />)}</Group>
      <Group title="Occasion">{occasions.map((o) => <Check key={o.slug} label={o.name} checked={f.occasion.includes(o.slug)} onChange={() => toggle('occasion', o.slug)} />)}</Group>
      <Group title="Recipient">{recipientsList.map((r) => <Check key={r.id} label={r.label} checked={f.recipient.includes(r.id)} onChange={() => toggle('recipient', r.id)} />)}</Group>
      <Group title="Price">
        <Check type="radio" name="price" label="Any price" checked={!f.budget} onChange={() => set({ budget: '' })} />
        {budgets.map((b) => <Check key={b.id} type="radio" name="price" label={b.label} checked={f.budget === b.id} onChange={() => set({ budget: b.id })} />)}
      </Group>
      <Group title="Availability"><Check label="In stock only" checked={f.stock} onChange={() => set({ stock: !f.stock })} /></Group>
      <Group title="Rating">
        {[0, 4, 4.5, 4.8].map((r) => <Check key={r} type="radio" name="rating" label={r === 0 ? 'All ratings' : `${r}★ & up`} checked={f.rating === r} onChange={() => set({ rating: r })} />)}
      </Group>
    </div>
  )
}

const sorts = [
  ['featured', 'Featured'], ['best', 'Best Selling'], ['new', 'Newest'], ['low', 'Price: Low to High'], ['high', 'Price: High to Low'],
] as const

export default function Shop() {
  usePageMeta('Shop All Gifts', 'Browse gift hampers, gift boxes, flowers, personalised gifts and more. Filter by occasion, recipient and budget.')
  const [params] = useSearchParams()
  const [f, setF] = useState<Filters>(() => ({
    ...empty,
    q: params.get('q') ?? '',
    occasion: params.get('occasion') ? [params.get('occasion')!] : [],
    recipient: params.get('recipient') ? [params.get('recipient')!] : [],
    budget: params.get('budget') ?? '',
  }))
  useEffect(() => {
    setF((p) => ({ ...p, q: params.get('q') ?? '', occasion: params.get('occasion') ? [params.get('occasion')!] : [], recipient: params.get('recipient') ? [params.get('recipient')!] : [], budget: params.get('budget') ?? '' }))
  }, [params])
  const [sort, setSort] = useState<(typeof sorts)[number][0]>('featured')
  const [drawer, setDrawer] = useState(false)
  const { open, node } = useQuickView()
  const set = (n: Partial<Filters>) => setF((p) => ({ ...p, ...n }))

  const list = useMemo(() => {
    const b = budgets.find((x) => x.id === f.budget)
    const q = f.q.toLowerCase()
    const out = products.filter((p) =>
      (!q || `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q)) &&
      (!f.category.length || f.category.includes(p.category)) &&
      (!f.occasion.length || f.occasion.some((o) => p.occasions.includes(o))) &&
      (!f.recipient.length || f.recipient.some((r) => p.recipients.includes(r))) &&
      (!b || (effectivePrice(p) >= b.min && effectivePrice(p) < b.max)) &&
      (!f.stock || p.inStock) && p.rating >= f.rating)
    const s = [...out]
    if (sort === 'best') s.sort((a, b) => b.reviews - a.reviews)
    if (sort === 'new') s.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew))
    if (sort === 'low') s.sort((a, b) => effectivePrice(a) - effectivePrice(b))
    if (sort === 'high') s.sort((a, b) => effectivePrice(b) - effectivePrice(a))
    return s
  }, [f, sort])

  const active = f.category.length + f.occasion.length + f.recipient.length + (f.budget ? 1 : 0) + (f.stock ? 1 : 0) + (f.rating ? 1 : 0)

  return (
    <>
      <section className="bg-gradient-to-b from-blush-100/70 to-cream-100">
        <div className="container-x py-10 text-center sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-3 text-xs text-cocoa-400">Home / <span className="text-cocoa-600">Shop</span></nav>
          <h1 className="text-4xl text-cocoa-700 sm:text-5xl">Shop All Gifts</h1>
          <p className="mx-auto mt-3 max-w-md text-cocoa-500">Discover thoughtful gifts for every occasion.</p>
          <form role="search" onSubmit={(e) => e.preventDefault()} className="relative mx-auto mt-7 max-w-xl">
            <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-cocoa-400" />
            <input aria-label="Search gifts" value={f.q} onChange={(e) => set({ q: e.target.value })} placeholder="Search gifts..." className="input !min-h-[54px] !rounded-full !pl-14 shadow-soft" />
          </form>
        </div>
      </section>

      <div className="container-x grid gap-8 pb-20 pt-6 lg:grid-cols-[250px_1fr] lg:pt-10">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between"><h2 className="font-sans text-base font-bold">Filters</h2>{active > 0 && <button onClick={() => setF({ ...empty, q: f.q })} className="text-xs font-semibold text-blush-400 hover:underline">Clear all</button>}</div>
            <FilterPanel f={f} set={set} />
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-cocoa-500" aria-live="polite"><strong className="text-cocoa-700">{list.length}</strong> gift{list.length === 1 ? '' : 's'}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setDrawer(true)} className="btn-secondary !min-h-[44px] !px-4 lg:hidden"><FilterIcon size={18} />Filters{active > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-cocoa-600 text-[11px] text-white">{active}</span>}</button>
              <label className="sr-only" htmlFor="sort">Sort by</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="input !min-h-[44px] !w-auto !rounded-full !pr-8 font-semibold">
                {sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>
          {list.length ? <ProductGrid items={list} onQuickView={open} cols={3} /> : (
            <div className="rounded-3xl bg-white p-12 text-center shadow-soft">
              <p className="font-display text-2xl text-cocoa-700">No gifts match just yet</p>
              <p className="mt-2 text-sm text-cocoa-500">Try removing a filter or two.</p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><button className="btn-secondary" onClick={() => setF(empty)}>Clear filters</button></div>
            </div>
          )}
        </div>
      </div>

      <Modal open={drawer} onClose={() => setDrawer(false)} label="Filters" sheet>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cream-300 bg-cream-50 px-6 py-4">
          <h2 className="font-sans text-lg font-bold">Filters</h2>
          <button onClick={() => setDrawer(false)} aria-label="Close filters" className="grid h-11 w-11 place-items-center rounded-full hover:bg-cream-200"><CloseIcon /></button>
        </div>
        <div className="px-6 py-5"><FilterPanel f={f} set={set} /></div>
        <div className="sticky bottom-0 flex gap-3 border-t border-cream-300 bg-cream-50 p-4">
          <button className="btn-secondary flex-1" onClick={() => setF({ ...empty, q: f.q })}>Clear</button>
          <button className="btn-primary flex-[2]" onClick={() => setDrawer(false)}>Show {list.length} gifts</button>
        </div>
      </Modal>
      {node}
    </>
  )
}
