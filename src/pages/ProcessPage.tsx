import Navbar from '../sections/Navbar';
import ProcessSection from '../sections/ProcessSection';
import SiteFooter from '../sections/SiteFooter';
import FloatingUI from '../sections/FloatingUI';
import PageHeader from '../components/PageHeader';
import { useLocale } from '../context/LocaleContext';

export default function ProcessPage() {
  const { d } = useLocale();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <PageHeader eyebrow={d.nav.process} title={d.process.heading} sub={d.process.sub} />
        <div className="pt-6">
          <ProcessSection />
        </div>
      </main>
      <SiteFooter />
      <FloatingUI />
    </div>
  );
}
