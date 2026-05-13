import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh] w-full bg-charcoal flex flex-col items-center"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 px-10"
        >
          <h1 className="text-[20vw] leading-[0.8] font-bold tracking-tighter uppercase text-offwhite overflow-hidden">
            <span className="block">SHUBHAM</span>
          </h1>
          <div className="flex justify-between items-start mt-4">
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-60">
              [00:01:42:09] <br />
              FRAME_ACTIVE_MODE
            </div>
            <h2 className="text-[5vw] leading-[1] font-medium tracking-tight text-right w-1/2">
              BUILDING <span className="text-accent italic">KINETIC</span> DIGITAL EXPERIENCES.
            </h2>
          </div>
        </motion.div>

        {/* Film Strip Background Elements */}
        <div className="absolute inset-0 z-0 flex justify-between pointer-events-none px-4 py-2 opacity-20">
          <div className="h-full w-4 border-l-2 border-r-2 border-dashed border-offwhite/30" />
          <div className="h-full w-4 border-l-2 border-r-2 border-dashed border-offwhite/30" />
        </div>
      </div>

      {/* Downward Reel Indicator */}
      <div className="absolute bottom-10 left-10 flex items-center space-x-4 font-mono text-[10px] uppercase opacity-40">
        <div className="w-px h-20 bg-offwhite origin-top animate-bounce" />
        <div className="vertical-text">SCROLL TO UNREEL</div>
      </div>
    </section>
  );
}
