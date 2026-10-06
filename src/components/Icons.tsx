import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }
const base = (size = 20): SVGProps<SVGSVGElement> => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
})
const mk = (d: React.ReactNode) => ({ size, ...rest }: IconProps) => <svg {...base(size)} {...rest}>{d}</svg>

export const SearchIcon = mk(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>)
export const UserIcon = mk(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>)
export const BagIcon = mk(<><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>)
export const MenuIcon = mk(<path d="M4 7h16M4 12h16M4 17h16" />)
export const CloseIcon = mk(<path d="M6 6l12 12M18 6 6 18" />)
export const HeartIcon = mk(<path d="M12 20s-7-4.4-9-9.2C1.8 7.6 3.7 4.5 7 4.5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.300 0 5.200 3.100 4 6.300-2 4.800-9 9.200-9 9.200Z" />)
export const ArrowIcon = mk(<path d="M5 12h14m-6-6 6 6-6 6" />)
export const ArrowLeftIcon = mk(<path d="M19 12H5m6-6-6 6 6 6" />)
export const ChevronDown = mk(<path d="m6 9 6 6 6-6" />)
export const ChevronLeft = mk(<path d="m15 6-6 6 6 6" />)
export const ChevronRight = mk(<path d="m9 6 6 6-6 6" />)
export const EyeIcon = mk(<><path d="M2 12s3.600-7 10-7 10 7 10 7-3.600 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>)
export const CheckIcon = mk(<path d="m5 12 5 5 9-10" />)
export const PinIcon = mk(<><path d="M12 21s7-6.200 7-12a7 7 0 1 0-14 0c0 5.800 7 12 7 12Z" /><circle cx="12" cy="9" r="2.500" /></>)
export const PhoneIcon = mk(<path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />)
export const MailIcon = mk(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>)
export const ClockIcon = mk(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)
export const GiftIcon = mk(<><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M12 8c-2-4-6-4-6-1.500S10 8 12 8Zm0 0c2-4 6-4 6-1.500S14 8 12 8Z" /></>)
export const HeartHandIcon = mk(<><path d="M12 21s-7-4.200-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 11c0 5.800-7 10-7 10Z" /></>)
export const TruckIcon = mk(<><path d="M2 6h11v10H2zM13 10h4l3 3v3h-7" /><circle cx="7" cy="17.500" r="1.800" /><circle cx="17" cy="17.500" r="1.800" /></>)
export const SparklesIcon = mk(<><path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800Z" /><path d="M19 16l.7 2.300L22 19l-2.300.7L19 22l-.7-2.300L16 19l2.300-.7Z" /></>)
export const StoreIcon = mk(<><path d="M4 9l1.500-5h13L20 9M4 9v11h16V9M4 9c0 1.700 1.300 3 3 3s3-1.300 3-3c0 1.700 1.300 3 3 3s3-1.300 3-3c0 1.700 1.300 3 3 3" /><path d="M10 20v-5h4v5" /></>)
export const ExternalIcon = mk(<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />)
export const FilterIcon = mk(<path d="M4 6h16M7 12h10M10 18h4" />)
export const PlusIcon = mk(<path d="M12 5v14M5 12h14" />)
export const MinusIcon = mk(<path d="M5 12h14" />)
export const InstagramIcon = mk(<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.200" cy="6.800" r=".6" fill="currentColor" /></>)
export const FacebookIcon = mk(<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.500c0-.3.200-.5.500-.5Z" />)
export const TikTokIcon = mk(<path d="M14 3v11.500a3.500 3.500 0 1 1-3.500-3.500M14 3c.3 2.500 2 4.200 5 4.500" />)

export const Star = ({ filled = true, size = 14 }: { filled?: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={filled ? 'fill-[#D4A95A] text-[#D4A95A]' : 'fill-cream-300 text-cream-300'}>
    <path d="m12 2.500 2.900 6.100 6.600.8-4.900 4.600 1.300 6.600L12 17.300 6.100 20.600l1.300-6.600L2.500 9.400l6.600-.8Z" />
  </svg>
)
