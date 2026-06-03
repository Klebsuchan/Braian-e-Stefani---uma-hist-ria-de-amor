import { motion } from "motion/react";

interface GalleryProps {
  photos: string[];
}

export function Gallery({ photos }: GalleryProps) {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
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

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              className="break-inside-avoid relative group rounded-xl overflow-hidden bg-white/10 border border-white/5"
            >
              <img
                src={photo}
                alt={`Lembrança ${index + 1}`}
                className="w-full aspect-square object-cover object-[center_30%] transform transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
