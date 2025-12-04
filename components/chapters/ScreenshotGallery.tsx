"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScreenshotGalleryProps {
  screenshots: string[];
}

export default function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const openImage = (src: string, index: number) => {
    setSelectedImage(src);
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedImage("");
    setSelectedIndex(-1);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      const newIndex = selectedIndex > 0 ? selectedIndex - 1 : screenshots.length - 1;
      setSelectedIndex(newIndex);
      setSelectedImage(screenshots[newIndex]);
    } else {
      const newIndex = selectedIndex < screenshots.length - 1 ? selectedIndex + 1 : 0;
      setSelectedIndex(newIndex);
      setSelectedImage(screenshots[newIndex]);
    }
  };

  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-1 pr-1">
        {screenshots.map((src, i) => (
          <div
            key={i}
            onClick={() => openImage(src, i)}
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
          onClick={closeImage}
        >
          <div
            className="relative w-full max-w-5xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeImage}
              className="absolute -top-4 -right-4 z-10 h-10 w-10 rounded-full bg-[#17FBF8] text-black text-xl font-bold flex items-center justify-center hover:bg-[#A6FFFF] transition-colors shadow-lg"
              aria-label="Close"
            >
              ×
            </button>

            {/* Navigation arrows */}
            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className="relative w-full aspect-video rounded-[18px] overflow-hidden bg-black border-2 border-[#17FBF8] shadow-[0_0_30px_rgba(23,251,248,0.5)]">
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>

            {/* Thumbnail grid */}
            {screenshots.length > 1 && (
              <div className="mt-4 grid grid-cols-6 gap-2 max-w-2xl mx-auto">
                {screenshots.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => openImage(src, i)}
                    className={`relative aspect-video rounded-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#17FBF8]/50 ${
                      i === selectedIndex
                        ? 'ring-2 ring-[#17FBF8] shadow-lg shadow-[#17FBF8]/50'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                    {i === selectedIndex && (
                      <div className="absolute inset-0 bg-[#17FBF8]/20 pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
