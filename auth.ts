const categories = [
  { name: 'Home & Living', slug: 'home-living', emoji: '🏺' },
  { name: 'Fashion', slug: 'fashion', emoji: '🧵' },
  { name: 'Electronics', slug: 'electronics', emoji: '🔌' },
  { name: 'Beauty', slug: 'beauty', emoji: '🌿' },
  { name: 'Groceries', slug: 'groceries', emoji: '🌾' },
  { name: 'Handmade', slug: 'handmade', emoji: '✂️' },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-2xl font-semibold">Browse the stalls</h2>
        <a href="/categories" className="text-sm font-medium text-plum-500 hover:underline">
          All categories →
        </a>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) => (
          <a
            key={c.slug}
            href={`/products?category=${c.slug}`}
            className="group flex flex-col items-center gap-2 rounded-2xl border border-line bg-white p-5 text-center transition hover:-translate-y-0.5 hover:border-plum-300 hover:shadow-md dark:border-white/10 dark:bg-white/5"
          >
            <span className="text-2xl" aria-hidden>{c.emoji}</span>
            <span className="text-sm font-medium">{c.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
