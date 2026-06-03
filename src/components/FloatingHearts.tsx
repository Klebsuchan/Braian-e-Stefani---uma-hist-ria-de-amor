import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; duration: number; delay: number; size: number }>>([]);

  useEffect(() => {
    // Gerar corações continuamente, evitando muitos de uma vez
    const generateHeart = () => {
      const newHeart = {
        id: Math.random(),
        left: Math.random() * 100, // 0 - 100vw
        duration: Math.random() * 5 + 8, // 8 - 13s
        delay: Math.random() * 2,
        size: Math.random() * 14 + 10, // 10px - 24px
      };
      
      setHearts(prev => [...prev, newHeart].slice(-25)); // manter no máx 25 na tela
    };

    const interval = setInterval(generateHeart, 1500);
    // Initial batch
    for(let i=0; i<10; i++) generateHeart();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110vh", opacity: 0, x: "-50%" }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.6, 0.6, 0],
            x: ["-50%", "0%", "-50%", "0%"] 
          }}
          transition={{ 
            duration: heart.duration, 
            delay: heart.delay,
            ease: "linear",
            x: { duration: heart.duration, ease: "easeInOut" }
          }}
          className="absolute text-pink-500/20"
          style={{ left: `${heart.left}%`, width: heart.size, height: heart.size }}
        >
          <Heart className="w-full h-full fill-pink-500/20" />
        </motion.div>
      ))}
    </div>
  );
}
