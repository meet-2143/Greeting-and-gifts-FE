import { products } from '../data'
import { useQuickView, ProductCarousel, ProductGrid } from '../components/Products'
import { FeatureCardsStrip } from './strip'
import { CategorySlideshow } from '../components/CategorySlideshow'
import { GiftFinder, GiftInspiration, HeroSection, Newsletter, OccasionsSection, PromoBanner, StoreLocation, Testimonials, WhyUs } from '../components/Sections'
import { ButtonLink, SectionHeading, usePageMeta } from '../components/ui'

export default function Home() {
  usePageMeta('Thoughtful Gifts for Every Moment', 'Local gift boutique for birthdays, weddings, new babies and every moment worth remembering. Shop hampers, gift boxes, flowers and personalised gifts.')
  const { open, node } = useQuickView()
  const featured = products.slice(0, 8)
  const best = products.filter((p) => p.bestSeller)

  return (
    <>
      <HeroSection />
      <FeatureCardsStrip />
      <CategorySlideshow />
      <OccasionsSection />

      <section className="container-x pb-8" aria-labelledby="featured-h">
        <SectionHeading eyebrow="Featured" title="Gifts They’ll Love" text="Our most-loved hampers, boxes and bouquets, wrapped and ready to give."
          action={<ButtonLink to="/shop" kind="link">Shop all gifts</ButtonLink>} align="left" />
        <ProductGrid items={featured} onQuickView={open} />
      </section>

      <div className="section"><PromoBanner /></div>
      <GiftFinder />
      <WhyUs />

      <section className="container-x pb-8" aria-label="Best sellers">
        <SectionHeading eyebrow="Customer favourites" title="Our Best Sellers" align="left" action={<ButtonLink to="/shop" kind="link">View all best sellers</ButtonLink>} />
        <ProductCarousel items={best} onQuickView={open} />
      </section>

      <GiftInspiration />
      <Testimonials />
      <StoreLocation />
      <Newsletter />
      {node}
    </>
  )
}
