import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { LOCALES, LOCALE_NAMES, waLink } from '../lib/site';
import logo from '../assets/logo-new.png';

const LINKS = [
  { path: '/about', key: 'about' },
  { path: '/services', key: 'services' },
  { path: '/process', key: 'process' },
  { path: '/faq', key: 'faq' },
  { path: '/contact', key: 'contact' },
] as const;

export default function Navbar() {
  const { d, locale, setLocale } = useLocale();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  const onDarkHero = location.pathname === '/';

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 640 && y > prev && !open);
  });

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const solid = scrolled || !onDarkHero;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? '-120%' : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 0.8, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <div
        className={`flex w-full max-w-5xl items-center gap-3 rounded-full border py-2 pl-3 pr-2 transition-all duration-500 ${
          solid
            ? 'border-[rgba(1,103,123,0.14)] bg-white/85 shadow-[0_18px_50px_-20px_rgba(1,40,50,0.35)] backdrop-blur-xl'
            : 'border-white/10 bg-[rgba(5,26,32,0.35)] backdrop-blur-md'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5" aria-label="Veracare home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1 shadow-sm">
            <img src={logo} alt="Veracare logo" className="h-8 w-8 object-contain" />
          </span>
          <span
            className={`font-serif-display text-[17px] font-semibold tracking-[0.18em] ${
              solid ? 'text-deep-teal' : 'text-white'
            }`}
          >
            VERACARE
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const active = location.pathname === l.path;
            return (
              <Link
                key={l.path}
                to={l.path}
                className={`rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors ${
                  solid
                    ? active
                      ? 'bg-[rgba(1,103,123,0.08)] text-[var(--deep-blue)]'
                      : 'text-[rgba(7,43,52,0.72)] hover:bg-[rgba(1,103,123,0.07)] hover:text-[var(--deep-blue)]'
                    : active
                      ? 'bg-white/15 text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                {d.nav[l.key]}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <div className={`hidden items-center gap-0.5 text-[12px] sm:flex ${solid ? 'text-[rgba(7,43,52,0.5)]' : 'text-white/60'}`}>
            {LOCALES.map((l, i) => (
              <span key={l} className="flex items-center gap-0.5">
                <button
                  onClick={() => setLocale(l)}
                  className={`rounded-full px-1.5 py-1 font-semibold transition-colors ${
                    locale === l ? (solid ? 'text-[var(--deep-blue)]' : 'text-[var(--cyan)]') : 'hover:text-current'
                  }`}
                >
                  {LOCALE_NAMES[l]}
                </button>
                {i < LOCALES.length - 1 && <span className="opacity-40">/</span>}
              </span>
            ))}
          </div>

          <a
            href={waLink(d.whatsapp_message)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden items-center gap-2 rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] px-4 py-2 text-[13px] font-semibold text-[var(--ink)] shadow-[0_8px_24px_-10px_rgba(185,150,63,0.8)] transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            {d.nav.whatsapp}
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors lg:hidden ${
              solid ? 'text-[var(--deep-teal)] hover:bg-[rgba(1,103,123,0.08)]' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="absolute top-[calc(100%+8px)] w-full max-w-5xl rounded-3xl border border-[rgba(1,103,123,0.12)] bg-white/95 p-3 shadow-[0_30px_70px_-30px_rgba(1,40,50,0.5)] backdrop-blur-xl lg:hidden"
          >
            {LINKS.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`block rounded-2xl px-4 py-3 text-[15px] font-medium ${
                  location.pathname === l.path
                    ? 'bg-[rgba(1,103,123,0.07)] text-[var(--deep-blue)]'
                    : 'text-[rgba(7,43,52,0.8)] hover:bg-[rgba(1,103,123,0.06)]'
                }`}
              >
                {d.nav[l.key]}
              </Link>
            ))}
            <div className="mt-1 flex items-center justify-center gap-1 border-t border-[rgba(1,103,123,0.1)] pt-3 pb-1 text-[14px]">
              {LOCALES.map((l, i) => (
                <span key={l} className="flex items-center gap-1">
                  <button
                    onClick={() => setLocale(l)}
                    className={`rounded-full px-3 py-1.5 font-semibold transition-colors ${
                      locale === l
                        ? 'bg-[rgba(1,103,123,0.09)] text-[var(--deep-blue)]'
                        : 'text-[rgba(7,43,52,0.55)] hover:text-[var(--deep-blue)]'
                    }`}
                  >
                    {LOCALE_NAMES[l]}
                  </button>
                  {i < LOCALES.length - 1 && <span className="text-[rgba(7,43,52,0.3)]">/</span>}
                </span>
              ))}
            </div>
            <a
              href={waLink(d.whatsapp_message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[var(--deep-teal)] px-4 py-3 text-[15px] font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              {d.nav.whatsapp}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
