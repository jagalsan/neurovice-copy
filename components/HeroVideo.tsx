"use client";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";
import { useT } from "@/providers/I18nProvider";

export default function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = useT();

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full h-[600px] md:h-[810px] overflow-hidden">
      <video
        poster="/mock/video_placeholder.png"
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900" />
      </video>

      <div className="absolute inset-0" />

      <div className="absolute bottom-6 right-6 flex gap-3 z-10">
        <button
          onClick={toggleMute}
          className="font-bold text-[16px] w-[93px] h-[78px] rounded-[12px] bg-[#FFFFFF0D] backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#FFFFFF1A] transition-colors relative"
        >
          {t('actions.mute')}
          {isMuted ? (
            <VolumeX className="w-[18px] h-[18px] ml-1" />
          ) : (
            <Volume2 className="w-[18px] h-[18px] ml-1" />
          )}
        </button>
        <button
          onClick={togglePlay}
          className="font-bold w-[93px] h-[78px] rounded-[12px] bg-[#FFFFFF0D] backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#FFFFFF1A] transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-[48px] h-[48px]" />
          ) : (
            <Play className="w-[48px] h-[48px]" />
          )}
        </button>
      </div>
    </section>
  );
}
