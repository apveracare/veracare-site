import Navbar from '../sections/Navbar';
import ContactSection from '../sections/ContactSection';
import SiteFooter from '../sections/SiteFooter';
import FloatingUI from '../sections/FloatingUI';
import PageHeader from '../components/PageHeader';
import { useLocale } from '../context/LocaleContext';

export default function ContactPage() {
  const { d } = useLocale();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <PageHeader eyebrow={d.nav.contact} title={d.contact.heading} sub={d.contact.sub} />
        <div className="pt-6">
          <ContactSection />
        </div>
      </main>
      <SiteFooter />
      <FloatingUI />
    </div>
  );
}
