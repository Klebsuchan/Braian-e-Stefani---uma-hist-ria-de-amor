import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { CONFIG } from "../config";
import { HeroCursorTracker } from "./HeroCursorTracker";

interface HeroProps {
  onStart: () => void;
  heroConfig: {
    mainPhoto: string;
    mainQuote: string;
  };
  couple: {
    person1: string;
    person2: string;
  };
}

export function Hero({ onStart, heroConfig, couple }: HeroProps) {
  return (
    <section className="relative p-4 md:p-8">
      <HeroCursorTracker>
        <div className="rounded-3xl overflow-hidden relative border border-white/10 group shadow-2xl flex flex-col items-center justify-center min-h-[85vh] min-h-[85dvh] py-20 px-4 w-full h-full">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img
              src={heroConfig.mainPhoto}
              alt="Nós"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-[center_25%] scale-105"
              animate={{ scale: [1.05, 1] }}
              transition={{ duration: 10, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#110204] via-black/40 to-transparent z-10" />
          </div>

          <div className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white drop-shadow-lg tracking-tight">
                {couple.person1} <span className="text-pink-400 font-sans italic mx-2">&</span> {couple.person2}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-lg md:text-2xl text-pink-200/80 italic drop-shadow-md max-w-2xl px-4"
            >
              &quot;{heroConfig.mainQuote}&quot;
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <button
                onClick={onStart}
                className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-white/20 transition-all font-sans relative group overflow-hidden shadow-xl shadow-black/20 flex flex-row items-center gap-3 cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Clique aqui</span>
                <Heart className="w-5 h-5 relative z-10 animate-pulse fill-white" />
              </button>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <div className="w-[1px] h-12 bg-white/50" />
          </div>
        </div>
      </HeroCursorTracker>
    </section>
  );
}
