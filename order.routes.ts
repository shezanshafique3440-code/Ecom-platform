import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategoryGrid } from '@/components/CategoryGrid';
import { FlashDeals, FeaturedProducts } from '@/components/ProductSections';
import { Testimonials, Newsletter, Footer } from '@/components/TrustAndFooter';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <FlashDeals />
        <FeaturedProducts />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
