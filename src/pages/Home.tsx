import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import TrustStrip from '../sections/TrustStrip';
import ServicesPreview from '../sections/ServicesPreview';
import ParallaxGallery from '../sections/ParallaxGallery';
import ProcessPreview from '../sections/ProcessPreview';
import SupportCards from '../sections/SupportCards';
import PartnersMarquee from '../sections/PartnersMarquee';
import SiteFooter from '../sections/SiteFooter';
import FloatingUI from '../sections/FloatingUI';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <ServicesPreview />
        <ParallaxGallery />
        <ProcessPreview />
        <SupportCards />
        <PartnersMarquee />
      </main>
      <SiteFooter />
      <FloatingUI />
    </div>
  );
}
