// Centralised mock data. Replace with Shopify Storefront API responses later —
// keep these shapes (or map API results onto them) and no component needs to change.

export type Scene =
  | 'hamper' | 'box' | 'flowers' | 'personal' | 'choc' | 'selfcare' | 'baby'
  | 'bundle' | 'card' | 'candle' | 'wedding' | 'xmas' | 'store' | 'hero'
export type Tone = 'blush' | 'peach' | 'sage' | 'cream' | 'cocoa'

export interface Product {
  id: string
  slug: string
  handle: string // Shopify product handle
  name: string
  category: string
  occasions: string[]
  recipients: string[]
  price: number
  salePrice?: number
  rating: number
  reviews: number
  image: string
  gallery: string[]
  description: string
  details: string[]
  inStock: boolean
  isNew?: boolean
  bestSeller?: boolean
}

export const products: Product[] = [
  { id: 'p1', slug: 'owl-boutique-candle', handle: 'owl-boutique-candle', name: 'Owl Boutique Candle', category: 'Candles', occasions: ['birthday', 'thank-you', 'just-because', 'christmas'], recipients: ['friend', 'family', 'partner', 'colleague'], price: 29.95, rating: 4.9, reviews: 142, image: '/images/owl-candle.jpg', gallery: ['/images/owl-candle.jpg', '/images/owl-candle-boxed.jpg', '/images/candle-collection.jpg'], bestSeller: true, inStock: true,
    description: 'A hand-poured Cashmere & Silk candle in a glossy white jar with a gold-finish lid, decorated with a patchwork owl. Arrives in a window gift box, ready to give.',
    details: ['Hand-poured boutique candle', 'Cashmere & Silk fragrance', 'Gold-finish lid, re-usable jar', 'Presented in a window gift box'] },
  { id: 'p2', slug: 'puppy-boutique-candle', handle: 'puppy-boutique-candle', name: 'Patchwork Puppy Candle', category: 'Candles', occasions: ['birthday', 'thank-you', 'just-because'], recipients: ['friend', 'family', 'kids', 'colleague'], price: 29.95, rating: 4.8, reviews: 97, image: '/images/dog-candle.jpg', gallery: ['/images/dog-candle.jpg', '/images/candle-collection.jpg'], isNew: true, inStock: true,
    description: 'A cheeky patchwork puppy and his chewed teddy on a hand-poured Cashmere & Silk candle. A sure smile for any dog lover.',
    details: ['Hand-poured boutique candle', 'Cashmere & Silk fragrance', 'Gold-finish lid, re-usable jar', 'Presented in a window gift box'] },
  { id: 'p3', slug: 'cow-boutique-candle', handle: 'cow-boutique-candle', name: 'Patchwork Cow Candle', category: 'Candles', occasions: ['birthday', 'thank-you', 'just-because'], recipients: ['friend', 'family', 'colleague'], price: 29.95, salePrice: 24.95, rating: 4.7, reviews: 63, image: '/images/cow-candle.jpg', gallery: ['/images/cow-candle.jpg', '/images/candle-collection.jpg'], inStock: true,
    description: 'A curious patchwork cow peers around this hand-poured Cashmere & Silk candle. Quirky, colourful and made to be gifted.',
    details: ['Hand-poured boutique candle', 'Cashmere & Silk fragrance', 'Gold-finish lid, re-usable jar', 'Presented in a window gift box'] },
  { id: 'p4', slug: 'boutique-candle-collection', handle: 'boutique-candle-collection', name: 'Boutique Candle Collection', category: 'Candles', occasions: ['birthday', 'christmas', 'celebration', 'thank-you'], recipients: ['friend', 'family', 'colleague', 'someone-special'], price: 29.95, rating: 4.9, reviews: 188, image: '/images/candle-collection.jpg', gallery: ['/images/candle-collection.jpg', '/images/owl-candle-boxed.jpg'], bestSeller: true, inStock: true,
    description: 'Choose your favourite from the range: sloth, owl, giraffe, puppy, cow or cat. Each is a hand-poured Cashmere & Silk candle with a gold-finish lid.',
    details: ['6 designs: sloth, owl, giraffe, puppy, cow, cat', 'Cashmere & Silk fragrance', 'Gold-finish lid', 'Window gift box'] },
  { id: 'p5', slug: 'owl-serving-tray', handle: 'owl-serving-tray', name: 'Owl Mini Tray', category: 'Trays', occasions: ['birthday', 'thank-you', 'just-because', 'christmas'], recipients: ['friend', 'family', 'colleague'], price: 16.95, rating: 4.8, reviews: 121, image: '/images/owl-tray.jpg', gallery: ['/images/owl-tray.jpg', '/images/tray-collection.jpg'], bestSeller: true, inStock: true,
    description: 'A hardwearing melamine tray with a patchwork owl under the stars. Perfect for tea and biscuits, trinkets or a bedside table.',
    details: ['Durable melamine', 'Wipe clean', 'Rounded corners, raised edge', 'Part of a collection of 8 designs'] },
  { id: 'p6', slug: 'animal-tray-collection', handle: 'animal-tray-collection', name: 'Animal Mini Tray Collection', category: 'Trays', occasions: ['birthday', 'celebration', 'just-because', 'thank-you'], recipients: ['friend', 'family', 'kids'], price: 16.95, rating: 4.7, reviews: 85, image: '/images/tray-collection.jpg', gallery: ['/images/tray-collection.jpg', '/images/owl-tray.jpg'], isNew: true, inStock: true,
    description: 'Eight patchwork friends to choose from: owl, hare, cow, sloth, puppy, giraffe, panda and cat. Collect them all.',
    details: ['8 designs', 'Durable melamine', 'Wipe clean', 'Rounded corners, raised edge'] },
  { id: 'p7', slug: 'first-cup-blue', handle: 'first-cup-blue', name: 'My First Cup: Blue Elephant', category: 'Mugs & Cups', occasions: ['new-baby', 'birthday'], recipients: ['family', 'friend', 'kids'], price: 14.95, rating: 5.0, reviews: 58, image: '/images/elephant-mug-blue.jpg', gallery: ['/images/elephant-mug-blue.jpg', '/images/elephant-mugs.jpg'], isNew: true, inStock: true,
    description: 'A sweet two-handled ceramic cup with a gentle elephant and a pale blue interior. Comes in a Hello Baby gift box.',
    details: ['Ceramic, two handles for little hands', 'Pale blue interior', '"My first cup" elephant design', 'Gift boxed'] },
  { id: 'p8', slug: 'first-cup-pink', handle: 'first-cup-pink', name: 'My First Cup: Pink Elephant', category: 'Mugs & Cups', occasions: ['new-baby', 'birthday'], recipients: ['family', 'friend', 'kids'], price: 14.95, rating: 5.0, reviews: 64, image: '/images/elephant-mug-pink.jpg', gallery: ['/images/elephant-mug-pink.jpg', '/images/elephant-mugs.jpg'], isNew: true, inStock: true,
    description: 'A sweet two-handled ceramic cup with a gentle elephant and a soft pink interior. Comes in a Hello Baby gift box.',
    details: ['Ceramic, two handles for little hands', 'Soft pink interior', '"My first cup" elephant design', 'Gift boxed'] },
  { id: 'p9', slug: 'floral-fine-china-mug', handle: 'floral-fine-china-mug', name: 'Floral Fine China Mug', category: 'Mugs & Cups', occasions: ['thank-you', 'birthday', 'just-because', 'mothers-day'], recipients: ['family', 'friend', 'colleague', 'partner'], price: 12.95, rating: 4.8, reviews: 109, image: '/images/floral-mugs.jpg', gallery: ['/images/floral-mugs.jpg'], bestSeller: true, inStock: true,
    description: 'Fine china mugs painted with wildflower meadows, a blossoming tree and a potted garden. Choose from 4 designs, each in a window gift box.',
    details: ['Fine china', '4 floral designs', 'Dishwasher safe', 'Gift boxed'] },
  { id: 'p10', slug: 'teddy-bear-photo-frame', handle: 'teddy-bear-photo-frame', name: 'Teddy Bear Photo Frame', category: 'Photo Frames', occasions: ['new-baby', 'birthday', 'christmas'], recipients: ['family', 'friend'], price: 24.95, rating: 4.9, reviews: 46, image: '/images/teddy-frames.jpg', gallery: ['/images/teddy-frames.jpg'], isNew: true, inStock: true,
    description: 'A silver-plated and enamelled teddy bear frame in baby blue or pink, with a bow tie and an oval opening for a 4" x 6" photo. A keepsake for the nursery.',
    details: ['Enamelled, silver-plated finish', 'Fits a 4" x 6" photo', 'Available in blue or pink', 'Timeless Moments by Gibson'] },
]

export interface Occasion { image?: string; slug: string; name: string; emoji: string; blurb: string; scene: Scene; tone: Tone; handle: string }
export const occasions: Occasion[] = [
  { image: '/images/tray-collection.jpg', slug: 'birthday', name: 'Birthday', emoji: '🎂', blurb: 'Make their day unforgettable', scene: 'box', tone: 'blush', handle: 'birthday' },
  { image: '/images/teddy-frames.jpg', slug: 'anniversary', name: 'Anniversary', emoji: '💕', blurb: 'Celebrate your story together', scene: 'personal', tone: 'peach', handle: 'anniversary' },
  { image: '/images/floral-mugs.jpg', slug: 'thank-you', name: 'Thank You', emoji: '💐', blurb: 'Say it with something lovely', scene: 'flowers', tone: 'sage', handle: 'thank-you' },
  { image: '/images/candle-collection.jpg', slug: 'celebration', name: 'Celebration', emoji: '🎉', blurb: 'Raise a glass to the good stuff', scene: 'bundle', tone: 'cream', handle: 'celebration' },
  { image: '/images/elephant-mugs.jpg', slug: 'new-baby', name: 'New Baby', emoji: '👶', blurb: 'Welcome the littlest one', scene: 'baby', tone: 'peach', handle: 'new-baby' },
  { slug: 'wedding', name: 'Wedding', emoji: '💍', blurb: 'Gifts for the happy couple', scene: 'wedding', tone: 'cream', handle: 'wedding' },
  { image: '/images/owl-candle-boxed.jpg', slug: 'christmas', name: 'Christmas', emoji: '🎄', blurb: 'Festive treats and keepsakes', scene: 'xmas', tone: 'sage', handle: 'christmas' },
  { image: '/images/dog-candle.jpg', slug: 'just-because', name: 'Just Because', emoji: '🎁', blurb: 'No reason needed', scene: 'candle', tone: 'blush', handle: 'just-because' },
]

export const moreOccasions: Occasion[] = [
  { slug: 'valentines-day', name: "Valentine's Day", emoji: '❤️', blurb: 'For the one you adore', scene: 'flowers', tone: 'blush', handle: 'valentines-day' },
  { slug: 'mothers-day', name: "Mother's Day", emoji: '🌷', blurb: 'Because she deserves it', scene: 'selfcare', tone: 'peach', handle: 'mothers-day' },
  { slug: 'fathers-day', name: "Father's Day", emoji: '🧔', blurb: 'Gifts dads actually want', scene: 'choc', tone: 'cocoa', handle: 'fathers-day' },
  { slug: 'corporate', name: 'Corporate Gifts', emoji: '🤝', blurb: 'Impress teams and clients', scene: 'hamper', tone: 'sage', handle: 'corporate' },
]

export const categories = ['Candles', 'Trays', 'Mugs & Cups', 'Photo Frames']
export const recipientsList = [
  { id: 'partner', label: 'Partner' }, { id: 'friend', label: 'Friend' }, { id: 'family', label: 'Family' },
  { id: 'colleague', label: 'Colleague' }, { id: 'kids', label: 'Kids' }, { id: 'someone-special', label: 'Someone Special' },
]
export const budgets = [
  { id: 'u30', label: 'Under $30', min: 0, max: 30 }, { id: '30-50', label: '$30–$50', min: 30, max: 50 },
  { id: '50-100', label: '$50–$100', min: 50, max: 100 }, { id: '100+', label: '$100+', min: 100, max: Infinity },
]

export const testimonials = [
  { name: 'Sarah M.', text: 'Finding the perfect gift was so easy. The gift arrived beautifully presented and my friend loved it.', place: 'Birthday hamper' },
  { name: 'James T.', text: 'Ordered a personalised box for our anniversary. The foil stamping was gorgeous and the packaging was a gift in itself.', place: 'Personalised box' },
  { name: 'Priya K.', text: 'I popped in last-minute and the team helped me build a hamper in ten minutes. Friendly, warm and so thoughtful.', place: 'In-store visit' },
  { name: 'Olivia R.', text: 'The baby welcome hamper was the highlight of our shower. Everyone asked where it was from!', place: 'Baby hamper' },
  { name: 'Daniel W.', text: 'Used them for our client gifts this Christmas. Professional, on time, and the clients were genuinely delighted.', place: 'Corporate gifting' },
]

export const services = [
  { title: 'Gift Wrapping', text: 'Beautiful presentation for every occasion: ribbon, tissue and handwritten tags.', scene: 'box' as Scene, tone: 'blush' as Tone },
  { title: 'Personalised Gifting', text: 'Make your gift more meaningful with foil stamping, engraving and custom notes.', scene: 'personal' as Scene, tone: 'sage' as Tone },
  { title: 'Corporate Gifting', text: 'Thoughtful gifting for teams and clients, with bulk pricing and branded notes.', scene: 'hamper' as Scene, tone: 'cream' as Tone },
  { title: 'Local Delivery', text: 'Same-day and next-day delivery across the metro area, carefully handled.', scene: 'bundle' as Scene, tone: 'peach' as Tone },
  { title: 'In-Store Pickup', text: 'Order online and collect from the shop, usually ready within two hours.', scene: 'store' as Scene, tone: 'cream' as Tone },
]

export const store = {
  name: 'Greetings and Gift',
  tagline: 'Gifts with a little more meaning',
  address: '24 Willow Lane, Fitzroy VIC 3065',
  phone: '(03) 9555 0142',
  email: 'hello@greetingsandgift.com.au',
  hours: [
    ['Mon – Fri', '9:00am – 5:30pm'], ['Saturday', '9:00am – 4:00pm'], ['Sunday', '10:00am – 3:00pm'],
  ] as [string, string][],
  shopifyDomain: 'https://greetingsandgift.myshopify.com',
}

export const money = (n: number) => `${n.toFixed(2)}`
export const effectivePrice = (p: Product) => p.salePrice ?? p.price
