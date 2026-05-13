import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectSection from './components/ProjectSection';
import LabSection from './components/LabSection';
import ContactTerminal from './components/ContactTerminal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-accent selection:text-charcoal bg-charcoal">
      <div className="grain" />
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Project 1: Asymmetric Left */}
        <ProjectSection 
          id="project-1"
          layout="asymmetric-left"
          title="SYNTHETIC VOID"
          description="A generative audio-visual landscape built with WebGL and Tone.js."
          tech={['WebGL', 'Tone.js', 'React']}
          video="/project1.mp4"
          accent="text-accent"
        />

        {/* Project 2: Morphing Mask */}
        <ProjectSection 
          id="project-2"
          layout="morphing-mask"
          title="KINETIC DATA"
          description="Interactive data visualization for global climate anomalies."
          tech={['D3.js', 'Shader Particles', 'GSAP']}
          video="/project2.mp4"
          accent="text-offwhite"
        />

        {/* Project 3: Knockout Text */}
        <ProjectSection 
          id="project-3"
          layout="knockout"
          title="BRUTAL ARCHIVE"
          description="A digital library exploring 20th century structuralism."
          tech={['Next.js', 'PostgreSQL', 'Three.js']}
          video="/project3.mp4"
          accent="text-white"
        />

        {/* Project 4: Diagonal Split */}
        <ProjectSection 
          id="project-4"
          layout="diagonal-split"
          title="TENSION"
          description="Physics-based interaction design exploration."
          tech={['Matter.js', 'Canvas API', 'React']}
          video="/project4.mp4"
          video2="/project4-alt.mp4"
          accent="text-accent"
        />

        {/* Project 5: Follow Cursor */}
        <ProjectSection 
          id="project-5"
          layout="cursor-follow"
          title="LIQUID INTERFACE"
          description="Experimental UI kit focused on fluid motion and morphing states."
          tech={['Framer Motion', 'SVG Filters', 'React']}
          video="/project5.mp4"
          accent="text-offwhite"
        />

        <LabSection />
        <ContactTerminal />
      </main>

      <footer className="p-10 border-t border-offwhite/10 flex justify-between items-end font-mono text-[10px] uppercase opacity-50">
        <div>SHUBHAM © 2026</div>
        <div className="text-right">
          BUILT WITH PRECISION<br />
          LONDON / REMOTE
        </div>
      </footer>
    </div>
  );
}
