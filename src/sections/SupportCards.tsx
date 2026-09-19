import { motion } from 'framer-motion';
import { Users, RefreshCcw, HeartHandshake, type LucideIcon } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import SectionShell from '../components/SectionShell';
import { BlurWords, Eyebrow, FadeUp } from '../components/Reveal';

const CARD_ICONS: { Icon: LucideIcon; accent: string }[] = [
  {
    Icon: Users,
    accent: 'from-[rgba(94,213,219,0.3)] to-[rgba(1,103,123,0.12)]',
  },
  {
    Icon: RefreshCcw,
    accent: 'from-[rgba(228,205,143,0.35)] to-[rgba(185,150,63,0.12)]',
  },
  {
    Icon: HeartHandshake,
    accent: 'from-[rgba(42,111,194,0.18)] to-[rgba(20,82,159,0.08)]',
  },
];

export default function SupportCards() {
  const { d } = useLocale();

  return (
    <SectionShell>
      <div className="px-6 py-16 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Veracare</Eyebrow>
          </div>
          <BlurWords
            text={d.support.heading}
            className="font-serif-display mt-4 text-[30px] leading-tight font-semibold text-[var(--ink)] sm:text-[40px]"
          />
          <FadeUp delay={0.15}>
            <p className="mt-4 text-[15px] leading-relaxed text-[rgba(7,43,52,0.65)] sm:text-[16px]">{d.support.sub}</p>
          </FadeUp>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {d.support.items.map((item, i) => {
            const { Icon, accent } = CARD_ICONS[i % CARD_ICONS.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.14, ease: [0.22, 0.8, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-[2rem] border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] p-8 transition-shadow duration-300 hover:shadow-[0_36px_80px_-40px_rgba(1,60,75,0.5)]"
              >
                <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${accent} blur-2xl transition-transform duration-500 group-hover:scale-150`} />

                <span className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-[var(--deep-teal)]`}>
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>

                <h3 className="font-serif-display relative mt-6 text-[19px] font-semibold text-[var(--deep-teal)]">{item.title}</h3>
                <p className="relative mt-3 text-[14.5px] leading-relaxed text-[rgba(7,43,52,0.62)]">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
