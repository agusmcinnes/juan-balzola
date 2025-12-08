import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import Tournaments from "@/components/sections/Tournaments";
import Gallery from "@/components/sections/Gallery";
import Sponsors from "@/components/sections/Sponsors";
import Project2026 from "@/components/sections/Project2026";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Tournaments />
        <Gallery />
        <Sponsors />
        <Project2026 />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
