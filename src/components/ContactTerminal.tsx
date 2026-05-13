import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Type "help" to see available commands.']);
  const [showForm, setShowForm] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response = '';

    if (cmd === 'help') {
      response = 'Available commands: about, contact, github, clear, hello';
    } else if (cmd === 'about') {
      response = 'Shubham: Developer and Interactive Designer based in the void. Passionate about movement, shaders, and high-performance pixels.';
    } else if (cmd === 'contact') {
      setShowForm(true);
      response = 'Opening secure communications channel...';
    } else if (cmd === 'github') {
      response = 'Github: /shubham-interactive';
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'hello') {
      response = '01001000 01100101 01101100 01101100 01101111';
    } else {
      response = `Command not found: ${cmd}. Type "help" for options.`;
    }

    setHistory([...history, `> ${input}`, response]);
    setInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section id="contact" className="min-h-screen bg-charcoal p-10 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-[8vw] font-bold tracking-tighter uppercase leading-none">
            GET IN<br />TOUCH.
          </h2>
        </div>

        <div className="bg-black/50 border border-offwhite/10 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="bg-offwhite/5 px-4 py-2 flex items-center justify-between border-bottom border-offwhite/10">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="font-mono text-[10px] uppercase opacity-40">terminal_v1.0.4</div>
          </div>
          
          <div 
            ref={terminalRef}
            className="p-6 font-mono text-sm h-[400px] overflow-y-auto space-y-2 selection:bg-accent selection:text-charcoal"
          >
            {history.map((line, i) => (
              <div key={i} className={line.startsWith('>') ? 'text-accent' : 'text-offwhite/80'}>
                {line}
              </div>
            ))}
            
            {!showForm && (
              <form onSubmit={handleCommand} className="flex items-center">
                <span className="text-accent mr-2">{'>'}</span>
                <input 
                  autoFocus
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-accent"
                />
              </form>
            )}

            <AnimatePresence>
              {showForm && (
                <motion.form 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4 max-w-md"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase opacity-40">IDENTIFIER</label>
                    <input type="text" placeholder="YOUR NAME" className="w-full bg-offwhite/5 border border-offwhite/10 p-3 focus:border-accent outline-none transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase opacity-40">ADDRESS_CHANNEL</label>
                    <input type="email" placeholder="EMAIL" className="w-full bg-offwhite/5 border border-offwhite/10 p-3 focus:border-accent outline-none transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase opacity-40">TRANSMISSION</label>
                    <textarea rows={4} placeholder="WHAT IS THE PROJECT?" className="w-full bg-offwhite/5 border border-offwhite/10 p-3 focus:border-accent outline-none transition-colors" />
                  </div>
                  <button className="bg-accent text-charcoal font-bold uppercase py-3 px-8 hover:bg-white transition-colors duration-300">
                    SEND TRANSMISSION
                  </button>
                  <button onClick={() => setShowForm(false)} className="ml-4 text-[10px] uppercase opacity-40 hover:opacity-100 underline">
                    Return to terminal
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
