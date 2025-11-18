"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { useT } from "@/providers/I18nProvider";

type Props = {
  src?: string;
  posterSrc?: string;
  heightClass?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
};

export default function HeroVideo({
  src = "/hero-video.mp4",
  posterSrc = "/mock/video_placeholder.png",
  heightClass = "h-[600px] md:h-[810px]",
  className = "",
  title,
  subtitle,
  showTitle = false,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = useT();

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying((v) => !v);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted((v) => !v);
  };

  return (
    <section
      className={`relative w-full ${heightClass} overflow-hidden ${className}`}
    >
      <video
        ref={videoRef}
        poster={posterSrc}
        className="absolute inset-0 w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>

      {showTitle && (
        <div className="absolute left-4 md:left-6 bottom-45 md:bottom-6 z-10">
          {subtitle && (
            <p className="font-heading text-xs tracking-[0.24em] uppercase text-[#17FBF8] mb-1">
              {subtitle}
            </p>
          )}
          {title && (
            <h1 className="font-heading text-2xl md:text-4xl text-[#17FBF8] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              {title}
            </h1>
          )}
        </div>
      )}

      <div className="absolute bottom-6 right-6 flex gap-3 z-10">
        <button
          onClick={toggleMute}
          className="font-heading text-[12px] md:text-[14px] w-[96px] h-[72px] rounded-[12px] bg-[#FFFFFF0D] backdrop-blur-md border border-white/20 flex items-center justify-center gap-2 hover:bg-[#FFFFFF14] transition"
        >
          {t("actions.mute")}
          {isMuted ? (
            <VolumeX className="w-[18px] h-[18px]" />
          ) : (
            <Volume2 className="w-[18px] h-[18px]" />
          )}
        </button>
        <button
          onClick={togglePlay}
          className="w-[96px] h-[72px] rounded-[12px] bg-[#FFFFFF0D] backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#FFFFFF14] transition"
        >
          {isPlaying ? (
            <Pause className="w-[42px] h-[42px]" />
          ) : (
            <Play className="w-[42px] h-[42px]" />
          )}
        </button>
      </div>
    </section>
  );
}
