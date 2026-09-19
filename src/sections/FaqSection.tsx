import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Minus } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import SectionShell from '../components/SectionShell';
import { BlurWords, Eyebrow, FadeUp } from '../components/Reveal';
import { waLink } from '../lib/site';

export default function FaqSection() {
  const { d } = useLocale();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const norm = (s: string) => s.toLowerCase().normalize('NFKD');
  const needle = norm(query.trim());
  const list = useMemo(
    () =>
      d.faq.items
        .map((it, i) => ({ ...it, i }))
        .filter((it) => !needle || norm(it.q).includes(needle) || norm(it.a).includes(needle)),
    [d, needle]
  );

  const allOpen = list.length > 0 && list.every((it) => open.has(it.i));
  const toggleAll = () => {
    setOpen(allOpen ? new Set() : new Set(list.map((it) => it.i)));
  };
  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <SectionShell id="faq">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-20">
        <div className="text-center">
          <div className="flex justify-center">
            <Eyebrow>FAQ</Eyebrow>
          </div>
          <BlurWords
            text={d.faq.heading}
            className="font-serif-display mt-4 text-[30px] leading-tight font-semibold text-[var(--ink)] sm:text-[38px]"
          />
          <FadeUp delay={0.15}>
            <p className="mt-4 text-[15px] text-[rgba(7,43,52,0.62)]">{d.faq.sub}</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="mt-10 flex flex-wrap items-center gap-3">
          <div className="relative min-w-56 flex-1">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[rgba(7,43,52,0.35)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={d.ui.search_faq}
              className="w-full rounded-full border border-[rgba(1,103,123,0.2)] bg-white py-3 pr-4 pl-11 text-[14.5px] text-[var(--ink)] transition-colors outline-none placeholder:text-[rgba(7,43,52,0.4)] focus:border-[rgba(1,103,123,0.5)]"
            />
          </div>
          <button
            onClick={toggleAll}
            disabled={!list.length}
            className="rounded-full border border-[rgba(1,103,123,0.25)] px-5 py-3 text-[13.5px] font-medium text-[var(--deep-teal)] transition-colors hover:bg-[rgba(1,103,123,0.05)] disabled:opacity-40"
          >
            {allOpen ? d.ui.collapse_all : d.ui.expand_all}
          </button>
        </FadeUp>

        <div className="mt-8 border-t border-[rgba(1,103,123,0.1)]">
          <AnimatePresence initial={false}>
            {list.map((it, idx) => {
              const isOpen = open.has(it.i);
              return (
                <motion.div
                  key={it.i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="border-b border-[rgba(1,103,123,0.1)]"
                >
                  <button
                    onClick={() => toggle(it.i)}
                    className="flex w-full items-start justify-between gap-5 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-serif-display text-[16.5px] leading-snug transition-colors ${
                        isOpen ? 'text-[var(--deep-teal)]' : 'text-[var(--ink)] hover:text-[var(--deep-teal)]'
                      }`}
                    >
                      {it.q}
                    </span>
                    <span
                      className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? 'rotate-180 border-[var(--deep-teal)] bg-[var(--deep-teal)] text-white'
                          : 'border-[rgba(1,103,123,0.25)] text-[rgba(1,103,123,0.6)]'
                      }`}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 0.8, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pr-12 pb-6 text-[14.5px] leading-relaxed text-[rgba(7,43,52,0.65)]">{it.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {!list.length && (
            <p className="mt-10 rounded-3xl border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] p-8 text-center text-[14.5px] text-[rgba(7,43,52,0.55)]">
              {d.ui.no_results}
            </p>
          )}
        </div>

        <FadeUp className="mt-10">
          <div className="flex flex-col items-start gap-5 rounded-3xl border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] p-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif-display text-[17px] text-[var(--deep-teal)]">{d.faq.cta_text}</p>
            <a
              href={waLink(d.whatsapp_message)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 rounded-full bg-[var(--deep-teal)] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[var(--teal)]"
            >
              {d.faq.cta}
            </a>
          </div>
        </FadeUp>
      </div>
    </SectionShell>
  );
}
