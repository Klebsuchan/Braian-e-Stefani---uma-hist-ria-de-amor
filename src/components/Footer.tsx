import { motion } from "motion/react";
import { Share2, Heart } from "lucide-react";

export function Footer() {
  const handleShare = async () => {
    const text = "Eu te amo hoje, amanhã e para sempre. ❤️";
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Feliz Dia dos Namorados",
          text,
          url,
        });
      } catch (e) {
        console.warn("Share failed", e);
        // Fallback to WhatsApp link
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }
    } else {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="py-12 md:py-24 relative px-4 md:px-8 mb-8">
      <div className="max-w-4xl mx-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-pink-600/30 flex items-center justify-center animate-pulse shrink-0">
            <Heart className="w-5 h-5 text-pink-300" />
          </div>
          <div className="text-left font-sans">
            <p className="text-sm font-medium text-white">Nossa História</p>
            <p className="text-xs text-white/40">Pra sempre</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-pink-200/60 text-sm md:text-base italic xl:-translate-x-4"
          >
            "Eu te amo hoje, amanhã e para sempre."
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={handleShare}
            className="bg-[#25D366] text-white px-6 py-3 rounded-full text-xs font-bold flex items-center gap-2 hover:brightness-110 transition-all font-sans tracking-wide shrink-0"
          >
            <Share2 className="w-4 h-4" />
            <span>COMPARTILHAR</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
