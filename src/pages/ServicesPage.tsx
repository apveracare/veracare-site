import Navbar from '../sections/Navbar';
import ServicesSection from '../sections/ServicesSection';
import SiteFooter from '../sections/SiteFooter';
import FloatingUI from '../sections/FloatingUI';
import PageHeader from '../components/PageHeader';
import { useLocale } from '../context/LocaleContext';

export default function ServicesPage() {
  const { d } = useLocale();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <PageHeader eyebrow={d.nav.services} title={d.services.heading} sub={d.services.sub} />
        <div className="pt-6">
          <ServicesSection />
        </div>
      </main>
      <SiteFooter />
      <FloatingUI />
    </div>
  );
}
