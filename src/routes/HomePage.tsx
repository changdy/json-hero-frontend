import { HomeHeader } from "../components/Home/HomeHeader";
import { HomeHeroSection } from "../components/Home/HomeHeroSection";
import { HomeFooter } from "../components/Home/HomeFooter";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HomeHeader fixed={true} />
      <HomeHeroSection />
      <HomeFooter />
    </div>
  );
}
