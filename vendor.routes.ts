export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line dark:border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <span className="vendor-stamp w-fit">12,400+ independent sellers</span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Everything,
            <br />
            <span className="italic text-plum-500 dark:text-marigold-300">from everyone.</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-ink/70 dark:text-white/60">
            One marketplace, thousands of independent stalls — handmade goods,
            everyday essentials, and hard-to-find finds, all under one roof.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/products"
              className="rounded-full bg-plum-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-plum-700"
            >
              Start browsing
            </a>
            <a
              href="/vendor/apply"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold transition hover:border-plum-500 dark:border-white/20"
            >
              Open your stall →
            </a>
          </div>
          <div className="ticket-divider mt-10 max-w-sm text-line dark:text-white/10" />
          <dl className="mt-6 flex gap-8 font-mono text-xs uppercase tracking-wide text-ink/50 dark:text-white/40">
            <div>
              <dt>Categories</dt>
              <dd className="mt-1 text-lg font-medium text-ink dark:text-white">40+</dd>
            </div>
            <div>
              <dt>Countries shipped</dt>
              <dd className="mt-1 text-lg font-medium text-ink dark:text-white">65</dd>
            </div>
            <div>
              <dt>Avg. dispatch</dt>
              <dd className="mt-1 text-lg font-medium text-ink dark:text-white">24hr</dd>
            </div>
          </dl>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-plum-100 via-marigold-100 to-teal-100 opacity-70 dark:from-plum-900 dark:via-plum-700 dark:to-teal-700" />
          <div className="relative grid h-full grid-cols-2 gap-4 p-8">
            <div className="col-span-2 rounded-2xl bg-white/80 p-5 shadow-sm backdrop-blur dark:bg-white/5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-teal-700 dark:text-teal-300">Flash deal ends in 03:41:12</p>
              <p className="mt-2 font-display text-xl font-medium">Hand-loomed Wool Throw</p>
              <p className="mt-1 font-mono text-sm text-marigold-700 dark:text-marigold-300">$69.00 <span className="text-ink/40 line-through">$89.00</span></p>
            </div>
            <div className="rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur dark:bg-white/5">
              <p className="vendor-stamp">Verified stall</p>
              <p className="mt-3 font-display text-sm">Indus Crafts Co.</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-5 shadow-sm backdrop-blur dark:bg-white/5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink/50 dark:text-white/50">Rating</p>
              <p className="mt-3 font-display text-2xl">4.9 ★</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
