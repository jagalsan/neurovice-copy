"use client";

import { useState } from "react";
import Image from "next/image";

interface ScreenshotGalleryProps {
  screenshots: string[];
}

export default function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>("");

  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-1 pr-1">
        {screenshots.map((src, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(src)}
            className="group relative w-[260px] h-[140px] shrink-0 rounded-[12px] overflow-hidden cursor-pointer"
          >
            <Image
              src={src}
              alt={`Screenshot ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20" />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedImage("")}
        >
          <div
            className="relative w-full max-w-5xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage("")}
              className="absolute -top-4 -right-4 z-10 h-10 w-10 rounded-full bg-[#17FBF8] text-black text-xl font-bold flex items-center justify-center hover:bg-[#A6FFFF] transition-colors shadow-lg"
              aria-label="Close"
            >
              ×
            </button>
            <div className="relative w-full aspect-video rounded-[18px] overflow-hidden bg-black border-2 border-[#17FBF8] shadow-[0_0_30px_rgba(23,251,248,0.5)]">
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
