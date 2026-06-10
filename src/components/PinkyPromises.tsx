import { motion } from "motion/react";
import { Handshake, Heart } from "lucide-react";

const promises = [
  "Eu prometo escolher você todos os dias da minha vida.",
  "Eu prometo tentar não roubar as cobertas nos dias frios (tentar muito).",
  "Eu prometo segurar sua mão quando tudo parecer assustador.",
  "Eu prometo rir das suas piadas ruins, mesmo as piores delas.",
  "Eu prometo aprender suas músicas favoritas pra cantar junto com você na motinha elétrica.",
  "Eu prometo nunca dormir brigado, nem mesmo depois das maiores cismas de ciúmes.",
  "Eu prometo sempre dar aquele beijo de boa noite, não importa a distância.",
  "Eu prometo te amar nas suas melhores e nas suas piores versões."
];

export function PinkyPromises() {
  return (
    <section className="py-24 px-6 md:px-12 relative w-full flex flex-col items-center justify-center bg-transparent min-h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center z-10 max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-pink-200 mb-6 flex items-center justify-center gap-3">
          <Handshake className="w-8 h-8 text-pink-500" />
          Promessas de Dedinho
          <Handshake className="w-8 h-8 text-pink-500" />
        </h2>
        <p className="text-stone-400 font-light text-lg">
          Daquelas promessas fofinhas que a gente jura com o dedinho mindinho, que valem mais do que qualquer contrato nesse universo. 
        </p>
      </motion.div>

      <div className="z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-pink-900/30 -translate-x-1/2" />
        
        {promises.map((promise, idx) => (
          <motion.div
             key={idx}
             initial={{ opacity: 0, y: 20, x: idx % 2 === 0 ? -20 : 20 }}
             whileInView={{ opacity: 1, y: 0, x: 0 }}
             transition={{ duration: 0.6, delay: idx * 0.1 }}
             viewport={{ once: true }}
             className={`flex items-center gap-4 bg-pink-950/20 border border-pink-900/40 p-6 rounded-2xl backdrop-blur-md shadow-lg group hover:border-pink-500/50 transition-all ${
               idx % 2 === 0 ? "md:mr-8 xl:mr-12" : "md:ml-8 xl:ml-12"
             }`}
          >
            <div className="shrink-0 w-12 h-12 bg-pink-900/30 rounded-full flex items-center justify-center border border-pink-800/50 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 text-pink-400 group-hover:fill-pink-400 transition-colors" />
            </div>
            <p className="text-stone-300 font-serif leading-relaxed text-lg group-hover:text-pink-100 transition-colors">
              "{promise}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
