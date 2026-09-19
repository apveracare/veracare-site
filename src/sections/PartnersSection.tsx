import { motion } from 'framer-motion';
import { useLocale } from '../context/LocaleContext';
import SectionShell from '../components/SectionShell';
import { BlurWords, Eyebrow, FadeUp } from '../components/Reveal';
import immigrationLogo from '../assets/Department_of_Immigration_Malaysia.webp';
import labourLogo from '../assets/Department_of_Labour_Malaysia_edited.webp';
import philippinesLogo from '../assets/Embassy_of_the_Republic_of_the_Philippines.webp';
import ksmLogo from '../assets/Ministry_of_Resources_Malaysia.webp';

const LOGOS = [immigrationLogo, labourLogo, philippinesLogo, ksmLogo];

export default function PartnersSection() {
  const { d } = useLocale();
  const partners = d.about.partners;

  return (
    <SectionShell>
      <div className="px-6 py-16 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Veracare</Eyebrow>
          </div>
          <BlurWords
            text={d.about.partners_heading}
            className="font-serif-display mt-4 text-[30px] leading-tight font-semibold text-[var(--ink)] sm:text-[38px]"
          />
          <FadeUp delay={0.15}>
            <p className="mt-4 text-[15px] leading-relaxed text-[rgba(7,43,52,0.65)] sm:text-[16px]">
              {d.about.partners_sub}
            </p>
          </FadeUp>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-5 lg:grid-cols-4">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -6% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 0.8, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center gap-4 rounded-3xl border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] px-6 py-8 text-center transition-shadow duration-300 hover:shadow-[0_28px_60px_-35px_rgba(1,60,75,0.45)]"
            >
              <span className="flex h-24 w-24 items-center justify-center">
                <img
                  src={LOGOS[i % LOGOS.length]}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </span>
              <p className="text-[13px] leading-snug font-medium text-[rgba(7,43,52,0.72)]">{p.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
