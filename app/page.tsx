import Header from "@/components/Header";
import Ambient from "@/components/Ambient";
import Preloader from "@/components/Preloader";
import JsonLd from "@/components/JsonLd";
import Deck from "@/components/deck/Deck";
import SlideIntro from "@/components/deck/SlideIntro";
import SlidePillars from "@/components/deck/SlidePillars";
import SlideHow from "@/components/deck/SlideHow";
import SlideTool from "@/components/deck/SlideTool";
import SlideScenario from "@/components/deck/SlideScenario";
import SlideMethod from "@/components/deck/SlideMethod";
import SlidePlans from "@/components/deck/SlidePlans";
import SlideCloser from "@/components/deck/SlideCloser";
import { homeJsonLd } from "@/lib/json-ld";

export default function Home() {
  return (
    <Preloader>
      <JsonLd data={homeJsonLd()} />
      <main id="conteudo" className="relative text-[var(--text)]">
        <Ambient />
        <Header />
        <Deck>
          <SlideIntro />
          <SlidePillars />
          <SlideHow />
          <SlideTool />
          <SlideScenario />
          <SlideMethod />
          <SlidePlans />
          <SlideCloser />
        </Deck>
      </main>
    </Preloader>
  );
}
