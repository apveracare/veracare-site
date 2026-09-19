import Navbar from '../sections/Navbar';
import FaqSection from '../sections/FaqSection';
import SiteFooter from '../sections/SiteFooter';
import FloatingUI from '../sections/FloatingUI';
import PageHeader from '../components/PageHeader';
import { useLocale } from '../context/LocaleContext';

export default function FaqPage() {
  const { d } = useLocale();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <PageHeader eyebrow="FAQ" title={d.faq.heading} sub={d.faq.sub} />
        <div className="pt-6">
          <FaqSection />
        </div>
      </main>
      <SiteFooter />
      <FloatingUI />
    </div>
  );
}
