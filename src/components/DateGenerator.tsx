import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Ticket } from "lucide-react";

const dateIdeas = [
  "Noite de cinema em casa com pipoca e cobertores",
  "Jantar à luz de velas no nosso restaurante favorito",
  "Piquenique no parque no fim de semana",
  "Fazer uma receita nova juntos",
  "Maratona da nossa série favorita com muitas guloseimas",
  "Caminhada ao ar livre em algum lugar novo",
  "Noite de jogos de tabuleiro ou videogame",
  "Sair para tomar sorvete no final da tarde",
  "Café da manhã na cama",
  "Sessão de fotos engraçadas juntos"
];

export function DateGenerator() {
  const [currentIdea, setCurrentIdea] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDate = () => {
    setIsGenerating(true);
    setCurrentIdea(null);
    
    // Fake rolling effect
    let count = 0;
    const interval = setInterval(() => {
      setCurrentIdea(dateIdeas[Math.floor(Math.random() * dateIdeas.length)]);
      count++;
      if (count > 10) {
        clearInterval(interval);
        // Ensure a truly random final one
        setCurrentIdea(dateIdeas[Math.floor(Math.random() * dateIdeas.length)]);
        setIsGenerating(false);
      }
    }, 100);
  };

  return (
    <section className="py-24 px-4 bg-[#1a0508] relative z-10 border-t border-b border-pink-900/20">
      <div className="max-w-3xl mx-auto shadow-2xl rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md relative">
        <div className="absolute top-0 right-0 p-32 bg-pink-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 p-32 bg-pink-800/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10 p-8 md:p-16 flex flex-col items-center text-center">
          <Ticket className="w-12 h-12 text-pink-400 mb-6" />
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4">Vale-Encontro</h2>
          <p className="text-pink-200/80 font-serif italic mb-10 max-w-md">
            Não sabe o que vamos fazer no nosso próximo date? Deixe o destino (ou esse botão) decidir por nós!
          </p>

          <div className="min-h-[100px] flex items-center justify-center w-full mb-8">
            <AnimatePresence mode="wait">
              {currentIdea ? (
                <motion.div
                  key={currentIdea}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-pink-950/40 border border-pink-500/30 rounded-2xl p-6 w-full shadow-inner"
                >
                  <p className="text-xl md:text-2xl text-white font-light font-sans tracking-wide">
                    {currentIdea}
                  </p>
                </motion.div>
              ) : (
                <div className="border border-dashed border-white/20 rounded-2xl p-6 w-full opacity-50">
                  <p className="text-xl text-white/50 font-light italic">Nosso próximo date vai ser...</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={generateDate}
            disabled={isGenerating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 bg-white text-[#110204] font-sans font-medium uppercase tracking-widest text-sm rounded-full overflow-hidden hover:bg-pink-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="flex items-center gap-2 relative z-10">
              {isGenerating ? "Sorteando..." : "Sortear Ideia"}
              {!isGenerating && <Sparkles className="w-4 h-4" />}
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
