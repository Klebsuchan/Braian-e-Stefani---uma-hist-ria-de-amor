import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";

interface Coupon {
  id: string;
  title: string;
  description: string;
}

interface LoveCouponsProps {
  coupons: Coupon[];
}

export function LoveCoupons({ coupons }: LoveCouponsProps) {
  const [redeemed, setRedeemed] = useState<Record<string, boolean>>({});

  const handleRedeem = (id: string) => {
    setRedeemed((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-24 px-6 md:px-12 relative w-full flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-pink-200 mb-4">
          Vales do Amor
        </h2>
        <p className="text-stone-400 font-light text-lg max-w-xl mx-auto">
          Um presentinho meu para você. Pode usar quando e onde quiser, é só me avisar! (Mas use com sabedoria, rs).
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full z-10 relative">
        {coupons.map((coupon, index) => {
          const isRedeemed = redeemed[coupon.id];
          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              <div 
                className={cn(
                  "relative bg-black/40 rounded-2xl p-6 shadow-sm border-2 border-pink-900/30 border-dashed transition-all duration-300 h-full flex flex-col items-center justify-center text-center overflow-hidden",
                  isRedeemed ? "opacity-50 grayscale" : "hover:border-pink-500/50 hover:shadow-md hover:-translate-y-1 hover:bg-black/60"
                )}
              >
                {/* Coupon Cutout Details (visual style) */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-[#110204] rounded-full border-r-2 border-dashed border-pink-900/30" />
                <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-[#110204] rounded-full border-l-2 border-dashed border-pink-900/30" />
                
                <Gift className={cn("w-8 h-8 mb-4 flex-shrink-0", isRedeemed ? "text-stone-600" : "text-pink-500")} />
                
                <h3 className="font-serif text-xl text-stone-200 mb-2 font-medium">
                  {coupon.title}
                </h3>
                <p className="text-stone-400 font-light text-sm mb-6 flex-grow">
                  {coupon.description}
                </p>
                
                <button
                  onClick={() => !isRedeemed && handleRedeem(coupon.id)}
                  disabled={isRedeemed}
                  className={cn(
                    "px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 w-full",
                    isRedeemed 
                      ? "bg-white/5 text-stone-500 cursor-not-allowed" 
                      : "bg-pink-950 text-pink-300 hover:bg-pink-900 hover:scale-105 active:scale-95 border border-pink-800/50"
                  )}
                >
                  {isRedeemed ? (
                    <span className="flex items-center justify-center gap-2">
                       <CheckCircle2 className="w-4 h-4" /> Resgatado
                    </span>
                  ) : "Usar Vale"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
