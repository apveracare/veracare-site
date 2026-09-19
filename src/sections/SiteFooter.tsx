import { Link } from 'react-router';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Instagram, Twitter, Music2 } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { EMAIL, PHONE_DISPLAY, ADDRESS_LINES, waLink } from '../lib/site';
import logo from '../assets/logo-new.png';

const LINKS = [
  { path: '/', key: 'home' },
  { path: '/about', key: 'about' },
  { path: '/services', key: 'services' },
  { path: '/process', key: 'process' },
  { path: '/faq', key: 'faq' },
  { path: '/contact', key: 'contact' },
] as const;

export default function SiteFooter() {
  const { d } = useLocale();
  const { scrollYProgress } = useScroll();
  const wordY = useTransform(scrollYProgress, [0.85, 1], [80, 0]);
  const wordOpacity = useTransform(scrollYProgress, [0.85, 0.98], [0.2, 1]);

  return (
    <footer className="relative mt-3 overflow-hidden rounded-t-[2.5rem] bg-[#051a20] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:px-12">
        <div className="grid grid-cols-1 gap-10 pb-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white p-1">
                <img src={logo} alt="Veracare logo" className="h-9 w-9 object-contain" />
              </span>
              <span className="font-serif-display text-[18px] font-semibold tracking-[0.18em]">VERACARE</span>
            </Link>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-white/55">{d.footer.tagline}</p>
            <p className="mt-5 text-[11px] font-medium tracking-[0.14em] text-[var(--gold-light)] uppercase">Follow us</p>
            <div className="mt-3 flex gap-3">
              {[Instagram, Twitter, Music2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-white/40 uppercase">Menu</p>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-[14px] text-white/70 transition-colors hover:text-[var(--cyan)]">
                    {d.nav[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-white/40 uppercase">{d.trust.address_label}</p>
            <div className="mt-4 space-y-1.5 text-[14px] leading-relaxed text-white/70">
              {ADDRESS_LINES.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <p className="mt-4">
              <a href="tel:+60186868865" className="text-[14px] text-white/70 hover:text-[var(--cyan)]">
                {PHONE_DISPLAY}
              </a>
            </p>
            <p>
              <a href={`mailto:${EMAIL}`} className="text-[14px] text-white/70 hover:text-[var(--cyan)]">
                {EMAIL}
              </a>
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-white/40 uppercase">{d.about.license_heading}</p>
            <div className="mt-4 space-y-2 text-[14px] text-white/70">
              <p>{d.trust.jtksm_value}</p>
              <p>{d.trust.ssm_value}</p>
            </div>
            <a
              href={waLink(d.whatsapp_message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] px-6 py-3 text-[13.5px] font-semibold text-[var(--ink)] transition-transform hover:scale-[1.03]"
            >
              {d.nav.whatsapp}
            </a>
          </div>
        </div>
      </div>

      {/* giant wordmark, rises into view like the reference video */}
      <motion.div style={{ y: wordY, opacity: wordOpacity }} className="pointer-events-none select-none px-2" aria-hidden="true">
        <p className="bg-gradient-to-b from-[rgba(94,213,219,0.85)] via-[rgba(11,138,135,0.55)] to-[rgba(11,138,135,0.06)] bg-clip-text text-center font-serif-display text-[19vw] leading-[0.85] font-semibold tracking-tight text-transparent">
          Veracare
        </p>
      </motion.div>

      <div className="border-t border-white/10 px-6 py-5 text-center">
        <p className="text-[12px] text-white/45">© 2026 Agensi Pekerjaan Veracare. {d.footer.rights}</p>
        <p className="mt-1 text-[12px] text-white/45">
          Website Designed by{' '}
          <a href="https://www.wdigital.au" target="_blank" rel="noopener noreferrer" className="text-[var(--cyan)] hover:underline">
            WDigital
          </a>
        </p>
      </div>
    </footer>
  );
}
