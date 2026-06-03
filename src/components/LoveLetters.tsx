import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MailOpen, X } from "lucide-react";

interface Letter {
  id: string;
  label: string;
  message: string;
}

interface LoveLettersProps {
  letters: Letter[];
}

export function LoveLetters({ letters }: LoveLettersProps) {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#110204] via-[#2d0a11] to-[#110204] relative z-10 border-y border-white/5 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <Mail className="w-8 h-8 mx-auto text-pink-400" />
          <h2 className="text-4xl md:text-6xl font-light text-white drop-shadow-md">
            Cartas para Você
          </h2>
          <p className="text-lg text-pink-200/80 font-serif italic max-w-2xl mx-auto">
            Guarde essas palavras para quando precisar delas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {letters.map((letter, index) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setSelectedLetter(letter)}
                className="w-full group relative flex flex-col items-center justify-center p-8 bg-white/5 hover:bg-white/10 border border-pink-900/30 hover:border-pink-500/50 rounded-2xl transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ rotate: [-5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail className="w-16 h-16 text-pink-300/80 mb-4 group-hover:text-pink-300 transition-colors" />
                </motion.div>
                <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity rounded-2xl" />
                <span className="font-sans font-medium text-lg text-white/90 uppercase tracking-wider text-center relative z-10">
                  {letter.label}
                </span>
                <span className="text-xs text-pink-300/60 mt-2 font-sans italic relative z-10">Clique para abrir</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Letter View */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotateX: -20 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="bg-stone-100 text-stone-900 max-w-lg w-full rounded-md shadow-2xl overflow-hidden relative"
              style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
              }}
            >
              <div className="border-b border-pink-900/20 bg-pink-900/5 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <MailOpen className="w-5 h-5 text-pink-800/60" />
                  <span className="font-sans font-bold text-pink-900/80 uppercase tracking-widest text-xs">
                    {selectedLetter.label}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedLetter(null)}
                  className="p-1 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>
              
              <div className="p-8 md:p-12">
                <p className="font-serif text-lg md:text-xl leading-relaxed text-stone-800 whitespace-pre-wrap">
                  {selectedLetter.message}
                </p>
                
                <div className="mt-12 text-right">
                  <p className="font-serif italic text-stone-600">Com muito amor,</p>
                  <p className="font-serif text-xl font-medium mt-2 text-pink-800/80">Braian K.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
