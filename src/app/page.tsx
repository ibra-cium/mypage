import HeroSection from "@/components/hero/HeroSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import AboutSection from "@/components/about/AboutSection";
import GameSection from "@/components/game/GameSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24 pb-32">
        {/* Projects Section */}
        <section id="projects" className="relative scroll-mt-24">
          <ProjectsSection />
        </section>

        {/* About Section */}
        <section id="about" className="relative scroll-mt-24 -mx-6 md:-mx-12 lg:-mx-24">
          <AboutSection />
        </section>

        {/* Game/Spontaneous Section */}
        <section id="game" className="relative scroll-mt-24">
          <GameSection />
        </section>

        {/* Contact & AI Chat Section */}
        <ContactSection />
      </main>
    </div >
  );
}


