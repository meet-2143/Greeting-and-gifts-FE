import { CheckIcon, GiftIcon, HeartHandIcon, TruckIcon } from '../components/Icons'

const items = [
  { i: <TruckIcon size={20} />, t: 'Same-day local delivery' },
  { i: <GiftIcon size={20} />, t: 'Complimentary gift wrapping' },
  { i: <HeartHandIcon size={20} />, t: 'Handwritten gift notes' },
  { i: <CheckIcon size={20} />, t: 'Click & collect in 2 hours' },
]

/** Slim trust ribbon under the hero. */
export function FeatureCardsStrip() {
  return (
    <div className="border-y border-cream-300 bg-white/70">
      <ul className="container-x grid grid-cols-2 gap-x-4 gap-y-3 py-4 lg:grid-cols-4">
        {items.map((x) => (
          <li key={x.t} className="flex items-center justify-center gap-2.5 text-xs font-semibold text-cocoa-600 sm:text-sm">
            <span className="text-blush-400">{x.i}</span>{x.t}
          </li>
        ))}
      </ul>
    </div>
  )
}
