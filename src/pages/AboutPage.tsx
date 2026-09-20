import Navbar from '../sections/Navbar';
import AboutSection from '../sections/AboutSection';
import PartnersSection from '../sections/PartnersSection';
import SiteFooter from '../sections/SiteFooter';
import FloatingUI from '../sections/FloatingUI';
import PageHeader from '../components/PageHeader';
import { useLocale } from '../context/LocaleContext';

export default function AboutPage() {
  const { d } = useLocale();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <PageHeader eyebrow={d.nav.about} title={d.about.story_heading} sub={d.about.tagline} />
        <div className="pt-6">
          <AboutSection />
        </div>
        <PartnersSection />
      </main>
      <SiteFooter />
      <FloatingUI />
    </div>
  );
}
