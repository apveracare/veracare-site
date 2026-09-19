import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import {
  FilePlus2, RotateCcw, Landmark, MessagesSquare, Plane, Stethoscope,
  RefreshCw, HeartHandshake, PlaneTakeoff, ArrowLeftRight, SprayCan, Sparkles, type LucideIcon,
} from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { waLink } from '../lib/site';
import { FadeUp } from '../components/Reveal';

const SERVICE_ICONS: LucideIcon[] = [
  FilePlus2, RotateCcw, Landmark, MessagesSquare, Plane,
  Stethoscope, RefreshCw, HeartHandshake, PlaneTakeoff, ArrowLeftRight,
  SprayCan, Sparkles,
];

export default function ServicesSection() {
  const { d } = useLocale();
  const [query, setQuery] = useState('');

  const norm = (s: string) => s.toLowerCase().normalize('NFKD');
  const needle = norm(query.trim());
  const all = d.services.items;
  const list = needle ? all.filter((s) => norm(s.title).includes(needle) || norm(s.desc).includes(needle)) : all;

  return (
    <div className="mx-auto max-w-7xl px-3 py-3 sm:px-5 sm:py-5">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 0.8, 0.3, 1] }}
        className="relative mx-auto w-full overflow-hidden rounded-[2rem] border border-[rgba(1,103,123,0.09)] bg-white shadow-[0_30px_80px_-50px_rgba(1,40,50,0.35)] sm:rounded-[2.75rem]"
      >
        <div className="px-6 py-14 sm:px-12 sm:py-16">
          <FadeUp className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-56 max-w-md flex-1">
              <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[rgba(7,43,52,0.35)]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={d.ui.filter_services}
                className="w-full rounded-full border border-[rgba(1,103,123,0.2)] bg-[var(--paper)] py-3 pr-4 pl-11 text-[14.5px] text-[var(--ink)] transition-colors outline-none placeholder:text-[rgba(7,43,52,0.4)] focus:border-[rgba(1,103,123,0.5)]"
              />
            </div>
            <p className="text-[13.5px] text-[rgba(7,43,52,0.5)]">
              {d.ui.showing.replace('{n}', String(list.length)).replace('{total}', String(all.length))}
            </p>
          </FadeUp>

          {list.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((s, i) => {
                const Icon = SERVICE_ICONS[all.indexOf(s) % SERVICE_ICONS.length];
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '0px 0px -6% 0px' }}
                    transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 0.8, 0.3, 1] }}
                    whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-3xl border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] p-7 transition-colors duration-300 hover:border-[rgba(1,103,123,0.28)] hover:bg-[#edf7f7] hover:shadow-[0_24px_50px_-24px_rgba(1,60,75,0.45)]"
                  >
                    <span className="font-serif-display absolute top-6 right-7 text-[13px] text-[rgba(1,103,123,0.35)]">
                      {String(all.indexOf(s) + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgba(94,213,219,0.25)] to-[rgba(1,103,123,0.1)] text-[var(--deep-teal)] transition-colors duration-300 group-hover:from-[rgba(94,213,219,0.45)] group-hover:to-[rgba(1,103,123,0.2)] group-hover:text-[var(--teal)]">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <h3 className="font-serif-display mt-5 text-[17px] leading-snug font-semibold text-[var(--deep-teal)]">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-[rgba(7,43,52,0.62)]">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="mt-10 rounded-3xl border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] p-8 text-center text-[14.5px] text-[rgba(7,43,52,0.55)]">
              {d.ui.no_results}
            </p>
          )}

          <FadeUp className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href={waLink(d.whatsapp_message)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--deep-teal)] px-7 py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[var(--teal)]"
            >
              {d.hero.cta_primary}
            </a>
            <Link
              to="/process"
              className="group inline-flex items-center gap-2 rounded-full border border-[rgba(1,103,123,0.25)] px-7 py-3.5 text-[14.5px] font-medium text-[var(--deep-teal)] transition-colors hover:bg-[rgba(1,103,123,0.05)]"
            >
              {d.process_preview.heading}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>
      </motion.section>
    </div>
  );
}

