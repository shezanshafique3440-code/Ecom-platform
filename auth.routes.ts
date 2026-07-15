interface Product {
  id: string;
  title: string;
  slug: string;
  basePrice: number;
  dealPrice?: number | null;
  avgRating: number;
  vendorName: string;
}

// Placeholder data — replace with a server fetch to `/api/products` once
// the API is running; kept here so the homepage renders standalone.
const sampleProducts: Product[] = [
  { id: '1', title: 'Hand-loomed Wool Throw', slug: 'hand-loomed-wool-throw', basePrice: 89, dealPrice: 69, avgRating: 4.9, vendorName: 'Indus Crafts Co.' },
  { id: '2', title: 'Copper Pour-Over Kettle', slug: 'copper-pour-over-kettle', basePrice: 54, avgRating: 4.7, vendorName: 'North Kiln' },
  { id: '3', title: 'Organic Rose Attar, 12ml', slug: 'organic-rose-attar', basePrice: 22, dealPrice: 17, avgRating: 4.8, vendorName: 'Bagh-e-Chaman' },
  { id: '4', title: 'Recycled Canvas Tote', slug: 'recycled-canvas-tote', basePrice: 31, avgRating: 4.6, vendorName: 'Loop & Weft' },
];

function ProductCard({ product }: { product: Product }) {
  const onDeal = product.dealPrice != null;
  return (
    <a
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
    >
      <div className="relative aspect-square bg-gradient-to-br from-plum-100 to-marigold-100 dark:from-plum-900 dark:to-plum-700">
        {onDeal && (
          <span className="absolute left-3 top-3 rounded-stamp bg-marigold-500 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-ink">
            Deal
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs text-ink/50 dark:text-white/40">{product.vendorName}</p>
        <h3 className="font-medium leading-snug">{product.title}</h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono text-sm">
            ${(onDeal ? product.dealPrice : product.basePrice)!.toFixed(2)}
            {onDeal && (
              <span className="ml-1.5 text-ink/40 line-through dark:text-white/30">
                ${product.basePrice.toFixed(2)}
              </span>
            )}
          </span>
          <span className="font-mono text-xs text-teal-700 dark:text-teal-300">{product.avgRating}★</span>
        </div>
      </div>
    </a>
  );
}

export function FlashDeals() {
  const deals = sampleProducts.filter((p) => p.dealPrice != null);
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-marigold-700 dark:text-marigold-300">Ends in 03:41:12</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Flash deals</h2>
        </div>
        <a href="/deals" className="text-sm font-medium text-plum-500 hover:underline">See all deals →</a>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {deals.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-2xl font-semibold">Featured this week</h2>
        <a href="/products" className="text-sm font-medium text-plum-500 hover:underline">Browse all →</a>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {sampleProducts.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
