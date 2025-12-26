import HeroSection from "@/components/HeroSection";
import ClientMarquee from "@/components/MarqueeRow";
import Methodology from "@/components/Methodology";
import Navbar from "@/components/Navbar";
import ParallaxGallery from "@/components/Ourwork";
import Playground from "@/components/Playground";
import ServicesSection from "@/components/ServiceSection";
import WorkExpansion from "@/components/WorkExpansion";


export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection/>
      <ParallaxGallery />
      <ClientMarquee />
      <ServicesSection/>
      <WorkExpansion />
      <Methodology/>
      <Playground/>
    </div>
  );
}
