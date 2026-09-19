import { useState } from 'react';
import { ShieldCheck, Building2, X } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import SectionShell from '../components/SectionShell';
import { BlurWords, Eyebrow, FadeUp } from '../components/Reveal';
import type { RichSegment } from '../lib/site';
import careOffice from '../assets/care-office.jpg';
import careStreet from '../assets/care-street.jpg';
import licenseImg from '../assets/license-watermarked.jpg';

const P = 'text-[15.5px] leading-relaxed text-[rgba(7,43,52,0.75)]';

function Rich({ segs, className = P }: { segs: RichSegment[]; className?: string }) {
  return (
    <p className={className}>
      {segs.map((s, i) =>
        s.b ? (
          <strong key={i} className="font-semibold text-[var(--deep-teal)]">
            {s.t}
          </strong>
        ) : (
          <span key={i}>{s.t}</span>
        )
      )}
    </p>
  );
}

export default function AboutSection() {
  const { d } = useLocale();
  const [licenseOpen, setLicenseOpen] = useState(false);
  const [intro, ...restOfStory] = d.about.story;

  return (
    <SectionShell id="about">
      <div className="px-6 py-16 sm:px-12 sm:py-20">
        {/* header — centered like every other section */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Eyebrow>{d.nav.about}</Eyebrow>
          </div>
          <BlurWords
            text={d.about.heading}
            className="font-serif-display mt-4 text-[32px] leading-tight font-semibold text-[var(--ink)] sm:text-[42px]"
          />
          <FadeUp delay={0.15}>
            <p className="font-serif-display mt-3 text-[20px] font-medium text-[var(--gold)] italic sm:text-[23px]">
              {d.about.tagline}
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <Rich segs={intro} className={`mt-8 text-left ${P}`} />
          </FadeUp>
        </div>

        {/* photos */}
        <FadeUp className="mx-auto mt-10 max-w-4xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_40px_90px_-45px_rgba(1,40,50,0.6)]">
              <img src={careOffice} alt={d.about.heading} className="h-64 w-full object-cover" loading="lazy" />
            </div>
            <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_40px_90px_-45px_rgba(1,40,50,0.6)]">
              <img src={careStreet} alt="Pulau Tikus, Penang" className="h-64 w-full object-cover" loading="lazy" />
            </div>
          </div>
        </FadeUp>

        {/* story */}
        <div className="mx-auto mt-8 max-w-3xl">
          {restOfStory.map((p, i) => (
            <FadeUp key={i} delay={0.06}>
              <Rich segs={p} className={`mt-5 ${P}`} />
            </FadeUp>
          ))}
        </div>

        {/* mid heading + body */}
        <div className="mx-auto mt-14 max-w-3xl">
          <FadeUp>
            <h2 className="font-serif-display text-[26px] leading-snug font-semibold text-[var(--deep-teal)] sm:text-[30px]">
              {d.about.mid_heading}
            </h2>
            <span className="mt-4 block h-px w-16 bg-[var(--gold)]" />
          </FadeUp>
          {d.about.body.map((p, i) => (
            <FadeUp key={i} delay={0.06}>
              <Rich segs={p} className={`mt-5 ${P}`} />
            </FadeUp>
          ))}
          <FadeUp delay={0.1}>
            <Rich
              segs={d.about.closing}
              className="font-serif-display mt-8 text-[18px] leading-relaxed font-medium text-[var(--deep-teal)] italic sm:text-[20px]"
            />
          </FadeUp>
        </div>

        {/* signoff */}
        <FadeUp className="mt-16">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[rgba(228,205,143,0.35)] bg-gradient-to-br from-[rgba(228,205,143,0.1)] to-[rgba(1,103,123,0.05)] px-8 py-10 text-center">
            <p className="font-serif-display text-[22px] font-semibold text-[var(--deep-teal)] sm:text-[26px]">
              Veracare
            </p>
            <p className="font-serif-display mt-1 text-[16px] text-[var(--gold)] italic sm:text-[18px]">
              {d.about.signoff}
            </p>
            <p className="mt-4 text-[13px] font-medium tracking-[0.14em] text-[rgba(7,43,52,0.55)] uppercase">
              {d.about.signoff_line}
            </p>
          </div>
        </FadeUp>

        {/* registration & licensing */}
        <FadeUp className="mt-16">
          <div className="mx-auto max-w-3xl">
            <h3 className="font-serif-display text-[20px] font-semibold text-[var(--deep-teal)]">
              {d.about.license_heading}
            </h3>
            <div className="mt-4 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] px-5 py-4">
                <ShieldCheck className="h-6 w-6 flex-shrink-0 text-[var(--teal)]" strokeWidth={1.6} />
                <div>
                  <p className="text-[11px] text-[rgba(7,43,52,0.5)]">{d.trust.jtksm_label}</p>
                  <p className="text-[13.5px] font-semibold text-[var(--deep-teal)]">{d.trust.jtksm_value}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] px-5 py-4">
                <Building2 className="h-6 w-6 flex-shrink-0 text-[var(--teal)]" strokeWidth={1.6} />
                <div>
                  <p className="text-[11px] text-[rgba(7,43,52,0.5)]">{d.trust.ssm_label}</p>
                  <p className="text-[13.5px] font-semibold text-[var(--deep-teal)]">{d.trust.ssm_value}</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLicenseOpen(true)}
              className="group mt-4 flex max-w-md items-center gap-4 rounded-2xl border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] p-3 pr-5 text-left transition-colors hover:border-[rgba(1,103,123,0.3)]"
            >
              <img
                src={licenseImg}
                alt={d.about.license_alt}
                className="h-20 w-14 flex-shrink-0 rounded-lg object-cover object-top shadow-sm"
                loading="lazy"
              />
              <div>
                <p className="text-[13.5px] font-semibold text-[var(--deep-teal)] group-hover:underline">
                  {d.about.license_view}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-[rgba(7,43,52,0.55)]">
                  JTKSM 1837 (Category B)
                </p>
              </div>
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 rounded-full bg-[var(--deep-teal)] px-7 py-3.5 text-[14.5px] font-medium text-white transition-colors hover:bg-[var(--teal)]"
            >
              {d.about.cta}
            </button>
          </div>
        </FadeUp>
      </div>

      {licenseOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,25,31,0.82)] p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={d.about.license_alt}
          onClick={() => setLicenseOpen(false)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={() => setLicenseOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={licenseImg}
            alt={d.about.license_alt}
            className="max-h-[88vh] w-auto max-w-full rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </SectionShell>
  );
}
