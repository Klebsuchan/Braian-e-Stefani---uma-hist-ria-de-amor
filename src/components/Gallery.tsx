import { motion } from "motion/react";
import { useRef, useEffect } from "react";

interface GalleryProps {
  photos: string[];
}

export function Gallery({ photos }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const initialized = useRef(false);
  
  // To allow continuous infinite scrolling, duplicate photos
  const displayPhotos = [...photos, ...photos, ...photos];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!initialized.current) {
        setTimeout(() => {
            if (container) {
                container.scrollLeft = container.scrollWidth / 3;
            }
        }, 300);
        initialized.current = true;
    }

    let animationId: number;

    const scroll = () => {
      if (!container) return;
      const singleSetWidth = container.scrollWidth / 3;

      if (!isPaused.current) {
        container.scrollLeft += 0.8; 
        
        if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft -= singleSetWidth;
        }
      } else {
        if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft -= singleSetWidth;
        } else if (container.scrollLeft <= singleSetWidth / 2) { 
          container.scrollLeft += singleSetWidth;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Desktop Dragging Controls
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isPaused.current = true;
    isDragging.current = true;
    if (!containerRef.current) return;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftPos.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isPaused.current = false;
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isPaused.current = false;
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const handleTouchStart = () => {
    isPaused.current = true;
  };

  const handleTouchEnd = () => {
    isPaused.current = false;
  };

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[100vw] mx-auto relative z-10 border-pink-900/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-pink-400 text-sm font-bold tracking-widest uppercase mb-4 block">
            Nossos Momentos
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-white">Nossa Galeria</h2>
        </motion.div>

        <div className="relative group w-full cursor-grab active:cursor-grabbing">
           <div 
             ref={containerRef}
             className="flex gap-4 md:gap-6 overflow-x-auto py-8 px-4 md:px-[10vw]"
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
             onMouseDown={handleMouseDown}
             onMouseLeave={handleMouseLeave}
             onMouseUp={handleMouseUp}
             onMouseMove={handleMouseMove}
             onTouchStart={handleTouchStart}
             onTouchEnd={handleTouchEnd}
           >
             <style>{`
                .flex::-webkit-scrollbar { display: none; }
             `}</style>
             
             {displayPhotos.map((photo, index) => (
                <div 
                  key={index} 
                  className="shrink-0 w-[75vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-white/5 select-none"
                  onMouseEnter={() => { isPaused.current = true; }}
                  onMouseLeave={() => { if (!isDragging.current) isPaused.current = false; }}
                >
                   <img
                     src={photo}
                     alt={`Lembrança ${index}`}
                     className="w-full h-full object-cover object-[center_30%] transform hover:scale-[1.03] transition-transform duration-700 pointer-events-none"
                     draggable={false}
                     loading="lazy"
                     decoding="async"
                   />
                   <div className="absolute inset-0 border-2 border-transparent hover:border-pink-500/20 rounded-3xl transition-colors duration-500 pointer-events-none" />
                </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
