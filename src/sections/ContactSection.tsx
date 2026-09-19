import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import SectionShell from '../components/SectionShell';
import { BlurWords, Eyebrow, FadeUp } from '../components/Reveal';
import { ADDRESS_LINES, EMAIL, PHONE_DISPLAY, waLink } from '../lib/site';

export default function ContactSection() {
  const { d } = useLocale();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [msg, setMsg] = useState('');

  const composed = [
    name.trim() ? `Hi Veracare, this is ${name.trim()}.` : 'Hi Veracare,',
    topic ? `I'm enquiring about: ${topic}.` : '',
    msg.trim(),
    !topic && !msg.trim() ? d.whatsapp_message : '',
  ]
    .filter(Boolean)
    .join('\n');

  const info = [
    { Icon: MapPin, label: d.contact.address_label, value: ADDRESS_LINES, href: undefined as string | undefined },
    { Icon: Phone, label: d.contact.phone_label, value: [PHONE_DISPLAY], href: 'tel:+60186868865' },
    { Icon: Mail, label: d.contact.email_label, value: [EMAIL], href: `mailto:${EMAIL}` },
    { Icon: Clock, label: d.contact.hours_label, value: [d.contact.hours_value], href: undefined },
  ];

  const inputCls =
    'w-full rounded-xl border border-[rgba(1,103,123,0.2)] bg-white px-4 py-3 text-[14.5px] text-[var(--ink)] transition-colors outline-none placeholder:text-[rgba(7,43,52,0.4)] focus:border-[rgba(1,103,123,0.5)]';

  return (
    <SectionShell id="contact">
      <div className="px-6 py-16 sm:px-12 sm:py-20">
        <div className="max-w-2xl">
          <Eyebrow>{d.nav.contact}</Eyebrow>
          <BlurWords
            text={d.contact.heading}
            className="font-serif-display mt-4 text-[30px] leading-tight font-semibold text-[var(--ink)] sm:text-[40px]"
          />
          <FadeUp delay={0.15}>
            <p className="mt-4 text-[15px] leading-relaxed text-[rgba(7,43,52,0.65)]">{d.contact.sub}</p>
          </FadeUp>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* info + map */}
          <div className="flex flex-col gap-4">
            {info.map(({ Icon, label, value, href }, i) => (
              <FadeUp key={label} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-3xl border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] p-5">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[rgba(94,213,219,0.25)] to-[rgba(1,103,123,0.1)] text-[var(--deep-teal)]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.12em] text-[rgba(7,43,52,0.45)] uppercase">{label}</p>
                    {value.map((v) =>
                      href ? (
                        <a key={v} href={href} className="font-serif-display mt-1 block text-[15.5px] font-semibold text-[var(--deep-blue)] hover:underline">
                          {v}
                        </a>
                      ) : (
                        <p key={v} className="mt-1 text-[14px] leading-relaxed text-[rgba(7,43,52,0.75)]">
                          {v}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}

            <FadeUp delay={0.35} className="overflow-hidden rounded-3xl border border-[rgba(1,103,123,0.15)]">
              <iframe
                loading="lazy"
                title={d.contact.map_heading}
                src={`https://maps.google.com/maps?q=${encodeURIComponent('441-2-4 Pulau Tikus Plaza, Jalan Burma, Pulau Tikus, 10350 Georgetown, Pulau Pinang')}&z=16&output=embed`}
                className="h-64 w-full border-0"
              />
            </FadeUp>
          </div>

          {/* enquiry builder */}
          <FadeUp delay={0.15}>
            <div className="rounded-[2rem] border border-[rgba(1,103,123,0.12)] bg-white p-7 shadow-[0_30px_70px_-45px_rgba(1,60,75,0.5)] sm:p-9">
              <h3 className="font-serif-display text-[21px] font-semibold text-[var(--deep-teal)]">{d.enquiry.heading}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[rgba(7,43,52,0.6)]">{d.enquiry.sub}</p>

              <label className="mt-6 block text-[12px] font-medium text-[rgba(7,43,52,0.55)]">{d.enquiry.name}</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={d.enquiry.name_ph} className={`${inputCls} mt-1.5`} />

              <label className="mt-5 block text-[12px] font-medium text-[rgba(7,43,52,0.55)]">{d.enquiry.topic}</label>
              <select value={topic} onChange={(e) => setTopic(e.target.value)} className={`${inputCls} mt-1.5`}>
                <option value="">{d.enquiry.topic_ph}</option>
                {d.services.items.map((s) => (
                  <option key={s.title} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>

              <label className="mt-5 block text-[12px] font-medium text-[rgba(7,43,52,0.55)]">{d.enquiry.message}</label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={d.enquiry.message_ph}
                rows={4}
                className={`${inputCls} mt-1.5 resize-y`}
              />

              <div className="mt-6 rounded-2xl border border-[rgba(1,103,123,0.1)] bg-[var(--paper)] p-4">
                <p className="text-[11px] font-medium tracking-[0.1em] text-[rgba(7,43,52,0.45)] uppercase">{d.enquiry.preview}</p>
                <p className="mt-2 whitespace-pre-line text-[13.5px] leading-relaxed text-[rgba(7,43,52,0.7)]">{composed}</p>
              </div>

              <a
                href={waLink(composed)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_36px_-14px_rgba(37,211,102,0.9)] transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-5 w-5" />
                {d.enquiry.send}
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </SectionShell>
  );
}
