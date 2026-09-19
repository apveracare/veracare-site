import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUp, Phone, Mail } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { waLink } from '../lib/site';

const WA_SVG = (
  <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.699 4.61 1.905 6.478L4 29l7.72-1.865A11.93 11.93 0 0 0 16.001 27C22.629 27 28 21.627 28 15S22.629 3 16.001 3Zm6.997 17.09c-.294.827-1.457 1.516-2.386 1.712-.634.132-1.462.238-4.248-.913-3.564-1.474-5.86-5.09-6.038-5.327-.177-.237-1.444-1.92-1.444-3.663 0-1.742.913-2.598 1.237-2.954.324-.355.708-.444.944-.444.236 0 .472.002.678.012.217.01.508-.082.795.607.294.708.998 2.45 1.086 2.628.089.177.148.385.03.622-.118.237-.177.385-.354.592-.177.207-.372.462-.531.62-.177.178-.361.37-.155.727.207.355.918 1.514 1.97 2.452 1.353 1.207 2.494 1.582 2.849 1.76.354.177.561.148.768-.09.207-.236.885-1.032 1.122-1.386.236-.355.472-.296.797-.178.324.118 2.06.972 2.414 1.148.354.178.59.266.678.414.089.148.089.857-.205 1.683Z" />
  </svg>
);

export default function FloatingUI() {
  const { d } = useLocale();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* scroll progress */}
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[var(--deep-teal)] via-[var(--cyan)] to-[var(--gold)]" />

      {/* floating contact stack */}
      <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-3">
        <a
          href={waLink(d.whatsapp_message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={d.nav.whatsapp}
          title={d.nav.whatsapp}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.8)] transition-transform hover:scale-105"
        >
          {WA_SVG}
        </a>
        <a
          href="tel:+60186868865"
          aria-label={d.contact.phone_label}
          title={d.contact.phone_label}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--deep-teal)] text-white shadow-[0_10px_30px_-8px_rgba(1,103,123,0.8)] transition-transform hover:scale-105"
        >
          <Phone className="h-6 w-6" strokeWidth={1.8} />
        </a>
        <a
          href="mailto:apveracare@gmail.com"
          aria-label={d.contact.email_label}
          title={d.contact.email_label}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--deep-blue)] text-white shadow-[0_10px_30px_-8px_rgba(20,82,159,0.8)] transition-transform hover:scale-105"
        >
          <Mail className="h-6 w-6" strokeWidth={1.8} />
        </a>
      </div>

      {/* back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={d.ui.back_to_top}
            title={d.ui.back_to_top}
            className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(1,103,123,0.2)] bg-white text-[var(--deep-teal)] shadow-lg transition-colors hover:bg-[var(--deep-teal)] hover:text-white"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
