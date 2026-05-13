import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LabSection() {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      horizontalRef.current,
      { translateX: 0 },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  const labs = [
    {
      title: "BRAINSTORM",
      content: "Everything starts with a messy sketch. I believe in pencil and paper before pixels. Thinking is the hardest part of the process.",
      code: "const path = findShortestDistance(chaos, clarity);",
    },
    {
      title: "PROTOTYPE",
      content: "Motion first. Static design is dead. I build interactive prototypes in code to feel the friction and momentum.",
      code: "while(momentum > 0) { optimize(userExperience) }",
    },
    {
      title: "REFINE",
      content: "The last 10% is where the magic happens. Fine-tuning physics constants and easing curves until it feels natural.",
      code: "ease: [0.22, 1, 0.36, 1], damping: 20",
    },
    {
      title: "DEPLOY",
      content: "Performance is a feature. 60fps or nothing. Low-latency, high-impact digital products delivered with precision.",
      code: "npm run optimize --full-send",
    },
  ];

  return (
    <section ref={triggerRef} id="lab" className="overflow-hidden bg-accent text-charcoal">
      <div 
        ref={horizontalRef} 
        className="h-screen w-[400vw] flex items-center"
      >
        <div className="h-full w-screen flex flex-col justify-center px-10 border-r border-charcoal/10 relative">
          <span className="font-mono text-xs mb-4">[ SECTION_03 ]</span>
          <h2 className="text-[15vw] font-bold tracking-tighter leading-none uppercase">
            THE<br />LAB.
          </h2>
          <div className="absolute right-20 bottom-20 bg-charcoal text-accent p-6 font-mono text-xs uppercase animate-pulse">
            Slide to unreel process //
          </div>
        </div>

        {labs.map((lab, i) => (
          <div key={i} className="h-full w-screen flex items-center justify-center border-r border-charcoal/10 relative px-20">
            <div className="max-w-2xl">
              <span className="font-mono text-xs opacity-40">0{i+1} / STEP</span>
              <h3 className="text-[10vw] font-bold tracking-tighter uppercase mb-6 leading-none">
                {lab.title}
              </h3>
              <p className="text-2xl font-medium tracking-tight mb-10 max-w-xl">
                {lab.content}
              </p>
              <div className="bg-charcoal text-offwhite p-6 font-mono text-sm border-l-4 border-accent">
                <span className="text-accent opacity-50 mr-4">{'>'}</span>
                {lab.code}
              </div>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[20vw] font-bold opacity-[0.03] select-none uppercase">
              {lab.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
