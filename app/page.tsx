import CreativeFooter from "@/components/footer";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/MarqueeRow";
import Methodology from "@/components/Methodology";
import Navbar from "@/components/Navbar";
import Work from "@/components/Ourwork";
import Playground from "@/components/Playground";
import Services from "@/components/ServiceSection";
import LetsWork from "@/components/WorkExpansion";
import { NavColorProvider } from "@/context/NavColorContext";
import SectionTracker from "@/components/SectionTracker";
import SmoothScroll from "@/components/SmoothScroll";


export default function Home() {
  return (
    <NavColorProvider>
      <SmoothScroll>
        <div className="min-h-screen">
          <Navbar />

          <SectionTracker color="black">
            <HeroSection />
          </SectionTracker>

          <SectionTracker color="black">
            <Work />
          </SectionTracker>

          <SectionTracker color="black">
            <Marquee />
          </SectionTracker>

          <SectionTracker color="black">
            <Services />
          </SectionTracker>

          <LetsWork />

          <SectionTracker color="black">
            <Methodology />
          </SectionTracker>

          <SectionTracker color="black">
            <Playground />
          </SectionTracker>

          <SectionTracker color="white">
            <CreativeFooter />
          </SectionTracker>
        </div>
      </SmoothScroll>
    </NavColorProvider>
  );
}
