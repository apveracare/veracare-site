import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocale } from '../context/LocaleContext';
import { BlurWords } from '../components/Reveal';
import myKitchen from '../assets/my-kitchen.jpg';
import myDining from '../assets/my-dining.jpg';
import myGarden from '../assets/my-garden.jpg';
import myFamily from '../assets/my-family.jpg';
import myFlowers from '../assets/my-flowers.jpg';
import myKampung from '../assets/my-kampung.jpg';

const LEFT = [myKitchen, myGarden, myFlowers];
const RIGHT = [myFamily, myDining, myKampung];

function FloatPhoto({ src, alt, delay, className }: { src: string; alt: string; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.8, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay }}
        className={`overflow-hidden rounded-3xl border-4 border-white shadow-[0_24px_60px_-28px_rgba(1,40,50,0.55)] ${className ?? ''}`}
      >
        <img src={src} alt={alt} className="h-40 w-full object-cover sm:h-48" loading="lazy" />
      </motion.div>
    </motion.div>
  );
}

export default function ParallaxGallery() {
  const { d } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yLeft = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const yRight = useTransform(scrollYProgress, [0, 1], [110, -40]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-[var(--paper-dim)] py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-5 md:grid-cols-[1fr_1.35fr_1fr] md:gap-6 lg:gap-8">
        {/* left photo column — parallax + float */}
        <motion.div style={{ y: yLeft }} className="order-2 hidden flex-col gap-5 md:order-1 md:flex">
          {LEFT.map((src, i) => (
            <FloatPhoto key={src} src={src} alt="" delay={i * 0.5} />
          ))}
        </motion.div>
        {/* mobile: compact 3-up row */}
        <div className="order-1 grid grid-cols-3 gap-3 md:hidden">
          {[myKitchen, myFamily, myKampung].map((src, i) => (
            <FloatPhoto key={src} src={src} alt="" delay={i * 0.3} />
          ))}
        </div>

        {/* centre quote */}
        <div className="order-1 flex flex-col items-center px-2 text-center md:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 0.8, 0.3, 1] }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(1,103,123,0.12)] bg-white shadow-[0_14px_40px_-18px_rgba(1,60,75,0.4)]"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-[var(--teal)]" fill="currentColor">
              <path d="M12 21s-7.5-4.9-9.7-9.2C.7 8.6 2.6 5 6.1 5c2 0 3.5 1.1 4.2 2.4l1.7 2.6 1.7-2.6C14.4 6.1 15.9 5 17.9 5c3.5 0 5.4 3.6 3.8 6.8C19.5 16.1 12 21 12 21z" />
            </svg>
          </motion.div>

          <BlurWords
            as="p"
            text={`“${d.parallax.quote}”`}
            stagger={0.05}
            className="font-serif-display mt-8 text-[24px] leading-snug font-medium text-[var(--ink)] sm:text-[30px]"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 text-[13px] font-medium tracking-[0.16em] text-[var(--gold)] uppercase"
          >
            {d.parallax.by}
          </motion.p>
        </div>

        {/* right photo column — parallax + float */}
        <motion.div style={{ y: yRight }} className="order-3 hidden flex-col gap-5 md:flex">
          {RIGHT.map((src, i) => (
            <FloatPhoto key={src} src={src} alt="" delay={0.25 + i * 0.5} />
          ))}
        </motion.div>
        {/* mobile: second 3-up row */}
        <div className="order-3 grid grid-cols-3 gap-3 md:hidden">
          {[myDining, myGarden, myFlowers].map((src, i) => (
            <FloatPhoto key={src} src={src} alt="" delay={0.2 + i * 0.3} />
          ))}
        </div>
      </div>
    </div>
  );
}
