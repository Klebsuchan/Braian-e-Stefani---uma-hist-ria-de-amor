import { motion } from "motion/react";
import { Heart } from "lucide-react";

interface TimelineProps {
  timeline: Array<{
    date: string;
    title: string;
    description: string;
  }>;
}

export function Timeline({ timeline }: TimelineProps) {
  return (
    <section className="py-24 px-4 bg-[#110204] relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-4"
        >
          <Heart className="w-8 h-8 mx-auto text-pink-400 fill-pink-400/20" />
          <h2 className="text-4xl md:text-6xl font-light text-white drop-shadow-md">
            A Nossa História
          </h2>
          <p className="text-lg text-pink-200/80 font-serif italic max-w-2xl mx-auto">
            Cada passo que demos nos trouxe até aqui...
          </p>
        </motion.div>

        <div className="relative border-l-2 border-pink-900/30 ml-4 md:ml-0 md:border-l-0">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-pink-900/30 transform -translate-x-1/2"></div>
          
          <div className="space-y-16">
            {timeline.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative w-full flex flex-col md:flex-row items-center">
                  <div className={`hidden md:flex w-1/2 ${isEven ? 'justify-end pr-12' : 'justify-end order-3 pr-0 pl-12 text-left'} text-right`}>
                     {isEven ? (
                       <motion.div 
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm max-w-sm hover:scale-105 transition-transform"
                       >
                         <span className="text-pink-400 font-sans font-bold text-sm uppercase tracking-widest block mb-2">{event.date}</span>
                         <h3 className="text-2xl text-white font-light mb-3">{event.title}</h3>
                         <p className="text-white/70 font-sans font-light leading-relaxed">{event.description}</p>
                       </motion.div>
                     ) : (
                       <motion.div 
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm max-w-sm hover:scale-105 transition-transform"
                       >
                         <span className="text-pink-400 font-sans font-bold text-sm uppercase tracking-widest block mb-2">{event.date}</span>
                         <h3 className="text-2xl text-white font-light mb-3">{event.title}</h3>
                         <p className="text-white/70 font-sans font-light leading-relaxed">{event.description}</p>
                       </motion.div>
                     )}
                  </div>

                  <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-pink-500 border-4 border-[#110204] z-10 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>

                  <div className="md:w-1/2 pl-8 md:pl-0">
                    <div className={`md:hidden block`}>
                      <motion.div 
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm hover:scale-105 transition-transform"
                       >
                         <span className="text-pink-400 font-sans font-bold text-sm uppercase tracking-widest block mb-2">{event.date}</span>
                         <h3 className="text-2xl text-white font-light mb-3">{event.title}</h3>
                         <p className="text-white/70 font-sans font-light leading-relaxed">{event.description}</p>
                       </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
