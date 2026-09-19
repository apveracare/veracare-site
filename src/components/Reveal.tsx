import { motion, type Variants } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';

const EASE = [0.22, 0.8, 0.3, 1] as const;

export function FadeUp({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, delay: i * 0.055, ease: EASE },
  }),
};

/** Blur-in, word-by-word headline reveal (like the reference scroll video). */
export function BlurWords({
  text,
  className,
  as: Tag = 'h2',
  stagger = 0.055,
  once = true,
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(' ');
  const MotionTag = motion[Tag];
  // Animate only on the very first mount ever. When the text changes (e.g.
  // language switch), remount instantly visible so words never get stuck
  // hidden — whileInView does not reliably re-fire for remounted subtrees.
  const mountedOnce = useRef(false);
  const isFirstMount = !mountedOnce.current;
  useEffect(() => {
    mountedOnce.current = true;
  }, []);
  return (
    <MotionTag
      key={text}
      className={className}
      initial={isFirstMount ? 'hidden' : false}
      whileInView="visible"
      viewport={{ once, margin: '0px 0px -8% 0px' }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block will-change-transform"
          style={{ marginRight: '0.28em' }}
          variants={wordVariants}
          custom={i}
          transition={{ duration: 0.55, delay: i * stagger, ease: EASE } as never}
        >
          {w}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/** Eyebrow row: gold rule + small caps label */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <FadeUp>
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-[var(--gold-light)]" />
        <span
          className="text-[13px] font-medium tracking-[0.14em] uppercase"
          style={{ color: light ? 'var(--gold-light)' : 'var(--gold)' }}
        >
          {children}
        </span>
      </div>
    </FadeUp>
  );
}
