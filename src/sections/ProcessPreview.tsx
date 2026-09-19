import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  UserRoundSearch, ClipboardCheck, Stamp, PlaneTakeoff, Plane, HeartPulse,
  Home, ShieldCheck, MessagesSquare, ArrowRight, type LucideIcon,
} from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import SectionShell from '../components/SectionShell';
import { BlurWords, Eyebrow, FadeUp } from '../components/Reveal';

const STEP_ICONS: LucideIcon[] = [
  UserRoundSearch, ClipboardCheck, Stamp, PlaneTakeoff, Plane, HeartPulse, Home, ShieldCheck,
];

export default function ProcessPreview() {
  const { d } = useLocale();
  const steps = d.process.steps.slice(0, 4);

  return (
    <SectionShell dark>
      <div className="px-6 py-16 sm:px-12 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow light>{d.process_preview.heading}</Eyebrow>
            <BlurWords
              text={d.process_preview.heading}
              className="font-serif-display mt-4 text-[30px] leading-tight font-semibold text-white sm:text-[40px]"
            />
            <FadeUp delay={0.15}>
              <p className="mt-4 text-[15px] leading-relaxed text-white/60 sm:text-[16px]">{d.process_preview.sub}</p>
            </FadeUp>
          </div>
          <FadeUp delay={0.25}>
            <Link
              to="/process"
              className="group inline-flex items-center gap-2 rounded-full border border-[rgba(94,213,219,0.35)] px-6 py-3 text-[14px] font-medium text-[var(--cyan)] transition-colors hover:bg-white/10"
            >
              {d.process_preview.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length];
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -6% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 0.8, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="relative rounded-3xl border border-white/8 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-[rgba(94,213,219,0.3)] hover:bg-white/[0.07]"
              >
                <span className="font-serif-display absolute top-6 right-6 text-[13px] text-white/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgba(94,213,219,0.2)] to-[rgba(1,103,123,0.15)] text-[var(--cyan)]">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif-display mt-5 text-[17px] leading-snug font-semibold text-white">{s.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/55">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <FadeUp delay={0.2} className="mt-10 flex items-center gap-3 text-white/40">
          <MessagesSquare className="h-4 w-4" />
          <p className="text-[13px]">{d.process.note}</p>
        </FadeUp>
      </div>
    </SectionShell>
  );
}
