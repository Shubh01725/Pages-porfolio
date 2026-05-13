import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'SELECTED WORKS', href: '#project-1' },
    { label: 'EXPERIMENTAL LAB', href: '#lab' },
    { label: 'ABOUT / CONTACT', href: '#contact' },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 right-8 z-[100] w-12 h-12 flex items-center justify-center bg-accent text-charcoal rounded-full mix-blend-exclusion"
        data-cursor="MENU"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed inset-0 z-[90] bg-charcoal flex items-center justify-center"
          >
            <nav className="text-center">
              <ul className="space-y-8">
                {navItems.map((item, idx) => (
                  <motion.li 
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <a 
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-[6vw] font-bold tracking-tighter hover:text-accent transition-colors block"
                      data-cursor="GO"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="absolute bottom-10 inset-x-0 text-center font-mono text-xs opacity-50 space-x-10">
              <a href="#" className="hover:text-accent">INSTAGRAM</a>
              <a href="#" className="hover:text-accent">GITHUB</a>
              <a href="#" className="hover:text-accent">LINKEDIN</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
