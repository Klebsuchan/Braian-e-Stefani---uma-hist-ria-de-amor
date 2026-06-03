import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircleHeart, Sparkles } from "lucide-react";

const compliments = [
  "A sua voz é a minha música favorita de ouvir depois de um dia cansativo.",
  "O seu sorriso pequenininho me desmonta inteiro, toda vez.",
  "Eu sou completamente apaixonado por cada detalhe seu, até os que você acha que são 'defeitos'.",
  "Você é a mulher mais forte, incrível e guerreira que eu conheço.",
  "Seu olhar tem uma paz que me faz sentir em casa, onde quer que a gente esteja.",
  "Não existe lugar mais seguro no mundo do que dentro do seu abraço.",
  "Amo o seu cheirinho. É o melhor perfume do universo inteiro.",
  "Até quando você fica brava ou com ciúmes, eu não consigo deixar de te achar a coisinha mais linda.",
  "Se eu pudesse escolher qualquer pessoa no mundo para passar todos os meus amanhãs... eu escolheria você um milhão de vezes.",
  "Amo nossos momentos jogando. Mesmo sendo melhor no videogame, você me ganha no amor todos os dias.",
  "Você ilumina a minha vida e me faz querer ser alguém melhor a cada manhã.",
  "Seu sorriso deveria ser exposto num museu, de tão perfeitinho que é.",
];

export function LoveJar() {
  const [currentCompliment, setCurrentCompliment] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const pullNote = () => {
    if (isOpening) return;
    setIsOpening(true);
    setCurrentCompliment(null);
    
    // Animação de pegar o bilhete
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * compliments.length);
      setCurrentCompliment(compliments[randomIndex]);
      setIsOpening(false);
    }, 1000);
  };

  return (
    <section className="py-24 px-6 md:px-12 relative w-full flex flex-col items-center justify-center bg-transparent min-h-[80vh]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-900/20 rounded-full blur-[150px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12 z-10"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-pink-200 mb-4 flex items-center justify-center gap-3">
           <MessageCircleHeart className="w-8 h-8 text-pink-500" />
           Pote de Elogios
           <MessageCircleHeart className="w-8 h-8 text-pink-500" />
        </h2>
        <p className="text-stone-400 font-light text-lg max-w-xl mx-auto">
          Para aqueles dias que você acordar precisando de um dengo extra ou de um lembrete do quanto eu sou apaixonado por você. Puxe um bilhetinho!
        </p>
      </motion.div>

      <div className="z-10 w-full max-w-lg flex flex-col items-center relative">
        
        {/* Pote / Botão */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={pullNote}
          disabled={isOpening}
          className="relative w-48 h-56 bg-pink-900/30 border border-pink-800/50 rounded-b-3xl rounded-t-xl flex flex-col items-center justify-start pt-6 shadow-[0_10px_40px_rgba(236,72,153,0.15)] backdrop-blur-md group"
        >
          {/* Tampa do Pote */}
          <div className="absolute -top-4 w-52 h-8 bg-pink-900 rounded-lg shadow-sm border border-pink-700" />
          
          <div className="text-center px-4">
            <span className="font-serif text-pink-300 italic text-sm">"Motivos pra te amar"</span>
            <div className="mt-4 flex flex-col gap-2 items-center opacity-100 transition-opacity">
              <div className="w-20 h-6 bg-pink-900/50 border border-pink-800/30 rounded shadow-sm rotate-[-10deg]" />
              <div className="w-16 h-6 bg-pink-900/50 border border-pink-800/30 rounded shadow-sm rotate-[15deg] ml-4" />
              <div className="w-24 h-6 bg-pink-900/50 border border-pink-800/30 rounded shadow-sm rotate-[-5deg]" />
            </div>
          </div>

          <div className="absolute -bottom-6 text-stone-400 font-medium text-sm flex items-center gap-1 group-hover:text-pink-400 transition-colors">
            <Sparkles className="w-4 h-4" />
            Clique para puxar um bilhete
          </div>
        </motion.button>

        {/* Bilhete Revelado */}
        <div className="mt-20 min-h-[150px] w-full flex justify-center">
          <AnimatePresence mode="wait">
            {isOpening && (
              <motion.div
                 key="loading"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="text-pink-200 font-serif italic text-lg"
              >
                Abrindo um bilhetinho...
              </motion.div>
            )}
            
            {currentCompliment && !isOpening && (
              <motion.div
                key="compliment"
                initial={{ opacity: 0, scale: 0.8, y: 40, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="bg-black/60 px-8 py-10 rounded-lg shadow-lg border border-pink-900/50 backdrop-blur-md text-center relative w-full"
                style={{
                  backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(236, 72, 153, 0.15) 28px)"
                }}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-500/80 rounded-full shadow-sm" /> {/* Pinheirinho / percevejo */}
                <p className="font-serif text-xl sm:text-2xl text-pink-200 leading-relaxed pt-2">
                  "{currentCompliment}"
                </p>
                <p className="text-right mt-6 font-serif italic text-pink-400/70 text-sm">
                  - Braian K.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
