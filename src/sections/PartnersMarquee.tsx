import { useLocale } from '../context/LocaleContext';
import SectionShell from '../components/SectionShell';
import { BlurWords, Eyebrow, FadeUp } from '../components/Reveal';
import { Landmark, FileCheck2, Stethoscope, Building2, Globe } from 'lucide-react';

const PARTNERS = [
  { Icon: Landmark, name: 'JTKSM', sub: 'Jabatan Tenaga Kerja Semenanjung Malaysia' },
  { Icon: FileCheck2, name: 'Imigresen Malaysia', sub: 'Immigration Department' },
  { Icon: Stethoscope, name: 'FOMEMA', sub: 'Medical Screening' },
  { Icon: Building2, name: 'SSM', sub: 'Companies Commission' },
  { Icon: Globe, name: 'MyEG', sub: 'e-Government Services' },
];

export default function PartnersMarquee() {
  const { d } = useLocale();

  return (
    <SectionShell>
      <div className="px-6 py-16 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Veracare</Eyebrow>
          </div>
          <BlurWords
            text={d.marquee.heading}
            className="font-serif-display mt-4 text-[28px] leading-tight font-semibold text-[var(--ink)] sm:text-[36px]"
          />
          <FadeUp delay={0.15}>
            <p className="mt-4 text-[15px] leading-relaxed text-[rgba(7,43,52,0.62)]">{d.marquee.sub}</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="marquee-mask mt-12 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-5 hover:[animation-play-state:paused]">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="flex w-72 flex-col items-center gap-3 rounded-3xl border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] px-8 py-8 text-center transition-colors duration-300 hover:border-[rgba(1,103,123,0.3)] hover:bg-[#edf7f7]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgba(94,213,219,0.25)] to-[rgba(1,103,123,0.1)] text-[var(--deep-teal)]">
                  <p.Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <p className="font-serif-display text-[18px] font-semibold text-[var(--deep-teal)]">{p.name}</p>
                <p className="text-[12px] leading-snug text-[rgba(7,43,52,0.5)]">{p.sub}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </SectionShell>
  );
}
