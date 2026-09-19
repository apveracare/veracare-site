import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, FileText, Plane, Stethoscope, RefreshCw, HeartHandshake } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { waLink } from '../lib/site';
import { BlurWords } from '../components/Reveal';
import logo from '../assets/logo-new.png';
import heroPhoto from '../assets/hero-photo.jpg';

const EASE = [0.22, 0.8, 0.3, 1] as const;

const NODES = [
  { Icon: ShieldCheck, label: 'JTKSM 1837', cls: 'left-[2%] top-[18%] lg:left-[12%]', delay: 0, color: 'text-[var(--cyan)]' },
  { Icon: FileText, label: 'Permits', cls: 'left-[7%] top-[60%] lg:left-[18%]', delay: 0.8, color: 'text-[var(--gold-light)]' },
  { Icon: Plane, label: 'Arrivals', cls: 'right-[4%] top-[16%] lg:right-[13%]', delay: 1.4, color: 'text-[var(--cyan)]' },
  { Icon: Stethoscope, label: 'FOMEMA', cls: 'right-[8%] top-[62%] lg:right-[19%]', delay: 0.5, color: 'text-[var(--gold-light)]' },
  { Icon: RefreshCw, label: 'Renewals', cls: 'left-[36%] top-[0%]', delay: 1.1, color: 'text-white/80', hideMobile: true },
  { Icon: HeartHandshake, label: 'Counselling', cls: 'right-[32%] top-[2%]', delay: 1.8, color: 'text-white/80', hideMobile: true },
];

export default function Hero() {
  const { d } = useLocale();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const netY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section ref={ref} id="home" className="relative overflow-hidden bg-[#051a20]">
      {/* photo + brand wash (kept from original design) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src={heroPhoto}
          alt=""
          className="h-full w-full scale-110 object-cover object-[65%_35%] opacity-40"
          style={{ filter: 'saturate(.6) brightness(.85) contrast(.95)' }}
        />
        <div
          className="absolute inset-0 opacity-50 mix-blend-soft-light"
          style={{ background: 'linear-gradient(120deg,#01677b 0%,#0b8a87 60%,#14529f 100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,26,32,0.75)] via-[rgba(5,26,32,0.55)] to-[#051a20]" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center px-5 pt-32 pb-24">
        {/* ------- network of care ------- */}
        <motion.div style={{ y: netY }} className="relative mt-2 h-[300px] w-full max-w-3xl sm:h-[320px]">
          {/* connection lines */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 320" fill="none" aria-hidden="true">
            <line x1="120" y1="70" x2="370" y2="160" stroke="rgba(94,213,219,0.35)" strokeWidth="1" className="net-line" />
            <line x1="150" y1="230" x2="370" y2="160" stroke="rgba(228,205,143,0.3)" strokeWidth="1" className="net-line" />
            <line x1="680" y1="60" x2="430" y2="160" stroke="rgba(94,213,219,0.35)" strokeWidth="1" className="net-line" />
            <line x1="660" y1="235" x2="430" y2="160" stroke="rgba(228,205,143,0.3)" strokeWidth="1" className="net-line" />
            <line x1="310" y1="25" x2="390" y2="145" stroke="rgba(255,255,255,0.18)" strokeWidth="1" className="net-line" />
            <line x1="500" y1="28" x2="410" y2="145" stroke="rgba(255,255,255,0.18)" strokeWidth="1" className="net-line" />
          </svg>

          {/* central hub — positioned by the wrapper, animated by the inner motion element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
              className="relative"
            >
              <div className="net-glow absolute inset-0 rounded-[28px] bg-[rgba(94,213,219,0.35)] blur-2xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/25 bg-gradient-to-br from-[var(--deep-teal)] to-[var(--teal)] shadow-[0_24px_60px_-18px_rgba(11,138,135,0.9)] sm:h-28 sm:w-28">
                <img src={logo} alt="Veracare" className="h-16 w-16 object-contain drop-shadow-lg sm:h-[72px] sm:w-[72px]" />
              </div>
            </motion.div>
          </div>

          {/* satellite nodes */}
          {NODES.map(({ Icon, label, cls, delay, color, hideMobile }, i) => (
            <motion.div
              key={label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 + i * 0.12, ease: EASE }}
              className={`absolute ${cls} ${hideMobile ? 'hidden sm:block' : ''}`}
            >
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md sm:h-14 sm:w-14">
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${color}`} strokeWidth={1.6} />
                </div>
                <span className="text-[10px] font-medium tracking-wide text-white/55 sm:text-[11px]">{label}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* ------- copy ------- */}
        <motion.div style={{ y: copyY }} className="mt-6 flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[var(--gold-light)]" />
            <span className="text-[12px] font-medium tracking-[0.2em] text-[var(--gold-light)] uppercase sm:text-[13px]">
              {d.hero.eyebrow}
            </span>
            <span className="h-px w-10 bg-[var(--gold-light)]" />
          </motion.div>

          <BlurWords
            as="h1"
            text={d.hero.headline}
            stagger={0.07}
            className="font-serif-display mt-6 text-[34px] leading-[1.12] font-semibold text-white sm:text-[52px] lg:text-[60px]"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.35, ease: EASE }}
            className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75 sm:text-[17px]"
          >
            {d.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.55, ease: EASE }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={waLink(d.whatsapp_message)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] px-7 py-3.5 text-[15px] font-semibold text-[var(--ink)] shadow-[0_16px_40px_-14px_rgba(185,150,63,0.9)] transition-transform duration-200 hover:scale-[1.03]"
            >
              {d.hero.cta_primary}
            </a>
            <Link
              to="/services"
              className="rounded-full border border-white/30 px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
            >
              {d.hero.cta_secondary}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/25 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
