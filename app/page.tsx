import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ProductPreview from "@/components/ProductPreview";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import Ambient from "@/components/Ambient";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--text)]">
      <Ambient />
      <div className="relative z-10">
        <Header />
        <Hero />
        <HowItWorks />
        <ProductPreview />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
