import { motion } from "motion/react";

export function SpecialVideo() {
  return (
    <section className="py-24 px-6 relative w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center z-10 relative">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true, margin: "-100px" }}
           className="w-full relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.15)] ring-1 ring-white/10 aspect-video mb-12 bg-black/40"
        >
          <video 
            className="w-full h-full object-cover object-center"
            controls
            playsInline
            preload="none"
          >
            <source src="/videos/gato-de-botas.mp4" type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
          </video>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl space-y-6"
        >
          <p className="text-xl md:text-2xl font-serif leading-relaxed text-stone-200">
            "Kitty, uma vida com você é tudo que eu poderia pedir."
          </p>
          <p className="text-lg md:text-xl text-stone-300 font-light leading-relaxed">
            Assim como o Gato de Botas encontrou seu verdadeiro lar e sentido ao lado da Kitty, eu encontrei em você tudo o que eu sempre sonhei e muito mais. Não importa quantas 'vidas' nós tivéssemos, eu escolheria viver todas elas ao seu lado. Você é a minha maior aventura, o meu porto seguro, e a única vida que eu quero viver é uma em que eu possa sempre segurar a sua mão. Eu te amo, infinitamente. ❤️
          </p>
        </motion.div>
      </div>
    </section>
  );
}
