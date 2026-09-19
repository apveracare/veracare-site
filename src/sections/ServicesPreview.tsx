import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  FilePlus2, RotateCcw, Landmark, MessagesSquare, Plane, Stethoscope, ArrowRight, type LucideIcon,
} from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import SectionShell from '../components/SectionShell';
import { BlurWords, Eyebrow, FadeUp } from '../components/Reveal';

const PREVIEW_ICONS: LucideIcon[] = [FilePlus2, RotateCcw, Landmark, MessagesSquare, Plane, Stethoscope];

export default function ServicesPreview() {
  const { d } = useLocale();
  const items = d.services.items.slice(0, 6);

  return (
    <SectionShell>
      <div className="px-6 py-16 sm:px-12 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Veracare</Eyebrow>
            <BlurWords
              text={d.services_preview.heading}
              className="font-serif-display mt-4 text-[30px] leading-tight font-semibold text-[var(--ink)] sm:text-[40px]"
            />
            <FadeUp delay={0.15}>
              <p className="mt-4 text-[15px] leading-relaxed text-[rgba(7,43,52,0.65)] sm:text-[16px]">
                {d.services_preview.sub}
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.25}>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--deep-teal)] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[var(--teal)]"
            >
              {d.services_preview.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => {
            const Icon = PREVIEW_ICONS[i % PREVIEW_ICONS.length];
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -6% 0px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.06, ease: [0.22, 0.8, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] p-7 transition-colors duration-300 hover:border-[rgba(1,103,123,0.28)] hover:bg-[#edf7f7] hover:shadow-[0_24px_50px_-24px_rgba(1,60,75,0.45)]"
              >
                <span className="font-serif-display absolute top-6 right-7 text-[13px] text-[rgba(1,103,123,0.35)]">
                  {String(i + 1).padStart(2, '0')}
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
      </div>
    </SectionShell>
  );
}
