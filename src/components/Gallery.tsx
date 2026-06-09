import { motion } from "motion/react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProps {
  photos: string[];
}

export function Gallery({ photos }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -window.innerWidth * 0.5, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: window.innerWidth * 0.5, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 border-pink-900/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-pink-300/60 uppercase text-[10px] tracking-[0.3em] font-sans block mb-4">
            Galeria de Momentos
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-white">Nossa Galeria</h2>
        </motion.div>

        <div className="relative group">
           <button 
             onClick={scrollLeft} 
             className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 border border-pink-900/50 rounded-full flex items-center justify-center text-pink-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-900/30 hover:text-pink-100"
             aria-label="Anterior"
           >
             <ChevronLeft className="w-6 h-6" />
           </button>
           <button 
             onClick={scrollRight} 
             className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 border border-pink-900/50 rounded-full flex items-center justify-center text-pink-300 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-pink-900/30 hover:text-pink-100"
             aria-label="Próxima"
           >
             <ChevronRight className="w-6 h-6" />
           </button>

           {/* Carousel Container */}
           <div 
             ref={containerRef}
             className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory py-8 px-4 md:px-8 -mx-4 md:-mx-8 scroll-smooth"
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
           >
             <style>{`
                .flex::-webkit-scrollbar { display: none; }
             `}</style>
             
             {photos.map((photo, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                  className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-white/5"
                >
                   <img
                     src={photo}
                     alt={`Lembrança ${index + 1}`}
                     className="w-full h-full object-cover object-[center_30%] transform transition-transform duration-700 hover:scale-[1.03] opacity-95 hover:opacity-100"
                     loading="lazy"
                   />
                   <div className="absolute inset-0 border-2 border-transparent hover:border-pink-500/20 rounded-3xl transition-colors duration-500 pointer-events-none" />
                </motion.div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
