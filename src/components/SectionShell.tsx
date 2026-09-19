import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/** Big rounded white "section card" framing, like the reference scroll video. */
export default function SectionShell({
  id,
  children,
  className = '',
  innerClassName = '',
  dark = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  dark?: boolean;
}) {
  return (
    <div className={`px-3 py-3 sm:px-5 sm:py-5 ${className}`}>
      <motion.section
        id={id}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -6% 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 0.8, 0.3, 1] }}
        className={`relative mx-auto w-full max-w-7xl scroll-mt-24 overflow-hidden rounded-[2rem] border sm:rounded-[2.75rem] ${
          dark
            ? 'border-[rgba(94,213,219,0.14)] bg-[#072b34]'
            : 'border-[rgba(1,103,123,0.09)] bg-white shadow-[0_30px_80px_-50px_rgba(1,40,50,0.35)]'
        } ${innerClassName}`}
      >
        {children}
      </motion.section>
    </div>
  );
}
