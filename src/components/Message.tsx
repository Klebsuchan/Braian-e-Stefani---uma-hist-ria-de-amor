import { motion } from "motion/react";

interface MessageProps {
  message: string;
}

export function Message({ message }: MessageProps) {
  // Simple rendering of message with line breaks
  const lines = message.split("\n");

  return (
    <section className="py-16 md:py-32 relative px-4 md:px-8">
      <div className="max-w-4xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-8 md:p-16 relative overflow-hidden backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <span className="text-pink-300/60 uppercase text-[10px] tracking-[0.3em] font-sans block mb-8 text-center md:text-left">
            Uma Mensagem para Você
          </span>
          
          <div className="relative z-10 space-y-6 text-lg md:text-xl text-white/90 leading-relaxed italic">
            {lines.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {line || <span className="block h-4" /> /* Maintain spacing for empty lines */}
              </motion.p>
            ))}
          </div>

          <div className="absolute -right-4 -bottom-10 opacity-5 -z-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
