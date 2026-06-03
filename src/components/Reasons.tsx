import { motion } from "motion/react";
import { Heart } from "lucide-react";

interface ReasonsProps {
  reasons: string[];
}

export function Reasons({ reasons }: ReasonsProps) {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-[#1a0508] via-[#2d0a11] to-[#1a0508] z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <Heart className="w-8 h-8 mx-auto text-pink-400 fill-pink-400/20" />
          <h2 className="text-4xl md:text-6xl font-light text-white drop-shadow-md">
            Por que eu amo você
          </h2>
          <p className="text-lg text-pink-200/80 font-serif italic max-w-2xl mx-auto">
            Existem infinitas razões, mas aqui estão algumas das minhas favoritas...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-3xl hover:bg-white/10 hover:scale-105 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center mb-6 max-h-12 relative overflow-hidden">
                 <div className="absolute inset-0 bg-pink-500/20 group-hover:scale-150 transition-transform duration-500 rounded-full"/>
                 <span className="text-pink-300 font-sans font-bold relative z-10">{index + 1}</span>
              </div>
              <p className="text-white/90 text-xl font-light leading-relaxed">
                {reason}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
