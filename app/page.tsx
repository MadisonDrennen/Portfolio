import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import About from "@/components/sections/About";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Redesigns from "@/components/sections/Redesigns";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MarqueeStrip />
        <Redesigns />
        <FeaturedWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
