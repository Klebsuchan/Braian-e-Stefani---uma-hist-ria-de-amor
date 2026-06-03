import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Utensils, Film, Gamepad2, Heart, Coffee, Dices } from "lucide-react";
import { cn } from "../lib/utils";

const dateIdeas = [
  { text: "Maratonar filmes agarradinhos na cama", icon: Film, color: "text-blue-400" },
  { text: "Pedir nossa comida favorita e não fazer nada", icon: Utensils, color: "text-orange-400" },
  { text: "Sair pra comer um doce delicioso (SEM COCO!)", icon: Coffee, color: "text-amber-400" },
  { text: "Noite de boas risadas assistindo nossas gameplays", icon: Gamepad2, color: "text-purple-400" },
  { text: "Dia de Spa com direito a massagem e chamego", icon: Heart, color: "text-red-400" },
  { text: "Passeio sem rumo, de mãos dadas por aí", icon: Sparkles, color: "text-yellow-400" }
];

export function DateRandomizer() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    
    let spins = 0;
    const maxSpins = 40;
    
    const spin = () => {
      spins++;
      setCurrentIndex(Math.floor(Math.random() * dateIdeas.length));
      
      if (spins < maxSpins) {
        const delay = 30 + Math.pow(spins, 1.4); // Sorteio desacelerando aos poucos
        setTimeout(spin, delay);
      } else {
        setIsSpinning(false);
        setShowResult(true);
      }
    };
    
    spin();
  };

  const CurrentIcon = dateIdeas[currentIndex].icon;

  return (
    <section className="py-24 px-6 md:px-12 relative w-full flex flex-col items-center justify-center bg-[#0a0002] overflow-hidden">
      <div className="absolute w-[800px] h-[800px] bg-pink-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center z-10 max-w-2xl mx-auto mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-pink-200 mb-6 flex items-center justify-center gap-3">
          <Dices className="w-8 h-8 text-pink-500" />
          Roleta do Nosso Encontro
          <Dices className="w-8 h-8 text-pink-500" />
        </h2>
        <p className="text-stone-400 font-light text-lg">
          Na dúvida do que vamos fazer hoje ou no fim de semana? Deixa que a roleta (e o nosso amor) decidam! 
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="z-10 w-full max-w-md relative"
      >
        <div className="bg-black/40 border border-pink-900/30 rounded-3xl p-8 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center min-h-[350px]">
          
          <div className="flex flex-col items-center justify-center h-48 text-center px-2 w-full">
            <CurrentIcon className={cn(
              "w-16 h-16 mb-6 transition-all duration-300", 
              isSpinning ? "text-stone-600 scale-90" : cn(dateIdeas[currentIndex].color, "scale-100 drop-shadow-lg")
            )} />
            
            <p className={cn(
              "text-2xl font-serif font-medium transition-all duration-300 leading-snug", 
              isSpinning ? "text-stone-500 blur-[1px] scale-95" : "text-stone-200 scale-100",
              showResult && "text-pink-200"
            )}>
              {dateIdeas[currentIndex].text}
            </p>
          </div>

          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={cn(
               "mt-8 px-8 py-4 rounded-full font-medium text-lg tracking-wider transition-all duration-300 w-full shadow-[0_0_20px_rgba(236,72,153,0.15)]",
               isSpinning 
                 ? "bg-white/5 border border-pink-900/20 text-stone-500 cursor-not-allowed" 
                 : "bg-pink-950 border border-pink-800 text-pink-200 hover:bg-pink-900 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]"
            )}
          >
            {isSpinning ? "Sorteando..." : showResult ? "Girar Corações de Novo!" : "Girar a Roleta!"}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
