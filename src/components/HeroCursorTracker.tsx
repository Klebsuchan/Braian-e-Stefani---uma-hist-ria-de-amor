import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
}

const colors = [
  "text-pink-300",
  "text-pink-400",
  "text-rose-400",
  "text-fuchsia-400",
];

export function HeroCursorTracker({ children }: { children: React.ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIdCounter = useRef(0);
  const lastSpawnTime = useRef(0);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastSpawnTime.current < 40) return;
    lastSpawnTime.current = now;

    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    spawnParticle(x, y);
  };

  const spawnParticle = (x: number, y: number) => {
    const newParticle: Particle = {
      id: particleIdCounter.current++,
      x,
      y,
      size: Math.random() * 15 + 10,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastSpawnTime.current < 40) return;
    lastSpawnTime.current = now;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spawnParticle(x, y);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-full overflow-hidden rounded-3xl"
    >
      {children}
      
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              opacity: 1, 
              scale: 0.5, 
              x: p.x - p.size / 2, 
              y: p.y - p.size / 2,
              rotate: p.rotation
            }}
            animate={{ 
              opacity: 0, 
              scale: 1.5,
              y: p.y - p.size / 2 - 50, // Float up
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`absolute pointer-events-none drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] z-50 ${p.color}`}
            style={{ width: p.size, height: p.size }}
          >
            <Heart fill="currentColor" width="100%" height="100%" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
