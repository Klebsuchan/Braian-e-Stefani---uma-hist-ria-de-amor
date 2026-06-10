import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { CONFIG } from "./config";
import { Hero } from "./components/Hero";
import { Counter } from "./components/Counter";
import { FloatingHearts } from "./components/FloatingHearts";
import { AudioPlayer, type AudioPlayerRef } from "./components/AudioPlayer";

// Lazy load below-the-fold components
const Timeline = lazy(() => import("./components/Timeline").then(module => ({ default: module.Timeline })));
const Reasons = lazy(() => import("./components/Reasons").then(module => ({ default: module.Reasons })));
const LoveLetters = lazy(() => import("./components/LoveLetters").then(module => ({ default: module.LoveLetters })));
const PinkyPromises = lazy(() => import("./components/PinkyPromises").then(module => ({ default: module.PinkyPromises })));
const LoveCoupons = lazy(() => import("./components/LoveCoupons").then(module => ({ default: module.LoveCoupons })));
const DateRandomizer = lazy(() => import("./components/DateRandomizer").then(module => ({ default: module.DateRandomizer })));
const DateGenerator = lazy(() => import("./components/DateGenerator").then(module => ({ default: module.DateGenerator })));
const LoveJar = lazy(() => import("./components/LoveJar").then(module => ({ default: module.LoveJar })));
const Gallery = lazy(() => import("./components/Gallery").then(module => ({ default: module.Gallery })));
const SpecialVideo = lazy(() => import("./components/SpecialVideo").then(module => ({ default: module.SpecialVideo })));
const StarryCanvas = lazy(() => import("./components/StarryCanvas").then(module => ({ default: module.StarryCanvas })));
const LoveMeter = lazy(() => import("./components/LoveMeter").then(module => ({ default: module.LoveMeter })));
const Quiz = lazy(() => import("./components/Quiz").then(module => ({ default: module.Quiz })));
const Message = lazy(() => import("./components/Message").then(module => ({ default: module.Message })));
const Future = lazy(() => import("./components/Future").then(module => ({ default: module.Future })));
const Footer = lazy(() => import("./components/Footer").then(module => ({ default: module.Footer })));

export default function App() {
  const audioRef = useRef<AudioPlayerRef>(null);
  const [config, setConfig] = useState(CONFIG);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    // Attempt to start audio
    if (audioRef.current) {
      audioRef.current.play();
    }
    
    // Scroll to counter section
    const counterSec = document.getElementById("counter");
    if (counterSec) {
      counterSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-serif antialiased text-white selection:bg-pink-500/30 selection:text-white bg-[#110204] relative w-full overflow-x-hidden min-h-screen">
      <FloatingHearts />
      {error && (
        <div className="bg-red-500/90 text-white text-center py-2 px-4 z-50 fixed top-0 w-full font-sans text-sm font-medium">
          {error}
        </div>
      )}
      <div className="relative z-10">
        <Hero onStart={handleStart} heroConfig={config.hero} couple={config.couple} />
        <Counter startDate={config.startDate} />
        <Suspense fallback={<div className="h-24 flex items-center justify-center text-pink-500/50">Carregando...</div>}>
          <Timeline timeline={config.timeline} />
          <Reasons reasons={config.reasons} />
          <LoveLetters letters={config.letters} />
          <PinkyPromises />
          <LoveCoupons coupons={config.coupons} />
          <DateRandomizer />
          <DateGenerator />
          <LoveJar />
          <Gallery photos={config.photos} />
          <SpecialVideo />
          <StarryCanvas />
          <LoveMeter />
          <Quiz />
          <Message message={config.message} />
          <Future />
          <Footer />
        </Suspense>
      </div>
      <AudioPlayer ref={audioRef} url={config.musicUrl} spotifyPlaylistId={config.spotifyPlaylistId} />
    </div>
  );
}
