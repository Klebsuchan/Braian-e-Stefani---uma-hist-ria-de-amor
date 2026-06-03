import { motion } from "motion/react";
import { Sparkles, Stars, Infinity as InfinityIcon } from "lucide-react";

export function Future() {
  return (
    <section className="py-24 px-4 bg-[#110204] relative z-10 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-pink-900/40 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-rose-900/30 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center justify-center gap-3 mb-8">
            <Stars className="w-5 h-5 text-pink-400" />
            <span className="text-pink-300/80 uppercase text-xs md:text-sm tracking-[0.3em] font-sans font-medium">Nosso Próximo Capítulo</span>
            <Stars className="w-5 h-5 text-pink-400" />
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 drop-shadow-sm">
            E isso é <span className="italic text-pink-300">apenas</span> o começo.
          </h2>

          <p className="text-lg md:text-2xl text-white/70 font-sans font-light max-w-2xl mx-auto leading-relaxed mb-16">
            Mal posso esperar para viver o resto da minha vida ao seu lado. Cada plano, cada sonho e cada amanhã são melhores porque você está neles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-white/10"
            >
              <InfinityIcon className="w-6 h-6 text-pink-400" />
              <span className="text-white uppercase tracking-widest text-sm font-sans">Para Sempre</span>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-white/10"
            >
              <Sparkles className="w-6 h-6 text-pink-400" />
              <span className="text-white uppercase tracking-widest text-sm font-sans">Nós Dois</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
