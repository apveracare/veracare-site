import { motion } from 'framer-motion';
import { ShieldCheck, Building2, MapPin } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { ADDRESS_LINES } from '../lib/site';

export default function TrustStrip() {
  const { d } = useLocale();
  const items = [
    { Icon: ShieldCheck, label: d.trust.jtksm_label, value: d.trust.jtksm_value },
    { Icon: Building2, label: d.trust.ssm_label, value: d.trust.ssm_value },
    { Icon: MapPin, label: d.trust.address_label, value: ADDRESS_LINES.join(' ') },
  ];

  return (
    <div className="relative z-10 mx-auto -mt-14 w-full max-w-5xl px-5 sm:-mt-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.8, 0.3, 1] }}
        className="grid grid-cols-1 divide-y divide-[rgba(1,103,123,0.1)] rounded-3xl border border-[rgba(1,103,123,0.1)] bg-white/95 p-2 shadow-[0_30px_70px_-30px_rgba(1,40,50,0.45)] backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      >
        {items.map(({ Icon, label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
            className="flex items-start gap-4 px-6 py-5"
          >
            <span className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[rgba(94,213,219,0.25)] to-[rgba(1,103,123,0.12)] text-[var(--deep-teal)]">
              <Icon className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <div>
              <p className="text-[11px] font-medium tracking-[0.12em] text-[rgba(7,43,52,0.45)] uppercase">{label}</p>
              <p className="font-serif-display mt-1 text-[15px] leading-snug font-semibold text-[var(--deep-teal)]">{value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
