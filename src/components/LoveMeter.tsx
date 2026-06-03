import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, AlertTriangle } from "lucide-react";
import { cn } from "../lib/utils";

export function LoveMeter() {
  const [clicks, setClicks] = useState(0);
  const [isBroken, setIsBroken] = useState(false);
  
  // Número de cliques necessários para "quebrar" o medidor
  const maxClicks = 30;

  const handleClick = () => {
    if (isBroken) return;
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks >= maxClicks) {
      setTimeout(() => setIsBroken(true), 400);
    }
  };

  const percentage = Math.min((clicks / maxClicks) * 100, 100);

  return (
    <section className="py-24 px-6 md:px-12 relative w-full flex flex-col items-center justify-center bg-stone-950 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center z-10 max-w-2xl mx-auto mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-pink-200 mb-6 flex items-center justify-center gap-3">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          Medidor de Amor
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        </h2>
        <p className="text-stone-400 font-light text-lg">
          O quão forte é o nosso amor? Clique no botão o mais rápido que puder para encher a barrinha e descobrir!
        </p>
      </motion.div>

      <div className="z-10 w-full max-w-md relative flex flex-col items-center">
        
        {/* Barra de Progresso */}
        <div className="w-full h-8 bg-stone-900 rounded-full border border-stone-800 overflow-hidden mb-12 relative shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-pink-600 via-red-500 to-red-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          />
          {/* Brilhozinho na barra */}
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0)_100%)] opacity-50" />
        </div>

        <AnimatePresence mode="wait">
          {!isBroken ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="flex flex-col items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClick}
                className="w-40 h-40 bg-pink-950 border border-pink-800 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.3)] group transition-all"
              >
                <Heart className={cn(
                  "w-20 h-20 text-red-500 fill-red-500 transition-all",
                  clicks > 0 ? "scale-110 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" : ""
                )} />
              </motion.button>
              <p className="mt-8 text-stone-500 font-mono tracking-widest uppercase text-sm">
                Nível: {Math.floor(percentage)}%
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="broken"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-black/60 border border-red-900/50 rounded-3xl p-8 backdrop-blur-md shadow-2xl text-center relative max-w-sm"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-red-950 border border-red-800 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              </div>
              
              <h3 className="text-2xl font-serif text-red-300 mt-4 mb-4">
                ERRO NO SISTEMA! 🚨
              </h3>
              <p className="text-stone-300 text-lg leading-relaxed">
                Ops... parece que você clicou demais e quebrou o Medidor de Amor! 😅
              </p>
              <p className="text-stone-400 mt-4 leading-relaxed font-light">
                Mas faz sentido, não existe máquina no mundo capaz de medir ou suportar o tamanho do amor que nós sentimos um pelo outro. É gigante demais para caber aqui. ❤️♾️
              </p>

              <div className="mt-6 flex justify-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <Sparkles className="w-5 h-5 text-pink-400 animate-pulse delay-75" />
                <Sparkles className="w-5 h-5 text-red-400 animate-pulse delay-150" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
