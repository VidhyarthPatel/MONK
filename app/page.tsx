import CreativeFooter from "@/components/footer";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/MarqueeRow";
import Methodology from "@/components/Methodology";
import Navbar from "@/components/Navbar";
import Work from "@/components/Ourwork";
import Playground from "@/components/Playground";
import Services from "@/components/ServiceSection";
import LetsWork from "@/components/LetsWork";
import { NavColorProvider } from "@/context/NavColorContext";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <NavColorProvider>
      <SmoothScroll>
        <div>
          <Navbar />
          <HeroSection />

          <Work />

          <Marquee />

          <Services />

          <LetsWork />
          <Methodology />
          <Playground />
          <CreativeFooter />
        </div>
      </SmoothScroll>
    </NavColorProvider>
  );
}
