@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: 250 246 240; /* paper */
  --fg: 26 21 35; /* ink */
  --surface: 255 255 255;
  --border: 231 223 211;
}

.dark {
  --bg: 24 19 32;
  --fg: 245 240 235;
  --surface: 34 27 45;
  --border: 58 47 71;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: rgb(var(--bg));
    color: rgb(var(--fg));
  }
  ::selection {
    background-color: theme('colors.marigold.300');
    color: theme('colors.ink');
  }
  :focus-visible {
    outline: 2px solid theme('colors.marigold.DEFAULT');
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@layer components {
  /* Signature "ticket stub" divider — echoes a torn market receipt */
  .ticket-divider {
    position: relative;
    height: 1px;
    background: repeating-linear-gradient(
      90deg,
      rgb(var(--border)) 0 8px,
      transparent 8px 14px
    );
  }

  /* Vendor trust stamp badge */
  .vendor-stamp {
    @apply inline-flex items-center gap-1.5 rounded-stamp border border-teal-500/40 px-2 py-0.5 text-[11px] font-mono uppercase tracking-wide text-teal-700 dark:text-teal-100;
    transform: rotate(-2deg);
  }
}
