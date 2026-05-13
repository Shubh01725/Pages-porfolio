import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { cn } from '@/src/lib/utils';
import gsap from 'gsap';

interface ProjectProps {
  id: string;
  layout: 'asymmetric-left' | 'morphing-mask' | 'knockout' | 'diagonal-split' | 'cursor-follow';
  title: string;
  description: string;
  tech: string[];
  video: string;
  video2?: string;
  accent?: string;
}

export default function ProjectSection({ id, layout, title, description, tech, video, video2, accent = "text-accent" }: ProjectProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Layout 1: Asymmetric Left
  if (layout === 'asymmetric-left') {
    return (
      <section id={id} ref={sectionRef} className="min-h-screen py-32 px-10 relative bg-charcoal border-t border-offwhite/5 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-10 h-full items-end">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-[70%] aspect-video bg-offwhite/5 rounded-sm overflow-hidden relative group"
            data-cursor="PLAY"
          >
            <video 
              autoPlay muted loop playsInline 
              src={video}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
            />
          </motion.div>
          <div className="w-full lg:w-[30%] flex flex-col justify-end">
            <h3 className={cn("text-[8vw] font-bold leading-tight tracking-tighter vertical-text items-end", accent)}>
              {title}
            </h3>
            <div className="mt-10 font-mono text-xs max-w-xs uppercase">
              <p className="opacity-80 leading-relaxed">{description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tech.map(t => <span key={t} className="border border-offwhite/20 px-2 py-1">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Layout 2: Morphing Mask
  if (layout === 'morphing-mask') {
    return (
      <section id={id} ref={sectionRef} className="min-h-screen py-32 relative bg-offwhite text-charcoal overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ scale: 0, borderRadius: '50%' }}
            whileInView={{ scale: 1.2, borderRadius: ['50%', '40% 60% 70% 30% / 40% 50% 60% 40%', '50%'] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror' }}
            className="w-[80vw] h-[80vw] bg-accent/20 blur-3xl"
          />
        </div>

        <div className="px-10 relative z-10">
          <div className="flex flex-col items-center">
            <motion.div 
              className="w-[50vw] h-[50vw] overflow-hidden mask-style-morph cursor-none"
              data-cursor="MORPH"
              style={{
                borderRadius: '40% 60% 70% 30% / 40% 50% 60% 40%',
              }}
              animate={{
                borderRadius: [
                  '40% 60% 70% 30% / 40% 50% 60% 40%',
                  '60% 40% 30% 70% / 50% 60% 40% 60%',
                  '40% 60% 70% 30% / 40% 50% 60% 40%'
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <video 
                autoPlay muted loop playsInline 
                src={video}
                className="w-full h-full object-cover" 
              />
            </motion.div>

            <div className="w-full overflow-hidden mt-20 whitespace-nowrap border-y border-charcoal/10 py-6">
              <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex items-center space-x-10 text-[5vw] font-bold uppercase"
              >
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="flex items-center space-x-10">
                    <span>{title}</span>
                    <span className="w-4 h-4 bg-accent rounded-full" />
                    <span className="font-mono text-xl opacity-50">{description}</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Layout 3: Knockout
  if (layout === 'knockout') {
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"]
    });
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
      <section id={id} ref={sectionRef} className="h-screen relative overflow-hidden bg-black">
        <motion.div 
          style={{ scale, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <video 
            autoPlay muted loop playsInline 
            src={video}
            className="w-full h-full object-cover" 
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h3 className="text-[25vw] font-bold tracking-[10vw] text-white mix-blend-overlay uppercase select-none pointer-events-none">
            {title.split(' ')[0]}
          </h3>
        </div>
        <div className="absolute bottom-20 left-10 z-20">
          <h4 className="text-[3vw] font-bold tracking-tighter uppercase">{title}</h4>
          <p className="font-mono text-sm uppercase opacity-60 mt-2 max-w-md">{description}</p>
        </div>
      </section>
    );
  }

  // Layout 4: Diagonal Split
  if (layout === 'diagonal-split') {
    return (
      <section id={id} ref={sectionRef} className="h-screen relative overflow-hidden bg-charcoal">
        <div className="grid grid-cols-2 h-full gap-px bg-offwhite/10">
          <div 
            className="relative overflow-hidden group clip-diagonal-1" 
            data-cursor="TENSION"
          >
            <video 
              autoPlay muted loop playsInline 
              src={video}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
            />
          </div>
          <div 
            className="relative overflow-hidden group clip-diagonal-2"
            data-cursor="TENSION"
          >
            <video 
              autoPlay muted loop playsInline 
              src={video2 || video}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
            />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative text-center">
             <h3 className="text-[10vw] font-bold tracking-tighter uppercase bg-accent text-charcoal px-6 py-2 rotate-[-5deg]">
              {title}
            </h3>
            <p className="mt-4 font-mono text-[10px] uppercase bg-charcoal text-offwhite inline-block px-4 py-2 border border-offwhite/20">
              {description} // {tech.join(' + ')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Layout 5: Cursor Follow
  if (layout === 'cursor-follow') {
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    const onMouseMove = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x * 100);
      mouseY.set(y * 100);
    };

    return (
      <section 
        id={id} 
        ref={sectionRef} 
        onMouseMove={onMouseMove}
        className="h-screen relative flex items-center justify-center bg-charcoal overflow-hidden group"
      >
        <div className="max-w-4xl text-center relative z-10">
          <h3 className="text-[12vw] font-bold leading-none tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity duration-1000">
            {title}
          </h3>
          <p className="mt-10 max-w-lg mx-auto font-mono text-sm opacity-60 uppercase">
            {description}
          </p>
        </div>

        <motion.div 
          className="absolute inset-x-0 inset-y-0 z-0 pointer-events-none overflow-hidden"
          style={{ x: mouseX, y: mouseY }}
        >
          <div className="w-[40vw] aspect-video bg-accent/10 border border-accent/20 rounded-xl overflow-hidden shadow-2xl">
            <video 
              autoPlay muted loop playsInline 
              src={video}
              className="w-full h-full object-cover" 
            />
          </div>
        </motion.div>
      </section>
    );
  }

  return null;
}
