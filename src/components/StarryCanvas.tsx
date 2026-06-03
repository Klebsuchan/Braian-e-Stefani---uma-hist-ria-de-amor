import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Trash2, Heart } from "lucide-react";
import { cn } from "../lib/utils";

interface Star {
  id: string;
  x: number;
  y: number;
}

export function StarryCanvas() {
  const [stars, setStars] = useState<Star[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showHeart, setShowHeart] = useState(false);

  const handleAddStar = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newStar = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
    };

    setStars([...stars, newStar]);
  };

  const clearCanvas = () => {
    setStars([]);
    setShowHeart(false);
  };
  
  useEffect(() => {
     if(stars.length > 5 && !showHeart) {
         // Maybe randomly show the message after a few stars.
         setShowHeart(true);
     }
  }, [stars, showHeart]);

  return (
    <section className="py-24 px-6 md:px-12 relative w-full flex flex-col items-center justify-center bg-[#0a0002] min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/10 via-[#0a0002] to-[#0a0002] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center z-10 max-w-3xl mx-auto mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-pink-200 mb-6 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-pink-500" />
          O Nosso Próprio Céu
          <Sparkles className="w-8 h-8 text-pink-500" />
        </h2>
        <p className="text-stone-400 font-light text-lg">
          Clique no quadro escuro para espalhar nossas próprias estrelas formando a constelação do nosso amor. (Junte suas estrelinhas!).
        </p>
      </motion.div>

      <div className="z-10 w-full max-w-5xl flex flex-col items-center relative">
        <div className="w-full flex justify-end mb-4">
           <button 
             onClick={clearCanvas}
             className="flex items-center gap-2 px-4 py-2 text-sm text-stone-500 hover:text-pink-400 transition-colors uppercase tracking-widest font-mono border border-transparent hover:border-pink-900/50 rounded-full bg-white/5"
           >
             <Trash2 className="w-4 h-4" />
             Limpar Céu
           </button>
        </div>
        
        <div 
          ref={containerRef}
          onClick={handleAddStar}
          className="w-full h-[500px] md:h-[600px] bg-black/50 border-2 border-pink-900/30 rounded-3xl overflow-hidden relative cursor-crosshair shadow-2xl backdrop-blur-sm group"
        >
          {/* Fundo Estrelado Sutil (nativo da div) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen" />
          
          <AnimatePresence>
            {stars.map((star, idx) => {
              // Conecta a estrela atual com a anterior
              const prevStar = idx > 0 ? stars[idx - 1] : null;

              return (
                <div key={star.id}>
                  {prevStar && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        x1={prevStar.x}
                        y1={prevStar.y}
                        x2={star.x}
                        y2={star.y}
                        stroke="rgba(236,72,153, 0.4)" // pink-500 com opacidade
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  )}
                  
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute z-10 w-4 h-4 -ml-2 -mt-2 text-pink-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] filter"
                    style={{ left: star.x, top: star.y }}
                  >
                    <Sparkles className="w-full h-full fill-pink-200" />
                  </motion.div>
                </div>
              );
            })}
          </AnimatePresence>
          
          {stars.length === 0 && (
             <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 group-hover:opacity-20 pointer-events-none transition-opacity">
                <Sparkles className="w-12 h-12 text-stone-600 mb-4" />
                <p className="font-serif text-stone-500 text-lg">Clique em qualquer lugar do universo</p>
             </div>
          )}
        </div>

        <AnimatePresence>
           {showHeart && (
               <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mt-8 bg-pink-950/40 border border-pink-900/50 p-6 rounded-2xl flex items-center gap-4 text-pink-200 font-serif text-xl"
               >
                  <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
                  Daqui até as estrelas, eu te amo um milhão de vezes. 
               </motion.div>
           )}
        </AnimatePresence>

      </div>
    </section>
  );
}
