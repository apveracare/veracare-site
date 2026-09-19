import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import SectionShell from '../components/SectionShell';
import { FadeUp } from '../components/Reveal';

export default function ProcessSection() {
  const { d } = useLocale();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.75', 'end 0.6'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <SectionShell dark>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-20">
        <ol ref={listRef} className="relative space-y-10 pl-14 sm:pl-16">
          <span className="absolute top-2 bottom-2 left-[22px] w-px overflow-hidden bg-white/10 sm:left-[26px]" aria-hidden="true">
            <motion.span
              style={{ scaleY: lineScale }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-[var(--cyan)] via-[var(--teal)] to-[var(--gold-light)]"
            />
          </span>

          {d.process.steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 0.8, 0.3, 1] }}
              className="relative"
            >
              <span className="absolute top-0 -left-14 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(94,213,219,0.3)] bg-[#0a3540] font-serif-display text-[14px] font-semibold text-[var(--cyan)] shadow-[0_0_0_6px_#072b34] sm:-left-16 sm:h-12 sm:w-12">
                {i + 1}
              </span>
              <div className="rounded-3xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[rgba(94,213,219,0.3)] hover:bg-white/[0.07] sm:p-7">
                <h3 className="font-serif-display text-[18px] font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{s.desc}</p>
                {s.points && (
                  <ul className="mt-3 space-y-1.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-[var(--cyan)]">
                        <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-[var(--cyan)]" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.li>
          ))}
        </ol>

        <FadeUp delay={0.1} className="mt-12">
          <div className="flex flex-col items-start gap-5 rounded-3xl border border-[rgba(228,205,143,0.25)] bg-[rgba(228,205,143,0.06)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <p className="max-w-xl text-[14px] leading-relaxed text-[var(--gold-light)]">{d.process.note}</p>
            <Link
              to="/contact"
              className="flex-shrink-0 rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] px-6 py-3 text-[14px] font-semibold text-[var(--ink)] transition-transform hover:scale-[1.03]"
            >
              {d.process.cta}
            </Link>
          </div>
        </FadeUp>

        <FadeUp className="mt-10 text-center">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-[14px] font-medium text-[var(--cyan)] hover:underline"
          >
            {d.services.heading}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeUp>
      </div>
    </SectionShell>
  );
}
