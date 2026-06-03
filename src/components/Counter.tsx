import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { cn } from "../lib/utils";

interface CounterProps {
  startDate: Date;
}

interface TimeConfig {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Counter({ startDate }: CounterProps) {
  const [time, setTime] = useState<TimeConfig>({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      let seconds = Math.floor(diff / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      seconds %= 60;
      minutes %= 60;
      hours %= 24;

      const years = Math.floor(days / 365);
      const remainingDays = days % 365;
      const months = Math.floor(remainingDays / 30);
      const finalDays = remainingDays % 30;

      setTime({ years, months, days: finalDays, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const items = [
    { label: "Anos", value: time.years },
    { label: "Meses", value: time.months },
    { label: "Dias", value: time.days },
    { label: "Horas", value: time.hours },
    { label: "Minutos", value: time.minutes },
    { label: "Segundos", value: time.seconds },
  ];

  return (
    <section id="counter" className="py-12 md:py-24 relative overflow-hidden px-4 md:px-8">
      <div className="max-w-4xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12 flex flex-col justify-center backdrop-blur-sm relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-pink-300/60 uppercase text-xs md:text-sm tracking-[0.3em] block font-sans">
            Nosso Tempo Juntos
          </span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-end justify-center">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "flex flex-col items-center justify-center text-center",
                item.value === 0 && index < 2 ? "opacity-50" : ""
              )}
            >
              <div className={cn("text-4xl md:text-5xl font-light font-sans tabular-nums", item.label === "Segundos" ? "text-pink-500" : "text-white")}>
                {item.value}
              </div>
              <div className="text-[10px] md:text-xs text-pink-300/40 uppercase mt-2 font-sans tracking-widest">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
