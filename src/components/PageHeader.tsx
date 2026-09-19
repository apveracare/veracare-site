import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { waLink } from '../lib/site';
import SectionShell from '../components/SectionShell';
import { BlurWords, Eyebrow, FadeUp } from '../components/Reveal';

export default function PageHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title?: string;
  sub: string;
}) {
  return (
    <div className="relative overflow-hidden bg-[#051a20]">
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: 'linear-gradient(120deg,#01677b 0%,#0b8a87 55%,#14529f 100%)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,26,32,0.6)] to-[#051a20]" />
      <div className="relative mx-auto max-w-4xl px-6 pt-40 pb-20 text-center sm:pt-44 sm:pb-24">
        <div className="flex justify-center">
          <Eyebrow light>{eyebrow}</Eyebrow>
        </div>
        {title && (
          <BlurWords
            as="h1"
            text={title}
            className="font-serif-display mt-5 text-[32px] leading-tight font-semibold text-white sm:text-[46px]"
          />
        )}
        <FadeUp delay={0.2}>
          {title ? (
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-[16px]">{sub}</p>
          ) : (
            <h1 className="font-serif-display mx-auto mt-4 max-w-2xl text-[26px] leading-snug font-semibold text-white italic sm:text-[32px]">
              {sub}
            </h1>
          )}
        </FadeUp>
        {/* decorative sparkles */}
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[var(--cyan)]"
            style={{ left: `${12 + i * 18}%`, top: `${28 + (i % 3) * 16}%` }}
            animate={{ opacity: [0.15, 0.8, 0.15], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: 3 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}
      </div>
    </div>
  );
}

export function BackToHomeLink({ label }: { label: string }) {
  return (
    <FadeUp>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full border border-[rgba(1,103,123,0.25)] px-5 py-2.5 text-[13.5px] font-medium text-[var(--deep-teal)] transition-colors hover:bg-[rgba(1,103,123,0.05)]"
      >
        <ArrowRight className="h-4 w-4 rotate-180" />
        {label}
      </Link>
    </FadeUp>
  );
}

export function NextPageLink({ to, label }: { to: string; label: string }) {
  return (
    <FadeUp>
      <Link
        to={to}
        className="group inline-flex items-center gap-2 rounded-full bg-[var(--deep-teal)] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[var(--teal)]"
      >
        {label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </FadeUp>
  );
}

export function PageCtaBand() {
  const { d } = useLocale();
  return (
    <SectionShell>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 0.8, 0.3, 1] }}
        className="flex flex-col items-center gap-6 px-6 py-14 text-center sm:px-12"
      >
        <BlurWords
          text={d.hero.headline}
          className="font-serif-display max-w-2xl text-[26px] leading-tight font-semibold text-[var(--ink)] sm:text-[34px]"
        />
        <FadeUp delay={0.15}>
          <a
            href={waLink(d.whatsapp_message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] px-8 py-4 text-[15px] font-semibold text-[var(--ink)] shadow-[0_16px_40px_-14px_rgba(185,150,63,0.9)] transition-transform hover:scale-[1.03]"
          >
            {d.hero.cta_primary}
          </a>
        </FadeUp>
      </motion.div>
    </SectionShell>
  );
}
