const testimonials = [
  { quote: 'Found a stall selling the exact spice blend my grandmother used — shipped from three cities away.', name: 'Amara D.' },
  { quote: 'Vendor dashboard makes it trivial to track payouts across every order.', name: 'Farhan K., seller' },
  { quote: 'Checkout is fast and the tracking updates actually mean something.', name: 'Priya S.' },
];

export function Testimonials() {
  return (
    <section className="border-y border-line bg-plum-50/50 py-14 dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-semibold">What shoppers are saying</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-white p-6 shadow-sm dark:bg-ink/40">
              <blockquote className="font-display text-base italic leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 font-mono text-xs uppercase tracking-wide text-ink/50 dark:text-white/40">
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-plum-500 px-8 py-12 text-center text-white dark:bg-plum-700">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Get first pick of new stalls</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/80">
          One email a week: new vendors, restock alerts, and deals worth the click.
        </p>
        <form className="mx-auto mt-6 flex max-w-md gap-2">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-full border-0 px-4 py-2.5 text-sm text-ink placeholder:text-ink/40"
          />
          <button
            type="submit"
            className="rounded-full bg-marigold-500 px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-marigold-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-xl font-semibold text-plum-700 dark:text-marigold-300">Haat</p>
          <p className="mt-1 text-sm text-ink/50 dark:text-white/40">Everything, from everyone.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-4">
          <div>
            <p className="font-medium">Shop</p>
            <ul className="mt-2 space-y-1 text-ink/60 dark:text-white/50">
              <li><a href="/products">All products</a></li>
              <li><a href="/deals">Flash deals</a></li>
              <li><a href="/categories">Categories</a></li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Sell</p>
            <ul className="mt-2 space-y-1 text-ink/60 dark:text-white/50">
              <li><a href="/vendor/apply">Become a vendor</a></li>
              <li><a href="/vendor/dashboard">Vendor dashboard</a></li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Support</p>
            <ul className="mt-2 space-y-1 text-ink/60 dark:text-white/50">
              <li><a href="/support/faq">FAQ</a></li>
              <li><a href="/support/chat">Live chat</a></li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Company</p>
            <ul className="mt-2 space-y-1 text-ink/60 dark:text-white/50">
              <li><a href="/about">About</a></li>
              <li><a href="/legal/terms">Terms</a></li>
              <li><a href="/legal/privacy">Privacy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
