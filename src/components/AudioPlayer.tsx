import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Music, Pause, X } from "lucide-react";
import { cn } from "../lib/utils";

interface AudioPlayerProps {
  url: string;
  spotifyPlaylistId?: string;
}

export interface AudioPlayerRef {
  play: () => void;
}

export const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(({ url, spotifyPlaylistId }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (spotifyPlaylistId) {
        setShowSpotify(true);
        setIsPlaying(true);
      } else if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error("Autoplay failed:", err);
        });
      }
    }
  }));

  useEffect(() => {
    if (!spotifyPlaylistId) {
      const audio = new Audio(url);
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;

      // We do NOT call play() here automatically to respect browser policies.
      // Instead, rely on user interaction (via the ref.current.play() or the floating button).

      return () => {
        audio.pause();
        audio.src = "";
        audioRef.current = null;
      };
    }
  }, [url, spotifyPlaylistId]);

  const togglePlay = () => {
    if (spotifyPlaylistId) {
      setShowSpotify(!showSpotify);
      // We can't actually know if Spotify is "playing" or not due to iframe restrictions, 
      // but we consider toggling it as showing/hiding the player
      setIsPlaying(!showSpotify); 
    } else {
      if (!audioRef.current) return;
      
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Tooltip hint that appears when paused */}
        {!isPlaying && !showSpotify && (
          <span className="font-sans text-xs bg-black/60 text-white/80 py-1.5 px-3 rounded-full backdrop-blur-sm border border-white/10 hidden sm:block animate-pulse">
            Trilha sonora
          </span>
        )}
        
        <button
          onClick={togglePlay}
          className={cn(
            "relative flex items-center justify-center p-0 rounded-full shadow-2xl transition-all duration-300 border border-white/20 group overflow-hidden bg-black w-14 h-14 md:w-16 md:h-16",
            isPlaying ? "scale-105" : "hover:scale-105"
          )}
          aria-label={isPlaying ? "Pausar música" : "Tocar música"}
        >
          {/* Record grooves */}
          <div className={cn(
            "absolute inset-0 rounded-full border-[12px] md:border-[16px] border-zinc-900 border-x-zinc-800 transition-all duration-300",
            (isPlaying && !spotifyPlaylistId) ? "animate-[spin_4s_linear_infinite]" : ""
          )} />
          
          {/* Center label */}
          <div className={cn(
            "relative w-5 h-5 md:w-6 md:h-6 rounded-full bg-pink-500 flex items-center justify-center transition-all duration-300",
            (isPlaying && !spotifyPlaylistId) ? "animate-[spin_4s_linear_infinite]" : ""
          )}>
            {/* Spindle hole */}
            <div className="w-1.5 h-1.5 bg-black rounded-full" />
          </div>

          {/* Play/Pause Icons overlay on hover */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {showSpotify ? <X className="w-5 h-5 text-white" /> : (isPlaying && !spotifyPlaylistId ? <Pause className="w-5 h-5 text-white" /> : <Music className="w-5 h-5 text-white" />)}
          </div>
        </button>
      </div>

      {/* Spotify Embed Player */}
      {spotifyPlaylistId && (
        <div 
          className={cn(
            "fixed bottom-20 md:bottom-24 right-4 md:right-6 z-40 transition-all duration-500 ease-in-out origin-bottom-right drop-shadow-2xl w-[calc(100vw-2rem)] max-w-[300px]",
            showSpotify ? "scale-100 opacity-100 pointer-events-auto" : "scale-50 opacity-0 pointer-events-none"
          )}
        >
          <iframe 
            src={`https://open.spotify.com/embed/playlist/${spotifyPlaylistId}?utm_source=generator&theme=0`} 
            width="100%" 
            height="380" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-md shadow-2xl"
          ></iframe>
        </div>
      )}
    </>
  );
});

AudioPlayer.displayName = "AudioPlayer";
