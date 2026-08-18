import Header from "@/components/Header";
import Ambient from "@/components/Ambient";
import Preloader from "@/components/Preloader";
import Deck from "@/components/deck/Deck";
import SlideIntro from "@/components/deck/SlideIntro";
import SlidePillars from "@/components/deck/SlidePillars";
import SlideHow from "@/components/deck/SlideHow";
import SlideTool from "@/components/deck/SlideTool";
import SlideMethod from "@/components/deck/SlideMethod";
import SlideCloser from "@/components/deck/SlideCloser";

export default function Home() {
  return (
    <Preloader>
      <main id="conteudo" className="relative text-[var(--text)]">
        <Ambient />
        <Header />
        <Deck>
          <SlideIntro />
          <SlidePillars />
          <SlideHow />
          <SlideTool />
          <SlideMethod />
          <SlideCloser />
        </Deck>
      </main>
    </Preloader>
  );
}
